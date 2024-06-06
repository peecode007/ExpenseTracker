import { useState, useContext, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        cookie: null // Set initial token to null
    });

    useEffect(() => {
        const data = localStorage.getItem('auth')
        if (data) {
            const authData = JSON.parse(data);
            setAuth({
                ...auth,  cookie: authData.cookie
            })
        }
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }
