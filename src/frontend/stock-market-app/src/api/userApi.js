import { userApiClient } from "./userApiClient"

export const getUserAccountBalance = (username) => {
    return userApiClient.get(`api/user-details/cash/${username}`);
}
export const withdrawCash = (username,user) => {
    return userApiClient.put(`api/user-details/cash-withdraw/${username}`,user);
}
export const investCash = (username,user) => {
    return userApiClient.put(`api/user-details/cash/${username}`,user);
}
export const getAllOwnedStocksByUser = (username) => {
    return userApiClient.get(`api/stock/${username}`)
}
export const getStockDetailsOwnedByUser = (username, tickerName) => {
    return userApiClient.get(`api/stock/${username}/${tickerName}`);
}
export const addStockToUser = (username,stock) => {
    return userApiClient.post(`api/stock/${username}`,stock);
}
export const updateStock = (username,id,stock) => {
    return userApiClient.put(`api/stock/${username}/${id}`,stock);
}
export const deleteStock =(username,id) => {
    return userApiClient.delete(`api/stock/${username}/${id}`);
}
export const jwtAuth = (username, password) => {
    return userApiClient.post(`auth/authenticate`,{username:username, password:password});
}
export const jwtRegister = (username, password) => {
    return userApiClient.post(`auth/register`,{username:username, password:password});
}
