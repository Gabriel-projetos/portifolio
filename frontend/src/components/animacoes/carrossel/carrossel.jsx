import './carrossel.css'

import { motion } from 'framer-motion'
import {
  SiCplusplus, SiPython, SiReact,
  SiArduino, SiGit, SiPostgresql, SiMysql
} from 'react-icons/si'

const techs = [
  { nome: 'C++',         Icon: SiCplusplus },
  { nome: 'Python',      Icon: SiPython },
  { nome: 'React',       Icon: SiReact },
  { nome: 'Arduino',     Icon: SiArduino },
  { nome: 'Git',         Icon: SiGit },
  { nome: 'Postgree',    Icon: SiPostgresql },
  { nome: 'MySQL',       Icon: SiMysql }
]

export default function Carrossel(){
     return(
          <div className="carrossel">
               <motion.div className="carrossel-track"
                           animate={{ x: ['0%', '-50%'] }}
                           transition={{
                              duration: 25,
                              ease: 'linear',
                              repeat: Infinity,
                           }}>
                    {[...techs, ...techs].map(({ nome, Icon }, i) => (
                         <div className="carrossel-item"
                              key={i}
                              aria-hidden={i >= techs.length}>
                              <Icon size={48}/>
                              <span>{nome}</span>
                         </div>
                    ))}
               </motion.div>
          </div>
     )
}