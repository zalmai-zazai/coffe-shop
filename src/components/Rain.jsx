import { useMemo } from 'react'
import { motion } from 'motion/react'
import Art from './Art'

export default function Rain() {
  const beans = useMemo(() => Array.from({ length: 30 }, () => ({ l: Math.random() * 100, s: 24 + Math.random() * 30, d: Math.random() * .6, t: 1.6 + Math.random(), r: Math.random() * 540 })), [])
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden="true">
      {beans.map((b, i) => (
        <motion.div key={i} className="absolute top-0" style={{ left: b.l + '%', width: b.s, height: b.s, transformPerspective: 600 }}
          initial={{ y: -80, rotateX: 0, rotateZ: 0 }} animate={{ y: innerHeight + 120, rotateX: 720, rotateZ: b.r }} transition={{ duration: b.t, delay: b.d, ease: [.4, 0, .9, .6] }}>
          <Art kind="bean" />
        </motion.div>
      ))}
    </div>
  )
}
