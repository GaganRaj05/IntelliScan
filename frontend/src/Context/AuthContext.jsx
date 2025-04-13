import { createContext, useContext, useEffect, useState } from "react";
import { checkAuth } from "../services/auth";
const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    useEffect(()=> {
        async function fetchUser() {
            const response = await checkAuth();
            if(response.error) {
                setUser(null);
                return;
            }
            setUser(response);
        }
        fetchUser();
    },[]);

    useEffect(()=> {
        console.log("Current user: ", user);
    },[user])
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
}
