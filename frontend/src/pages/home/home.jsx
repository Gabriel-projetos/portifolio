import "./home.css"

import { useLanguage } from "../../context/LanguageContext"
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom"

import Header from "../../components/Header/Header"
import LinhasFundo from "../../components/animacoes/home/LinhasFundo"

const containerVariants = {
     hidden: {},
     visible: {
          transition: { staggerChildren: 0.15 }
     }
}

const botaoVariants = {
     hidden: { opacity: 0, x: -50 },
     visible: (delay) => ({
          opacity: 1, 
          x: 0,
          transition: { duration: 0.5, delay}
     })
}

const underlineVariants = {
     hidden: {width: "0%"},
     hover:  {width: "100%"},    
}

export default function Home(){
     const { t } = useLanguage()
     const navigate = useNavigate('')

     return(
          <div className="home">
               <LinhasFundo/>
               <Header titulo={t.home.titulo} subtitulo={t.home.subtitulo} />

               <motion.div className="botoes"
                           variants={containerVariants}
                           initial="hidden"
                           animate="visible">
                    
                    {/* Botão Contato */}
                    <motion.button className="btn-pages" onClick={() => navigate('/contato')}
                                   variants={botaoVariants}
                                   custom={2}
                                   initial="hidden"
                                   animate="visible"
                                   whileHover="hover">
                         <span className="btn-text">{t.home.btn1}</span>
                         <motion.span
                              className="underline-left"
                              variants={underlineVariants}
                              transition={{ duration: 0.3, ease: "easeInOut" }}/>
                         <motion.span
                              className="underline-right"
                              variants={underlineVariants}
                              transition={{ duration: 0.3, ease: "easeInOut" }}/>                    
                    </motion.button>

                    {/* Botão Sobre Mim */}
                    <motion.button className="btn-pages"
                                   variants={botaoVariants}
                                   custom={2.3}
                                   initial="hidden"
                                   animate="visible"
                                   whileHover="hover">
                         <span className="btn-text">{t.home.btn2}</span>
                         <motion.span
                              className="underline-left"
                              variants={underlineVariants}
                              transition={{ duration: 0.3, ease: "easeInOut" }}/>
                         <motion.span
                              className="underline-right"
                              variants={underlineVariants}
                              transition={{ duration: 0.3, ease: "easeInOut" }}/>                    
                    </motion.button>

                    {/* Botão Meus Trabalhos */}
                    <motion.button className="btn-pages"  onClick={() => navigate('/trabalhos')}
                                   variants={botaoVariants}
                                   custom={2.6}
                                   initial="hidden"
                                   animate="visible"
                                   whileHover="hover">
                         <span className="btn-text">{t.home.btn3}</span>
                         <motion.span
                              className="underline-left"
                              variants={underlineVariants}
                              transition={{ duration: 0.3, ease: "easeInOut" }}/>
                         <motion.span
                              className="underline-right"
                              variants={underlineVariants}
                              transition={{ duration: 0.3, ease: "easeInOut" }}/>                    
                    </motion.button>
               </motion.div>
          </div>
     )
}