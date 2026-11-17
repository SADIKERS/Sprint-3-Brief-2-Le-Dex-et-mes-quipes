
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
