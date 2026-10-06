import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

const L = [['home', 'Home'], ['menu', 'Menu'], ['make', 'Make yours'], ['gallery', 'Gallery'], ['about', 'About'], ['reviews', 'Reviews']]

export default function Navbar({ count, onCart }) {
  const [act, setAct] = useState('home')
  const { scrollYProgress } = useScroll()
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 20 })
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setAct(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    L.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <nav className="fixed inset-x-0 top-0 z-40 border-b border-crema/10 bg-espresso/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <a href="#home" className="text-lg font-extrabold tracking-tight max-sm:hidden">Ember &amp; Bean</a>
        <ul className="no-scrollbar mx-auto flex gap-1 overflow-x-auto rounded-full border border-crema/15 p-1">
          {L.map(([id, t]) => (
            <li key={id}>
              <a href={'#' + id} className={`relative block whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold ${act === id ? 'text-espresso' : 'text-latte hover:text-crema'}`}>
                {act === id && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-crema" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative">{t}</span>
              </a>
            </li>
          ))}
        </ul>
        <button onClick={onCart} className="flex items-center gap-2 rounded-full border border-crema/20 bg-crema/10 px-4 py-2 text-sm font-semibold hover:bg-crema/20">
          Order <motion.b key={count} initial={{ scale: 1.8 }} animate={{ scale: 1 }} className="grid size-6 place-items-center rounded-full bg-amber text-espresso">{count}</motion.b>
        </button>
      </div>
      <motion.div style={{ scaleX: sx }} className="h-0.5 origin-left bg-amber" />
    </nav>
  )
}
