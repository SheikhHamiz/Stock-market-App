import axios from "axios";
import API_KEY from "./api"

const apiClient = axios.create({
    baseURL: "https://www.alphavantage.co/"
});

export const marketGainersLosers = () => {
    return apiClient.get(`query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`);
}
export const getTickerDetails =(ticker) => {
    return apiClient.get(`query?function=TIME_SERIES_MONTHLY&symbol=${ticker}&apikey=${API_KEY}`);
}
export const getQuote =(ticker) => {
    return apiClient.get(`query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`);
}