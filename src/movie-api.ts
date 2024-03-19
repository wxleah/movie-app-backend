import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const tmdb_api = process.env.TMDB_API_KEY;
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;


export const searchMovies = async (searchTerm: string, page: number) => {
    if (!tmdb_api) {
        throw new Error("API Key not found")

    }
    const url = new URL("https://api.themoviedb.org/3/search/movie");
    const queryParams = {
        api_key: tmdb_api,
        query: searchTerm,
        page: page.toString()
    }
    url.search = new URLSearchParams(queryParams).toString();
    try {
        const searchResponse = await fetch(url);
        const resultJson = await searchResponse.json();
        return resultJson;
    } catch (error) {
        console.log(error);
    }
}

export const getMovieByID = async (movieId: string) => {
    // GET https://api.themoviedb.org/3/movie/{movie_id}
    if (!tmdb_api) {
        throw new Error("API Key not found")

    }
    const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}`);
    const params = {
        api_key: tmdb_api,
    }
    url.search = new URLSearchParams(params).toString();
    try {
        const searchResponse = await fetch(url);
        const resultJson = await searchResponse.json();
        return resultJson;
    } catch (error) {
        console.log(error);
    }
}

export const searchPodcasts = async (searchTerm: string) => {
    if (!client_id || !client_secret) {
        throw new Error("Client credentials not found")

    }

    const api = SpotifyApi.withClientCredentials(client_id, client_secret);
    try {
        const items = await api.search(searchTerm, ["episode"], "US");
        // const podcastInfo = items.episodes.items.map((item) => ({
        //     id: item.id,
        //     desciption: item.description,
        //     url: item.external_urls.spotify,
        //     images: item.images[0]
        // }));
        // return podcastInfo;
        return items;
    } catch (error) {
        console.log(error);
    }

}

export const getFavoriteMoviesByIDs = async (ids: string[]) => {
    // GET https://api.themoviedb.org/3/movie/{movie_id}
    // Create a function to make multiple API calls in parallel.
    async function makeMultipleAPICalls(endpoints: string[]) {
        const promises = endpoints.map(endpoint => getMovieByID(endpoint));
        const responses = await Promise.all(promises);
        return responses;
    } 

    // Make multiple API calls in a synchronous way.
    try {
        const responses = await makeMultipleAPICalls(ids);
        return { results: responses };
    } catch (error) {
        console.log(error);
    }
}


