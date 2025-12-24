import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({
    onLogin: (username, password) => {},
    onLogout: () => {},
    loggedIn: false,
    authReady: false
});

const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        // On initial load, check if the user is already logged in
        axios.post("http://localhost:8080/range-api/v1/regularUser", { withCredentials: true })
            .then(() => {
                setLoggedIn(true);
            })
            .catch(() => {
                setLoggedIn(false);
            })
            .finally(() => {
                setAuthReady(true);
            });
    }, []);

    const handleLogin = async (username, password) => {
        const requestBody = { username, password };
        // Redirect to dashboard on successful login
        // Or, return error message for UI to display
        axios.post("http://localhost:8080/range-api/v1/login", requestBody, { withCredentials: true })
            .then(() => {
                console.log("Logged in successfully");
                setLoggedIn(true);
                window.location.href = "/dashboard";
            })
            .catch((error) => {
                console.log("Error during login:", error);
            });
    };

    const handleLogout = () => {
        // Clear cookies by making a logout request to the server
        axios.post("http://localhost:8080/range-api/v1/logout", {}, { withCredentials: true })
            .then(() => {
                console.log("Logged out successfully");
            })
            .catch((error) => {
                console.log("Error during logout:", error);
            });
    };

    const value = {
        authReady: authReady,
        loggedIn: loggedIn,
        onLogin: handleLogin,
        onLogout: handleLogout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;