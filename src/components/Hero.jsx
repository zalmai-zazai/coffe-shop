import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import Art from './Art'

const FACES = [['Latte', 'cup', '#c49a6c'], ['Cold brew', 'iced', '#4a2a18'], ['Croissant', 'croissant'], ['Muffin', 'muffin'], ['Matcha', 'cup', '#8a9a5b'], ['Beans', 'bean']]
const WORDS = 'Slow coffee, spinning fast.'.split(' ')

export default function Hero() {
  const ring = useRef(null), wrap = useRef(null)
  const s = useRef({ a: 0, v: .3, t: -8, tt: -8, d: false, x: 0 })
  useEffect(() => {
    let id
    const loop = () => {
      const q = s.current
      if (!q.d) { q.v += (.3 - q.v) * .03; q.a += q.v }
      q.t += (q.tt - q.t) * .08
      if (ring.current) ring.current.style.transform = `rotateX(${q.t}deg) rotateY(${q.a}deg)`
      id = requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(id)
  }, [])
  const down = (e) => { s.current.d = true; s.current.x = e.clientX; wrap.current.setPointerCapture(e.pointerId) }
  const move = (e) => {
    const q = s.current, r = wrap.current.getBoundingClientRect()
    q.tt = -((e.clientY - r.top) / r.height - .5) * 30
    if (q.d) { const dx = e.clientX - q.x; q.v = dx * .4; q.a += dx * .4; q.x = e.clientX }
  }
  return (
    <section id="home" className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-6 px-6 pt-24 md:grid-cols-2">
      <div>
        <h1 className="mb-6 text-5xl font-extrabold leading-[.92] tracking-tighter sm:text-7xl lg:text-8xl" aria-label="Slow coffee, spinning fast.">
          {WORDS.map((w, i) => (
            <motion.span key={i} className="mr-[.25em] inline-block origin-bottom" initial={{ opacity: 0, y: 60, rotateX: -70 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: i * .1, duration: .9, ease: [.2, .8, .2, 1] }}>{w}</motion.span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 }} className="mb-6 max-w-md text-lg text-latte">Small-batch espresso, cold brew and fresh bakes. Drag the ring, edit the menu, build your own cup.</motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8 }} className="flex flex-wrap gap-3">
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }} href="#make" className="rounded-full bg-amber px-6 py-3 font-bold text-espresso">Make your drink</motion.a>
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }} href="#menu" className="rounded-full border border-crema/25 px-6 py-3 font-bold">See the menu</motion.a>
        </motion.div>
      </div>
      <div>
        <div ref={wrap} onPointerDown={down} onPointerMove={move} onPointerUp={() => (s.current.d = false)} onPointerLeave={() => (s.current.tt = -8)}
          className="grid h-[350px] cursor-grab touch-pan-y place-items-center active:cursor-grabbing sm:h-[430px]" style={{ perspective: 1100 }} aria-label="Ring of coffee items. Drag to spin.">
          <div ref={ring} className="relative h-[180px] w-[130px] [--r:215px] sm:h-[220px] sm:w-[170px] sm:[--r:290px]" style={{ transformStyle: 'preserve-3d' }}>
            {FACES.map(([n, kind, c], i) => (
              <div key={n} className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-crema/20 bg-linear-to-br from-crema/20 to-crema/5 p-3 text-sm font-extrabold [backface-visibility:hidden] sm:text-lg"
                style={{ transform: `rotateY(${i * 60}deg) translateZ(var(--r))` }}>
                <Art kind={kind} color={c} className="h-28 w-full sm:h-36" /><span>{n}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-sm text-latte">Drag to spin. Tilt with your pointer.</p>
      </div>
    </section>
  )
}
