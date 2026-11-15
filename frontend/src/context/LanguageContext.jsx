import { createContext, useContext, useState } from "react";

import pt from "../locales/pt"
import en from "../locales/en"

const traducoes = { pt, en }
const LanguageContext = createContext()

export function LanguageProvider({ children }){
     const [idioma, setIdioma] = useState('pt') // L de lula

     const t = traducoes[idioma]
     
     const alternarIdioma = () => {
          setIdioma(idioma === 'pt' ? 'en' : 'pt')
     }

     return(
          <LanguageContext.Provider value={{ idioma, t, alternarIdioma }}>
               { children }
          </LanguageContext.Provider>
     )
}

export function useLanguage(){
     return useContext(LanguageContext);
}