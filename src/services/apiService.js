// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080';

// export const fetchData = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/data`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching data", error);
//         throw error;
//     }
// };

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const apiRequest = async (method, endpoint, data = null) => {
    try {
        const config = {
            method: method,
            url: `${API_BASE_URL}${endpoint}`,
            data: data,
        };
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error(`Error with ${method} request to ${endpoint}`, error);
        throw error;
    }
};
