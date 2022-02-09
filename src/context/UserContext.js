import { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service";

const UserContext = createContext({
    user: {},
})

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    }, [])
    authService
        .getUser(token)
        .then((data) => {
            setUser(data);
        })
        .catch((err) => console.log(err));


    const context = { user }



    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
