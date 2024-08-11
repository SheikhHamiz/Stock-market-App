import axios from "axios";

export const  userApiClient = axios.create({
    baseURL:"http://localhost:8080",
});

// userApiClient.interceptors.request.use((config) => {
//     config.Authorization = "Bearer nvfklfsfkljgbklfg"
// })