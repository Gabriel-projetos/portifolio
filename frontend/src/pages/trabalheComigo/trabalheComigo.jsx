import './trabalheComigo.css'
import Header                                     from "../../components/header/header"
import AbstractWave                               from '../../components/animacoes/fitaMobius/fitaMobius'
import Carrossel                                  from '../../components/animacoes/carrossel/carrossel'
import derBarbearia                               from '../../assets/derbarbearia.png'

import { useNavigate }                            from 'react-router-dom'
import { BotaoContato, BotaoRota }                from '../../components/botaoModo/botoes'
import { useLanguage }                            from "../../context/LanguageContext"
import { motion, AnimatePresence }                from 'framer-motion'
import { FiChevronDown, FiDatabase, FiLayout }    from 'react-icons/fi'
import { FaLinkedin, FaGithub }                   from 'react-icons/fa'
import { useState }                               from 'react'

export default function Trabalhos(){
     const { t } = useLanguage()
     const navigate = useNavigate()
     const [bdAberto, setBdAberto] = useState(false)
     const [uxAberto, setUxAberto] = useState(false)

     return(
          <>
          {/* Fundo absoluto cobrindo 100vw e 100vh de ponta a ponta */}
          <div className="abstract-wave-bg">
               <AbstractWave width={1200} height={800} />
          </div>

          {/* Container principal da página */}
          <div className="trabalhos-container">
               
               {/* Header flutuante/sticky visível durante todo o scroll */}
               <Header titulo={t.trabalhos.titulo} links={['menu', 'sobre', 'projetos']}/>

               <div className="header-hero-wrapper">

                    <div className="hero">
                         <div className="hero-left">
                              <h1>{t.trabalhos.tituloHero}</h1>
                              <div className="chamativo">
                                   <p className='chamativo-1'>{t.trabalhos.subtituloHero1}</p>
                                   <p className='chamativo-2'>{t.trabalhos.subtituloHero2}</p>
                              </div>
                              <BotaoContato/>
                              <motion.button
                                   className="seta-scroll"
                                   aria-label="Rolar para baixo"
                                   onClick={() =>
                                        document
                                             .querySelector('.landing-container')
                                             ?.scrollIntoView({ behavior: 'smooth' })
                                   }
                              >
                                   <FiChevronDown size={40} />
                              </motion.button>
                         </div>
                    </div>
               </div>

               <div className="landing-container">
                    <Carrossel/>
                    <div className='rows'>
                         <div className="row1">
                              <div className="text">
                                   <h1>{t.trabalhos.row1Titulo}</h1>
                                   <p>{t.trabalhos.row1Text}</p>
                                   <div className="btns">
                                        <BotaoRota
                                             texto={bdAberto ? t.trabalhos.verMenos : t.trabalhos.verMais}
                                             onClick={() => setBdAberto(!bdAberto)}
                                             />
                                        <BotaoContato/>
                                   </div>
                              </div>
                              <FiDatabase size={250} />
                         </div>{/* Row 1 */}
                         <AnimatePresence initial={false}>
                              {bdAberto && (
                                   <motion.div
                                        className="projeto-detalhe"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                   >
                                        <div className="projeto-detalhe-conteudo">
                                             <h2>{t.trabalhos.barbeariaTitulo}</h2>
                                             <p>{t.trabalhos.barbeariaTexto}</p>
                                             <img
                                                  className="projeto-imagem"
                                                  src={derBarbearia}
                                                  alt={t.trabalhos.barbeariaAlt}
                                                  loading="lazy"
                                             />
                                             <a href="https://github.com/Gabriel-projetos/barbearia-bd"
                                             target="_blank" rel="noopener noreferrer">
                                                  {t.trabalhos.verGithub}
                                             </a>
                                        </div>
                                   </motion.div>
                              )}
                         </AnimatePresence>
                         <div className="row1">
                              <FiLayout size={250} />
                              <div className="text">
                                   <h1>{t.trabalhos.row2Titulo}</h1>
                                   <p>{t.trabalhos.row2Text}</p>
                                   <div className="btns">
                                        <BotaoRota
                                             texto={uxAberto ? t.trabalhos.verMenos : t.trabalhos.verMais}
                                             onClick={() => setUxAberto(!uxAberto)}
                                             />
                                        <BotaoContato/>
                                   </div>
                              </div>
                         </div>{/* Row 2 */}
                         <AnimatePresence initial={false}>
                              {uxAberto && (
                                   <motion.div
                                        className="projeto-detalhe"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                   >
                                        <div className="projeto-detalhe-conteudo">
                                             <h2>{t.trabalhos.uxTitulo}</h2>
                                             <p>{t.trabalhos.uxTexto}</p>
                                             <a href="https://github.com/Gabriel-projetos/portifolio"
                                             target="_blank" rel="noopener noreferrer">
                                                  {t.trabalhos.verGithub}
                                             </a>
                                        </div>
                                   </motion.div>
                              )}
                         </AnimatePresence>
                         
                         <BotaoRota
                              texto={t.header.projetos}
                              onClick={() => navigate('/projetos')}
                              />

                         <div className="row-linhas">
                              <p className='linha'>
                                   {t.trabalhos.colum1}</p>

                              <p className='linha'>
                                   {t.trabalhos.colum2}</p>

                              <p className='linha'>
                                   {t.trabalhos.colum3}</p>

                         </div>{/* Row 3 */}
                    </div> {/* Rows */}
               </div>{/* Landing container */}

               <footer className="footer-trabalhos">
                    <div className="left">
                         <a href="/">
                              Gabriel Motta Rossetto</a>
                         <a href="/contato" className='subtitulo'>
                              {t.home.btn1}</a>
                         <a href="/sobre" className='subtitulo'>
                              {t.home.btn2}</a>
                    </div>

                    <div className="social-media">
                         <a href="http://www.linkedin.com/in/gabriel-motta-54a8ba272" 
                            target='_blank' rel='noopener noreferrer'>
                              <FaLinkedin size={25}/></a>
                         <a href="https://github.com/Gabriel-projetos"
                            target='_blank' rel='noopener noreferrer'>
                              <FaGithub size={25}/></a>
                    </div>
               </footer>
          </div>
          </>
     )
}