import { useState, useEffect, useContext, createContext } from "react"
import checkAuth from "../Services/checkAuth";
const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    useEffect(()=> {
        async function fetchUser() {
            const response = await checkAuth();
            console.log(response)
            if(response.error ){
                setUser(null);
                return;
            }
            setUser(response);
        }
        fetchUser();
    },[]);
    const value = {
        user, 
        setUser
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}