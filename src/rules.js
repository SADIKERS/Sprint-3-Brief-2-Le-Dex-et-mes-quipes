export function validateCreature(data) {
    const errors = {};

    // Vérifier le nom
    if (!data.name.trim()) {
        errors.name = "Le nom est obligatoire.";
    }

    // Vérifier le type
    if (!data.type) {
        errors.type = "Veuillez choisir un type.";
    }

    // Vérifier ATK
    if (
        !Number.isInteger(data.atk) ||
        data.atk < 0 ||
        data.atk > 4000
    ) {
        errors.atk = "ATK doit être un nombre entier entre 0 et 4000.";
    }

    // Vérifier DEF
    if (
        !Number.isInteger(data.def) ||
        data.def < 0 ||
        data.def > 4000
    ) {
        errors.def = "DEF doit être un nombre entier entre 0 et 4000.";
    }
    // Vérifier le numéro
if (!data.numero.trim()) {
    errors.numero = "Le numéro est obligatoire.";
} else if (!/^#\d{3}$/.test(data.numero)) {
    errors.numero = "Le numéro doit respecter le format #001.";
}

// Vérifier l'image
if (!data.image.trim()) {
    errors.image = "Le lien de l'image est obligatoire.";
} else {
    try {
        const imageURL = new URL(data.image);

        if (
            imageURL.protocol !== "http:" &&
            imageURL.protocol !== "https:"
        ) {
            errors.image = "Le lien doit commencer par http ou https.";
        }
    } catch {
        errors.image = "Veuillez saisir un lien valide.";
    }
}
    return errors;
}
