import { createContext, useState, useEffect } from "react";

const WishContext = createContext({
    wish: [],
    removeItem: () => {},
    addItem: () => {},
    clearWish:() => {},
    count: 0
})

export const WishContextProvider = ({ children }) => {

    const [wish, setWish] = useState(typeof window !== "undefined" ? JSON.parse(localStorage.getItem('wish')) : []);
    
    const count = wish && wish.length || 0;

    const addItem = (item) => {
        if (wish && wish.length > 0) {
            setWish([...wish, item]);            
        }
        else if(!wish){
            setWish([item]);            
        }
        // localStorage.setItem('wish', JSON.stringify(wish));
    }
    
    const context = { wish, count, addItem }
    
    useEffect(() => {
        localStorage.setItem("wish", JSON.stringify(wish))
        // const wishStored = localStorage.getItem('wish');
        // if (wishStored) {
        //     setWish(JSON.parse(wishStored));
        // }
        return () => {
            localStorage.setItem("wish", JSON.stringify(wish))
        };
    }, [wish]);

    return (
        <WishContext.Provider value={context}>
            {children}
        </WishContext.Provider>
    )
}

export default WishContext;
