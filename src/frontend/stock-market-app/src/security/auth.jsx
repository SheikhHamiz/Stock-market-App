import { jwtRegister, jwtAuth } from "../api/userApi";
import { userApiClient } from "../api/userApiClient";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [username, setUsername] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await jwtAuth(username,password);
            if(response.status === 200) {
                const jwtToken = "Bearer "+response.data.token;
                setAuthenticated(true);
                setUsername(username);
                setToken(jwtToken)
                userApiClient.interceptors.request.use(
                    (config) => {
                        console.log("intercepting");
                        config.headers.Authorization = jwtToken;
                        return config;
                    }
                );
                return false;
            } else logout();
        } catch(err) {
            console.log(err);
        }
    }
    const signUp = async (username, password) => {
        try {
            const response = await jwtRegister(username,password);
            if(response.status === 200) {
                const jwtToken = "Bearer "+response.data.token;
                setAuthenticated(true);
                setUsername(username);
                setToken(jwtToken);
                userApiClient.interceptors.request.use(
                    (config) => {
                        console.log("intercepting");
                        config.headers.Authorization = jwtToken;
                        return config;
                    }
                );
                return false;
            } else logout();
        } catch(err) {
            console.log(err);
            logout();
        }
    }
    const logout = () => {
        setAuthenticated(false);
        setUsername(null);
        setToken(null);
        return false;
    }


    return(
        <AuthContext.Provider value={{username, authenticated, token, login, logout, signUp}}>
            {children}
        </AuthContext.Provider>
    );
}
