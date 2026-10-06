import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Art from './Art'
import Section from './Section'
import { GALLERY } from '../data'

export default function Gallery() {
  const [i, setI] = useState(null)
  const go = (d) => setI((v) => (v + d + GALLERY.length) % GALLERY.length)
  useEffect(() => {
    if (i === null) return
    const k = (e) => (e.key === 'Escape' ? setI(null) : e.key === 'ArrowRight' ? go(1) : e.key === 'ArrowLeft' ? go(-1) : 0)
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [i])
  return (
    <Section id="gallery" title="Gallery" sub="A look at what's on the counter. Tap a tile to open it, then use the arrow keys.">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {GALLERY.map(([kind, color, cap, bg], n) => (
          <motion.button key={n} layoutId={`g${n}`} onClick={() => setI(n)} whileHover={{ y: -8, rotate: n % 2 ? 2 : -2 }} whileTap={{ scale: .96 }}
            className={`group relative aspect-square overflow-hidden rounded-3xl border border-crema/15 bg-linear-to-br ${bg} p-4 ${n === 0 || n === 5 ? 'md:col-span-2 md:row-span-2' : ''}`}>
            <Art kind={kind} color={color} className="size-full transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
            <span className="absolute inset-x-0 bottom-0 translate-y-full bg-espresso/80 p-3 text-left text-sm font-semibold transition-transform group-hover:translate-y-0">{cap}</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {i !== null && (
          <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setI(null)} role="dialog" aria-label={GALLERY[i][2]}>
            <motion.div layoutId={`g${i}`} onClick={(e) => e.stopPropagation()} className={`relative w-full max-w-md rounded-4xl bg-linear-to-br ${GALLERY[i][3]} border border-crema/20 p-8`}>
              <Art kind={GALLERY[i][0]} color={GALLERY[i][1]} className="aspect-square w-full" />
              <p className="mt-4 text-center text-xl font-bold">{GALLERY[i][2]}</p>
              <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-2 top-1/2 grid size-10 place-items-center rounded-full bg-espresso/70 text-xl">‹</button>
              <button onClick={() => go(1)} aria-label="Next" className="absolute right-2 top-1/2 grid size-10 place-items-center rounded-full bg-espresso/70 text-xl">›</button>
              <button onClick={() => setI(null)} aria-label="Close" className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-espresso/70">×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
