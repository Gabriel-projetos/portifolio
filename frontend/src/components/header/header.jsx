import logo from '../../assets/logo.png'
import { BotaoModo } from '../botaoModo/botoes'

import { useNavigate } from 'react-router-dom'
import { useLanguage } from "../../context/LanguageContext"
import { motion } from 'framer-motion'

import './header.css'

const containerVariants = {
     hidden: {},
     visible: {
          damping: 8, 
          transition: { staggerChildren: 0.7 }
     }
}

const variantsLeft = {
     hidden: { opacity: 0, x: -50 },
     visible: (delay) => ({
          opacity: 1, 
          x: 0,
          transition: { duration: 0.5, delay}
     })
}

const variantsRight = {
     hidden: { opacity: 0, x: 50 },
     visible: (delay) => ({
          opacity: 1, 
          x: 0,
          transition: { duration: 0.5, delay}
     })
}

export default function Header({ titulo, subtitulo }){
     const { idioma, alternarIdioma } = useLanguage()
     const navigate = useNavigate()

     return (
          <header className="header-componente">
               {/* ===== Itens a Esquerda ===== */}
               <motion.div className="wrapper" 
                           variants={containerVariants}
                           initial="hidden"
                           animate="visible"
                           
                           >
                    
                    <button className='btn-logo' onClick={() => navigate('/menu')}>
                         <motion.img src={logo} 
                                   variants={variantsLeft} 
                                   custom={0}/>
                    </button>
                    
                    <motion.div className="textos-header" 
                                variants={variantsLeft}
                                custom={1.5}>

                         <h1>{titulo}</h1>
                         {subtitulo && <p className="subtitulo">{subtitulo}</p>}

                    </motion.div>

               </motion.div>
               
               {/* ===== Botões da Direita ===== */}
               <motion.div className="btn-right" variants={containerVariants}
                           initial="hidden"
                           animate="visible">

                    <motion.button className='btn-idioma' onClick={alternarIdioma}
                            variants={variantsRight}
                            custom={1}
                            initial="hidden"
                            animate="visible">

                         {idioma === 'pt' 
                                   ? <h3>EN</h3>
                                   : <h3>PT</h3>
                         }

                    </motion.button>

                    <BotaoModo variants={variantsRight} custom={0.3}/>

               </motion.div>
          </header>
     )
}