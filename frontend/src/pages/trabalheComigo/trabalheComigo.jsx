import './trabalheComigo.css'
import Header                                     from "../../components/Header/Header"
import AbstractWave                               from '../../components/animacoes/fitaMobius/fitaMobius'
import Carrossel                                  from '../../components/animacoes/carrossel/carrossel'

import { BotaoContato }                           from '../../components/botaoModo/botoes'
import { useLanguage }                            from "../../context/LanguageContext"
import { motion }                                 from 'framer-motion'
import { FiChevronDown, FiDatabase, FiLayout }    from 'react-icons/fi'
import { FaLinkedin, FaGithub }                   from 'react-icons/fa'

export default function Trabalhos(){
     const { t } = useLanguage()

     return(
          <>
          {/* Fundo absoluto cobrindo 100vw e 100vh de ponta a ponta */}
          <div className="abstract-wave-bg">
               <AbstractWave width={1200} height={800} />
          </div>

          {/* Container principal da página */}
          <div className="trabalhos-container">
               
               {/* Header e Hero compartilham a mesma largura/padding */}
               <div className="header-hero-wrapper">
                    <Header titulo={t.trabalhos.titulo} />

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
                                   <BotaoContato/>
                              </div>
                              <FiDatabase size={250} />
                         </div>{/* Row 1 */}

                         <div className="row1">
                              <FiLayout size={250} />
                              <div className="text">
                                   <h1>{t.trabalhos.row2Titulo}</h1>
                                   <p>{t.trabalhos.row2Text}</p>
                                   <BotaoContato/>
                              </div>
                         </div>{/* Row 2 */}

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