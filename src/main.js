
/* =====================================================
   1. IMPORTS
===================================================== */

import {
    getCreatures,
    getCreatureById,
    createCreature
} from "./services/api.js";

import {
    displayCreatures,
    displayCreatureDetail
} from "./ui.js";

import { validateCreature } from "./rules.js";

import {
    getLastType,
    saveLastType,
    saveCreatureDraft,
    getCreatureDraft,
    clearCreatureDraft
} from "./storage.js";


/* =====================================================
   2. HTML ELEMENTS
===================================================== */

const message = document.querySelector("#message");

const grid = document.querySelector("#grid");
const detail = document.querySelector("#detail");
const closeDetail = document.querySelector("#close-detail");

const filters = document.querySelector("#filters");

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");
const clearSearchButton = document.querySelector("#clear-search");

const sortSelect = document.querySelector("#sort");

const creatureForm = document.querySelector("#creature-form");

// Restaurer le brouillon au chargement
function restoreCreatureDraft() {
    const draft = getCreatureDraft();

    if (!draft) return;

    Object.entries(draft).forEach(function ([name, value]) {
        const field = creatureForm.elements[name];

        if (field) {
            field.value = value;
        }
    });
}

restoreCreatureDraft();

/* =====================================================
   3. APPLICATION STATE
===================================================== */

let selectedType = getLastType();
let searchValue = "";
let selectedSort = "";


/* =====================================================
   4. LOAD CREATURES
===================================================== */

async function loadCreatures() {

    try {

        message.textContent = "Chargement...";

        // Préparer les paramètres
        const params = {};

        // Filter
        if (selectedType !== "Tous") {
            params.type = selectedType;
        }

        // Search
        if (searchValue !== "") {
            params.q = searchValue;
        }

        // Sort
        if (selectedSort === "name-asc") {
            params._sort = "name";
            params._order = "asc";
        }

        if (selectedSort === "name-desc") {
            params._sort = "name";
            params._order = "desc";
        }

        if (selectedSort === "numero") {
            params._sort = "numero";
            params._order = "asc";
        }

        // API Request
        const creatures = await getCreatures(params);

        // Afficher les créatures
        displayCreatures(creatures);

        // Vérifier les résultats
        if (creatures.length === 0) {
            message.textContent = "Aucune créature trouvée.";
        } else {
            message.textContent = "";
        }

    } catch (error) {

        displayCreatures([]);

        message.textContent = error.message;

        console.error("Erreur lors du chargement :", error);
    }
}


/* =====================================================
   5. FILTER BY TYPE
===================================================== */

filters.addEventListener("click", function (event) {

    const button = event.target.closest("button[data-type]");

    if (!button) return;

    selectedType = button.dataset.type;

    // Sauvegarder le dernier filtre
    saveLastType(selectedType);

    loadCreatures();
});


/* =====================================================
   6. SEARCH BY NAME
===================================================== */

searchForm.addEventListener("submit", function (event) {

    event.preventDefault();

    searchValue = searchInput.value.trim();

    loadCreatures();
});


/* =====================================================
   7. CLEAR SEARCH
===================================================== */

clearSearchButton.addEventListener("click", function () {

    searchInput.value = "";
    searchValue = "";

    loadCreatures();
});


/* =====================================================
   8. SORT CREATURES
===================================================== */

sortSelect.addEventListener("change", function () {

    selectedSort = sortSelect.value;

    loadCreatures();
});


/* =====================================================
   9. CREATURE DETAILS
===================================================== */

grid.addEventListener("click", async function (event) {

    // Vérifier si le clic vient d'une carte
    const card = event.target.closest("article[data-id]");

    if (!card) return;

    // Ne pas ouvrir les détails si on clique sur un bouton
    if (event.target.closest("button")) return;

    // Récupérer l'ID
    const creatureId = card.dataset.id;

    try {

        detail.classList.remove("hidden");

        // Message de chargement
        message.textContent = "Chargement...";

        // GET /creatures/:id
        const creature = await getCreatureById(creatureId);

        // Afficher les détails
        displayCreatureDetail(creature);

        message.textContent = "";

    } catch (error) {

        if (error.status === 404) {
            message.textContent = "Créature introuvable.";
        } else {
            message.textContent = error.message;
        }

        console.error("Erreur lors du chargement des détails :", error);
    }
});


/* =====================================================
   10. CLOSE DETAILS
===================================================== */

closeDetail.addEventListener("click", function () {

    detail.classList.add("hidden");
});


/* =====================================================
   11. FORM VALIDATION HELPERS
===================================================== */

// Effacer les anciens messages d'erreur
function clearFormErrors() {

    creatureForm.querySelectorAll(".error-message").forEach(function (error) {
        error.textContent = "";
    });

    creatureForm.querySelectorAll("input, select, textarea").forEach(function (input) {
        input.classList.remove("border-red-500");
    });
}


// Afficher les erreurs sous les champs concernés
function showFormErrors(errors) {

    Object.entries(errors).forEach(function ([fieldName, errorMessage]) {

        const input = creatureForm.elements[fieldName];

        if (!input) return;

        const error = input.parentElement.querySelector(".error-message");

        if (error) {
            error.textContent = errorMessage;
        }

        input.classList.add("border-red-500");
    });
}


// Récupérer les données du formulaire
function getFormData() {

    const formData = new FormData(creatureForm);

    return {
        numero: formData.get("numero").trim(),

        name: formData.get("name").trim(),

        type: formData.get("type"),

        level: Number(formData.get("level")),

        atk: formData.get("atk") === ""
            ? null
            : Number(formData.get("atk")),

        def: formData.get("def") === ""
            ? null
            : Number(formData.get("def")),

        image: formData.get("image").trim(),

        description: formData.get("description").trim()
    };
}

// Sauvegarder automatiquement le brouillon
function saveDraft() {
    const formData = new FormData(creatureForm);
    const draft = Object.fromEntries(formData.entries());

    saveCreatureDraft(draft);
}

// Sauvegarder quand l'utilisateur écrit ou change un champ
creatureForm.addEventListener("input", saveDraft);
creatureForm.addEventListener("change", saveDraft);

// Supprimer le brouillon quand l'utilisateur efface le formulaire
creatureForm.addEventListener("reset", function () {
    clearCreatureDraft();
});

/* =====================================================
   12. VALIDATION ON BLUR
===================================================== */

creatureForm.querySelectorAll("input, select").forEach(function (input) {

    input.addEventListener("blur", function () {

        const data = getFormData();

        const errors = validateCreature(data);

        const error = input.parentElement.querySelector(".error-message");

        if (error) {
            error.textContent = errors[input.name] || "";
        }

        if (errors[input.name]) {
            input.classList.add("border-red-500");
        } else {
            input.classList.remove("border-red-500");
        }
    });
});


/* =====================================================
   13. ADD CREATURE WITH POST
===================================================== */

creatureForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Récupérer les données
    const newCreature = getFormData();

    // Validation
    const errors = validateCreature(newCreature);

    // Effacer les anciennes erreurs
    clearFormErrors();

    // Afficher les nouvelles erreurs
    showFormErrors(errors);

    // Arrêter si les données sont invalides
    if (Object.keys(errors).length > 0) {
        return;
    }

    try {

        message.textContent = "Ajout en cours...";
        // Vérifier si le numéro existe déjà
        const creatures = await getCreatures();

        const numeroExists = creatures.some(function (creature) {
            return creature.numero.toLowerCase() === newCreature.numero.toLowerCase();
        });

        if (numeroExists) {
            showFormErrors({
                numero: "Ce numéro existe déjà."
            });

            return;
        }
        // POST /creatures
        await createCreature(newCreature);

        // Supprimer le brouillon après succès
        clearCreatureDraft();

        // Réinitialiser le formulaire
        creatureForm.reset();

        // Effacer les erreurs
        clearFormErrors();

        // Recharger les créatures
        await loadCreatures();

        message.textContent = "Créature ajoutée avec succès !";

        // Effacer les erreurs
        clearFormErrors();

        // Recharger les créatures
        await loadCreatures();

        // Message de succès
        message.textContent = "Créature ajoutée avec succès !";

    } catch (error) {

        message.textContent = error.message;

        console.error("Erreur lors de l'ajout :", error);
    }
});


/* =====================================================
   14. INITIALISATION
===================================================== */

loadCreatures();
