const API_URL = "http://localhost:3000";

export async function request(method, route, body = null){
    
    const options = {
        method: method,
        headers: {}
    };

    if(body !== null){
        options.header["content-type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    try{
        const response = await fetch(`${API_URL}${route}`, options);

        if(!response.ok) {
            throw new error(`Erreur Api : ${response.stats}`);
        }
        if(method === "delete"){
           return true;
        }
        return await response.json();
    }
    catch(error){
        if(error instanceof TypeError) {
            throw new Error("Impossible de contacter le serveur.");
        }
        throw error;
    }
}
// GET : récupérer les créatures avec recherche et filtre
export async function getCreatures(params = {}){

    const query = new URLSearchParams(params).toString();
    const route = query ? `/creatures?${query}`: "/creatures";

    return await request("GET", route);
}