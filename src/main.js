
import { getCreatures } from "./services/api.js";
import { displayCreatures } from "./ui.js";

// HTML elements
const message = document.querySelector("#message");
const filters = document.querySelector("#filters");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");
const clearSearchButton = document.querySelector("#clear-search");

// État de l'application
let selectedType = "Tous";
let searchValue = "";

// Charger les créatures
async function loadCreatures() {
    try {
        message.textContent = "Chargement...";

        const params = {};

        if (selectedType !== "Tous") {
            params.type = selectedType;
        }

        if (searchValue !== "") {
            params.q = searchValue;
        }

        const creatures = await getCreatures(params);

        displayCreatures(creatures);

        if (creatures.length === 0) {
            message.textContent = "Aucune créature trouvée.";
        } else {
            message.textContent = "";
        }

    } catch (error) {
        // Vider les anciennes cartes
        displayCreatures([]);

        // Afficher le message d'erreur
        message.textContent = error.message;

        console.error("Erreur :", error);
    }
}

// Filtrer par type
filters.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-type]");

    if (!button) return;

    selectedType = button.dataset.type;

    loadCreatures();
});

// Rechercher par nom
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    searchValue = searchInput.value.trim();

    loadCreatures();
});

// Effacer la recherche
clearSearchButton.addEventListener("click", function () {
    searchInput.value = "";
    searchValue = "";

    loadCreatures();
});

// Charger au démarrage
loadCreatures();
