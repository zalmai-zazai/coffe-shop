import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Section from './Section'
import { REVIEWS } from '../data'

export default function Testimonials() {
  const [i, setI] = useState(0), [hold, setHold] = useState(false)
  useEffect(() => {
    if (hold) return
    const t = setInterval(() => setI((v) => (v + 1) % REVIEWS.length), 5000)
    return () => clearInterval(t)
  }, [hold])
  const r = REVIEWS[i]
  return (
    <Section id="reviews" title="What people say">
      <div onPointerEnter={() => setHold(true)} onPointerLeave={() => setHold(false)} style={{ perspective: 1200 }}>
        <AnimatePresence mode="wait">
          <motion.figure key={i} initial={{ rotateY: 80, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -80, opacity: 0 }} transition={{ duration: .5, ease: [.2, .8, .2, 1] }}
            className="mx-auto max-w-2xl rounded-4xl border border-crema/15 bg-crema/10 p-8 text-center">
            <div className="mb-3 text-amber" aria-label="5 out of 5 stars">★★★★★</div>
            <blockquote className="text-xl leading-relaxed sm:text-2xl">“{r.text}”</blockquote>
            <figcaption className="mt-5 font-bold">{r.name} <span className="font-normal text-latte">· {r.role}</span></figcaption>
          </motion.figure>
        </AnimatePresence>
        <div className="mt-6 flex justify-center gap-2">
          {REVIEWS.map((_, n) => <button key={n} onClick={() => setI(n)} aria-label={`Review ${n + 1}`} className={`h-2.5 rounded-full transition-all ${n === i ? 'w-8 bg-amber' : 'w-2.5 bg-crema/30'}`} />)}
        </div>
      </div>
    </Section>
  )
}
