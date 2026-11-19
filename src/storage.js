/* FILTER - LOCAL STORAGE */

const FILTER_KEY = "lastSelectedType";

export function getLastType() {
    return localStorage.getItem(FILTER_KEY) || "Tous";
}

export function saveLastType(type) {
    localStorage.setItem(FILTER_KEY, type);
}

/* FAVORITES - LOCAL STORAGE */

export function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

/* CREATURE DRAFT - SESSION STORAGE */

const DRAFT_KEY = "creatureDraft";

// Sauvegarder le brouillon
export function saveCreatureDraft(data) {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data));
}

// Récupérer le brouillon
export function getCreatureDraft() {
    const draft = sessionStorage.getItem(DRAFT_KEY);

    return draft ? JSON.parse(draft) : null;
}

// Supprimer le brouillon
export function clearCreatureDraft() {
    sessionStorage.removeItem(DRAFT_KEY);
}