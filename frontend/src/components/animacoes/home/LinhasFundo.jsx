import { useState } from "react"
import { useAnimationFrame } from "framer-motion"
import "./LinhasFundo.css"

const numLinhas = 18

// cada linha recebe frequências e fases pseudo-aleatórias, geradas uma vez só
const seedsLinhas = Array.from({ length: numLinhas }).map((_, i) => ({
     freq1: 0.003 + Math.random() * 0.004,
     freq2: 0.007 + Math.random() * 0.006,
     freq3: 0.0015 + Math.random() * 0.003,
     fase1: Math.random() * Math.PI * 2,
     fase2: Math.random() * Math.PI * 2,
     fase3: Math.random() * Math.PI * 2,
     velocidade1: 0.00006 + Math.random() * 0.00008,
     velocidade2: -(0.00004 + Math.random() * 0.00007),
     velocidade3: 0.00002 + Math.random() * 0.00004,
     amplitude: 20 + Math.random() * 25,
     baseY: (i / (numLinhas - 1)) * 700 - 50
}))

export default function FluxoOrganico(){
     const [caminhos, setCaminhos] = useState([])

     useAnimationFrame((t) => {
          const largura = 1000
          const passo = 12

          const novasLinhas = seedsLinhas.map((s) => {
               let d = ""

               for(let x = 0; x <= largura; x += passo){
                    // 3 ondas com frequências, fases e velocidades diferentes, somadas
                    const onda1 = Math.sin(x * s.freq1 + t * s.velocidade1 + s.fase1) * s.amplitude
                    const onda2 = Math.sin(x * s.freq2 + t * s.velocidade2 + s.fase2) * (s.amplitude * 0.5)
                    const onda3 = Math.sin(x * s.freq3 + t * s.velocidade3 + s.fase3) * (s.amplitude * 0.7)

                    const y = s.baseY + onda1 + onda2 + onda3

                    d += x === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`
               }

               return d
          })

          setCaminhos(novasLinhas)
     })

     return (
          <svg viewBox="0 0 1000 600" className="fluxo-fundo" preserveAspectRatio="xMidYMid slice">
               {caminhos.map((d, i) => (
                    <path
                         key={i}
                         d={d}
                         stroke="var(--cor-icons)"
                         strokeWidth="1"
                         fill="none"
                         opacity={0.12 + (i % 3) * 0.03}
                    />
               ))}
          </svg>
     )
}