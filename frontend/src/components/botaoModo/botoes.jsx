import { useState, useEffect }     from 'react'
import { motion }                  from 'framer-motion'
import { useNavigate }             from 'react-router-dom' // <-- Adicionado para o navigate funcionar
import { useLanguage }             from "../../context/LanguageContext"

import './botoes.css'

// 1. Botão de Alternar Tema (Claro/Escuro)
export function BotaoModo({ variants, custom }) {
     const [modoClaro, setModoClaro] = useState(() => {
          const salvo = localStorage.getItem('claro')
          return salvo === 'true'
     })

     useEffect(() => {
          document.documentElement.className = modoClaro ? "claro" : "escuro"
          localStorage.setItem('claro', modoClaro)
     }, [modoClaro])

     return (
          <motion.button className="btn-modo" 
                         onClick={() => setModoClaro(!modoClaro)}
                         variants={variants}
                         custom={custom}>

               {modoClaro ? <i className='bx bx-moon'></i> 
                          : <i className='bx bx-sun'></i>}
         
          </motion.button>
     )
}

// 2. Botão de Contato (Com a setinha e o navigate corrigido)
export function BotaoContato() {
     const { t } = useLanguage()
     const navigate = useNavigate()

     return(
          <motion.a className='btn-hero' onClick={() => navigate('/contato')}>
               {/* Ícone de Seta (Arrow Up Right Stroke) */}
               <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
               >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
               </svg>
               <span>{t.contato.botao}</span>
          </motion.a>
     )
}

// 3. Botão Rota (Recebe texto e rota/âncora para onde navegar)
export function BotaoRota({ texto, onClick }) {
     return (
          <motion.button 
               className='btn-padrao' 
               onClick={onClick}
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
          >
               <span>{texto}</span>
          </motion.button>
     )
}