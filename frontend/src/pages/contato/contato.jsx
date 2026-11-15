import './contato.css'

import { useLanguage }                       from "../../context/LanguageContext"
import { motion }                            from 'framer-motion'

import Header                                from '../../components/Header/Header'
import FloatingSpheres                       from '../../components/animacoes/esferas/esferas'
import Form                                  from '../../components/formulario/formulario'

const containerVariants = {
     hidden: {},
     visible: {
          damping: 8, 
          transition: { staggerChildren: 0.7 }
     }
}

const iconsContainerVariants = {
     hidden: {},
     visible: {
          transition: { 
               delayChildren: 1.2,
               staggerChildren: 0.15 
          }
     }
}

const iconeVariants = {
     hidden: { opacity: 0, x: -20 },
     visible: { opacity: 1, x: 0, transition: { duration: 0.4 }}
}

const redesSociais = [
     { nome: "GitHub",                  link: "https://github.com/Gabriel-projetos" },
     { nome: "Linkedin",                link: "http://www.linkedin.com/in/gabriel-motta-54a8ba272" }
]

export default function Contato(){
     const { t } = useLanguage()

     return(
          <>
          <FloatingSpheres/>
          <div className='contato'>
               <Header titulo={t.contato.titulo} />
               <motion.div className="container-contato"
                           variants={containerVariants}
                           initial="hidden"
                           animate="visible">
                    <motion.div className="icons-container"
                                variants={iconsContainerVariants}
                                custom={2}>
                         {redesSociais.map((rede, i) => 
                              <motion.a className='midia-icons' key={i} href={rede.link} target='_blank' rel='noopener noreferrer'
                                        variants={iconeVariants}>
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
                                   <span>{rede.nome}</span>
                              </motion.a>
                         )}
                    </motion.div>

                    <div className='text'>
                         <h1>Formulário de Email</h1>
                         <Form texto={"Enviar"} />
                    </div>
               </motion.div>
          </div>
          </>
     )
}