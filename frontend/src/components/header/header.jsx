import { BotaoModo } from '../botaoModo/botoes'

import { Link } from 'react-router-dom'
import { useLanguage } from "../../context/LanguageContext"
import { motion } from 'framer-motion'

import './header.css'

// Mapa único: chave -> rota. O texto vem das traduções (t.header[chave])
const ROTAS = {
     menu:           '/menu',
     sobre:          '/sobre',
     projetos:       '/projetos',
     contato:        '/contato',
     trabalheComigo: '/',
}

const containerVariants = {
     hidden: {},
     visible: {
          transition: { staggerChildren: 0.7 }
     }
}

const navVariants = {
     hidden: {},
     visible: {
          transition: { staggerChildren: 0.12, delayChildren: 0.4 }
     }
}

const variantsLeft = {
     hidden: { opacity: 0, x: -50 },
     visible: (delay) => ({
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, delay }
     })
}

const variantsRight = {
     hidden: { opacity: 0, x: 50 },
     visible: (delay) => ({
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, delay }
     })
}

const variantsNav = {
     hidden: { opacity: 0, y: -10 },
     visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4 }
     }
}

export default function Header({ titulo, subtitulo, links = [] }){
     const { t, idioma, alternarIdioma } = useLanguage()

     const linksValidos = links.filter((chave) => ROTAS[chave])

     return (
          <header className="header-componente">
               {/* ===== Esquerda: título ===== */}
               <motion.div className="wrapper"
                           variants={containerVariants}
                           initial="hidden"
                           animate="visible">

                    <motion.div className="textos-header"
                                variants={variantsLeft}
                                custom={1.5}>
                         <h1>{titulo}</h1>
                         {subtitulo && <p className="subtitulo">{subtitulo}</p>}
                    </motion.div>
               </motion.div>

               {/* ===== Centro: navegação ===== */}
               {linksValidos.length > 0 && (
                    <motion.nav className="header-nav"
                                aria-label="Principal"
                                variants={navVariants}
                                initial="hidden"
                                animate="visible">

                         {linksValidos.map((chave) => (
                              <motion.div key={chave} variants={variantsNav}>
                                   <Link to={ROTAS[chave]} className="header-link">
                                        {t.header[chave]}
                                   </Link>
                              </motion.div>
                         ))}
                    </motion.nav>
               )}

               {/* ===== Direita: idioma e modo ===== */}
               <motion.div className="btn-right"
                           variants={containerVariants}
                           initial="hidden"
                           animate="visible">

                    <motion.button className="btn-idioma"
                                   onClick={alternarIdioma}
                                   variants={variantsRight}
                                   custom={1}>
                         <h3>{idioma === 'pt' ? 'EN' : 'PT'}</h3>
                    </motion.button>

                    <BotaoModo variants={variantsRight} custom={0.3}/>
               </motion.div>
          </header>
     )
}