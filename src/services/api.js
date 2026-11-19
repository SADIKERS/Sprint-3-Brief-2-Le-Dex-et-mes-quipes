const API_URL = "http://localhost:3000";

export async function request(method, route, body = null) {
    const options = {
        method: method,
        headers: {}
    };

    if (body !== null) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_URL}${route}`, options);

        if (!response.ok) {
            const error = new Error(`Erreur API : ${response.status}`);
            error.status = response.status;
            throw error;
        }

        if (method.toUpperCase() === "DELETE") {
            return true;
        }

        return await response.json();

    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error("Impossible de contacter le serveur. Vérifiez que l'API est démarrée.");
        }

        throw error;
    }
}

// GET : récupérer les créatures avec recherche et filtre
export async function getCreatures(params = {}) {
    const query = new URLSearchParams(params).toString();

    const route = query
        ? `/creatures?${query}`
        : "/creatures";

    return await request("GET", route);
}

// GET : récupérer une créature par son ID
export async function getCreatureById(id) {
    return await request("GET", `/creatures/${id}`);
}

// POST : ajouter une créature
export async function createCreature(data) {
    return await request("POST", "/creatures", data);
}