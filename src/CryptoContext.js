import React,{ useState, useEffect, useContext} from 'react'
import { createContext } from 'react'

const Crypto = createContext();

const CryptoContext = ({children}) => {

    const [currency, setCurrency] = useState("MMK")
    const [ symbol, setSymbol] = useState("ks")

    useEffect(() => {
        if ( currency === "MMK") setSymbol("ks");
        else if ( currency === "USD") setSymbol("$");
    },[currency])

    return (
            <Crypto.Provider value={{currency, symbol, setCurrency}}>
                {children}
            </Crypto.Provider>
    )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto)
}
