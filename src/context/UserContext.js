import { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service";

const UserContext = createContext({
    user: {},
})

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            authService
                .verifyToken(token)
                .then((data) => {
                    setUser(data);
                })
                .catch((err) => console.log(err));
        }
    }, [user])



    const context = { user }



    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
