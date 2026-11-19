
const grid = document.querySelector("#grid");

export function displayCreatures(creatures) {
    grid.replaceChildren();

    creatures.forEach(function (creature) {
        const card = document.createElement("article");
        card.className = "flex flex-col gap-2 rounded-card border-2 border-black bg-yellow-500/50 p-3 shadow-xl";
        card.dataset.id = creature.id;

        // Image
        const image = document.createElement("img");
        image.src = creature.image;
        image.alt = creature.name;
        image.className = "aspect-[3/4] w-full rounded-xl object-cover";

        // Numero
        const numero = document.createElement("span");
        numero.textContent = creature.numero;
        numero.className = "font-mono text-xs font-bold";

        // Name
        const name = document.createElement("h3");
        name.textContent = creature.name;
        name.className = "font-bold";

        // Type
        const type = document.createElement("p");
        type.textContent = `Type : ${creature.type}`;

        // Level
        const level = document.createElement("p");
        level.textContent = `Niveau : ${creature.level}`;

        // ATK
        const atk = document.createElement("p");
        atk.textContent = `ATK : ${creature.atk}`;

        // DEF
        const def = document.createElement("p");
        def.textContent = `DEF : ${creature.def}`;

        card.append(image, numero, name, type, level, atk, def);

        grid.append(card);
    });
}

//fichage carde detaill

// Afficher les détails d'une créature
export function displayCreatureDetail(creature) {
    const detail = document.querySelector("#detail");

    const detailTitle = document.querySelector("#detail-title");
    const detailImage = document.querySelector("#detail-image");
    const detailName = document.querySelector("#detail-name");
    const detailType = document.querySelector("#detail-type");
    const detailLevel = document.querySelector("#detail-level");
    const detailLevelValue = document.querySelector("#detail-level-value");
    const detailDescription = document.querySelector("#detail-description");

    const detailAtk = document.querySelector("#detail-atk");
    const detailDef = document.querySelector("#detail-def");

    const detailAtkBar = document.querySelector("#detail-atk-bar");
    const detailDefBar = document.querySelector("#detail-def-bar");
    const detailLevelBar = document.querySelector("#detail-level-bar");

    // Remplir les informations
    detailTitle.textContent = `${creature.numero} - Détail`;
    detailImage.src = creature.image;
    detailImage.alt = creature.name;
    detailName.textContent = creature.name;
    detailType.textContent = creature.type;
    detailLevel.textContent = creature.level;
    detailLevelValue.textContent = creature.level;
    detailDescription.textContent = creature.description;

    detailAtk.textContent = creature.atk;
    detailDef.textContent = creature.def;

    // Mettre à jour les barres statistiques
    detailAtkBar.style.width = `${(creature.atk / 4000) * 100}%`;
    detailDefBar.style.width = `${(creature.def / 4000) * 100}%`;
    detailLevelBar.style.width = `${(creature.level / 12) * 100}%`;

    // Afficher le panneau
    detail.classList.remove("hidden");
}
