import { motion } from 'framer-motion'
import './esferas.css'

import { useMemo } from 'react'

// === Variantes ============================
const variants = {
  hidden:  { opacity: 0, scale: 0.4 },
  visible: { opacity: 0.25, scale: 1 },
}

// === Configurações ========================
const SPHERE_COUNT = 10       // quantidade de esferas
const MIN_SIZE = 20           // menor diâmetro (px)
const MAX_SIZE = 200          // maior diâmetro (px)
const MAX_DELAY = 1500        // atraso máximo antes de cada esfera aparecer (ms)
const ANIM_DURATION = 900     // duração da animação de entrada de cada esfera (ms)
const COLORS = ['--cor-destaque']

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

// Gera as propriedades de cada esfera: posição, tamanho, cor e delay,
// tudo aleatório -> muda a cada vez que a página é carregada.
function generateSpheres(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: randomBetween(0, 100),     // % da altura da página
    left: randomBetween(0, 100),    // % da largura da página
    size: randomBetween(MIN_SIZE, MAX_SIZE),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: randomBetween(0, MAX_DELAY),
  }))
}

const FloatingSpheres = ({ count = SPHERE_COUNT }) => {
  // useMemo garante que as esferas só são sorteadas uma vez por carregamento,
  // e não a cada re-render do componente
  const spheres = useMemo(() => generateSpheres(count), [count])

  return (
    <div className="esferas">
      {spheres.map((sphere) => (
        <motion.div
          key={sphere.id}
          className="sphere"
          style={{
            '--sphere-top': `${sphere.top}%`,
            '--sphere-left': `${sphere.left}%`,
            '--sphere-size': `${sphere.size}px`,
            '--sphere-color': `var(${sphere.color})`,
          }}
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{
            duration: ANIM_DURATION / 1000,
            delay: sphere.delay / 1000,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

export default FloatingSpheres