import axios from "axios";

const API_DOMAIN = 'http://api.jikan.moe/v4';

export async function fetchData(page) {
    const response = await axios.get(`${API_DOMAIN}/top/anime?page=${page}`);
    return response.data;
}

