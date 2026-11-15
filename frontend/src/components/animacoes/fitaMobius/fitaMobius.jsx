import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function AbstractWave({ width = 800, height = 600, strokeCount = 28 }) {
  // Gera os caminhos (paths) SVG das linhas paralelas onduladas
  const paths = useMemo(() => {
    const lines = [];

    // Pontos de controle da linha Superior (Caminho 1)
    const p1 = { x1: 0, y1: height * 0.05, cx1: width * 0.4, cy1: height * 0.1, cx2: width * 0.7, cy2: height * 0.6, x2: width, y2: height * 0.95 };
    
    // Pontos de controle da linha Inferior (Caminho 2)
    const p2 = { x1: 0, y1: height * 0.12, cx1: width * 0.35, cy1: height * 0.45, cx2: width * 0.6, cy2: height * 0.3, x2: width, y2: height * 0.88 };

    // Interpolação linear entre p1 e p2 para criar o efeito de fita paralela
    for (let i = 0; i < strokeCount; i++) {
      const t = i / (strokeCount - 1);
      
      const startX = p1.x1 + (p2.x1 - p1.x1) * t;
      const startY = p1.y1 + (p2.y1 - p1.y1) * t;
      
      const cp1X = p1.cx1 + (p2.cx1 - p1.cx1) * t;
      const cp1Y = p1.cy1 + (p2.cy1 - p1.cy1) * t;
      
      const cp2X = p1.cx2 + (p2.cx2 - p1.cx2) * t;
      const cp2Y = p1.cy2 + (p2.cy2 - p1.cy2) * t;
      
      const endX = p1.x2 + (p2.x2 - p1.x2) * t;
      const endY = p1.y2 + (p2.y2 - p1.y2) * t;

      // Comando de curva de Bézier Cúbica em SVG (M = Move, C = Cubic Bezier)
      lines.push(`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`);
    }

    return lines;
  }, [width, height, strokeCount]);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ color: 'var(--cor-texto)', display: 'block' }}
    >
      <g stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.85">
        {paths.map((d, index) => (
          <motion.path
            key={index}
            d={d}
            animate={{
              d: [
                d,
                d.replace(/C [0-9.]+/g, `C ${width * 0.45 + (index % 3) * 5}`),
                d
              ]
            }}
            transition={{
              duration: 6 + (index % 4),
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: index * 0.05
            }}
          />
        ))}
      </g>
    </svg>
  );
}