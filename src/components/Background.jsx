import { useEffect, useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import Art from './Art'

function B({ d, l, t, mx, my }) {
  const x = useTransform(mx, (v) => -v * d * 70), y = useTransform(my, (v) => -v * d * 70)
  const s = 18 + d * 60
  return (
    <motion.div className="absolute" style={{ x, y, left: l + '%', top: t + '%', width: s, height: s, opacity: .25 + d * .5, filter: `blur(${(1 - d) * 3}px)` }}>
      <div className="animate-float size-full" style={{ animationDelay: `-${(d * 9).toFixed(1)}s` }}><Art kind="bean" /></div>
    </motion.div>
  )
}

export default function Background() {
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 })
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 })
  const beans = useMemo(() => Array.from({ length: 20 }, () => ({ d: Math.random(), l: Math.random() * 100, t: Math.random() * 100 })), [])
  useEffect(() => {
    const f = (e) => { mx.set(e.clientX / innerWidth - .5); my.set(e.clientY / innerHeight - .5) }
    addEventListener('pointermove', f)
    return () => removeEventListener('pointermove', f)
  }, [mx, my])
  return <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">{beans.map((b, i) => <B key={i} {...b} mx={mx} my={my} />)}</div>
}
