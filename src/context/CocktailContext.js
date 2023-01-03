import axios from '../api/axios'
import { createContext, useState, useEffect } from 'react'

const COCKTAILS_URL = '/cocktails'

const CocktailContext = createContext({})

export const CocktailProvider = ({ children }) => {
    const [cocktails, setCocktails] = useState([])
    const [cocktailName, setCocktailName] = useState('')
    const [liqourBase, setLiqourBase] = useState('')
    const [cocktailDesc, setCocktailDesc] = useState('')
    const [cocktailImage, setCocktailImage] = useState()
    const [liqourList, setLiqourList] = useState([])
    const [nmbrOfPages, setNmbrOfPages] = useState(0)

    useEffect(() => {
        const fetchCocktails = async () => {
        try {
            const response = await axios.get(COCKTAILS_URL)
            setNmbrOfPages(response.data.nmbrOfPages)
            setCocktails(response.data.cocktails)
            setLiqourList(response.data.alcoholBaseList)
        } catch (err) {
            if (err.response) {
            console.log(err.response.data.message)
            console.log(err.response.status)
            console.log(err.response.headers)
            } else {
            console.log(`Error: ${err.message}`)
            }
        }
        }

        fetchCocktails()
    }, [])

    return (
        <CocktailContext.Provider value={{
            cocktails, setCocktails, liqourList, setLiqourList,
            nmbrOfPages, setNmbrOfPages, cocktailName, setCocktailName, 
            liqourBase, setLiqourBase, cocktailDesc, setCocktailDesc, 
            cocktailImage, setCocktailImage
        }}>
            {children}
        </CocktailContext.Provider>
    )
}

export default CocktailContext