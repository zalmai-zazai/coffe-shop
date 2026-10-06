import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'
import Art from './Art'
import Tilt from './Tilt'
import Section from './Section'

function Count({ to, suffix = '' }) {
  const ref = useRef(null), seen = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return
    const c = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [seen, to])
  return <span ref={ref}>{n}{suffix}</span>
}

const STATS = [[12, '', 'years roasting'], [40, '+', 'single origins tried'], [18, 'k', 'cups a year']]

export default function About() {
  return (
    <Section id="about" title="About us">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="mb-4 text-lg text-latte">Ember &amp; Bean started as a single espresso machine in a corner of a bakery. We still roast in small batches, buy directly from farms we can name, and bake every morning before the doors open.</p>
          <p className="mb-8 text-lg text-latte">Come in for a quick flat white or stay for the afternoon. The corner table is yours.</p>
          <div className="grid grid-cols-3 gap-4">
            {STATS.map(([n, s, l]) => (
              <div key={l} className="rounded-2xl border border-crema/15 bg-crema/10 p-4">
                <div className="text-3xl font-extrabold text-amber sm:text-4xl"><Count to={n} suffix={s} /></div>
                <div className="text-sm text-latte">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4" style={{ perspective: 900 }}>
          {[['Roast', 'bean'], ['Brew', 'cup'], ['Bake', 'croissant'], ['Share', 'cake']].map(([t, k]) => (
            <Tilt key={t} k={18} className="rounded-3xl border border-crema/15 bg-crema/10 p-4 text-center">
              <div className="mx-auto size-24 [transform:translateZ(40px)]"><Art kind={k} /></div>
              <b className="[transform:translateZ(20px)]">{t}</b>
            </Tilt>
          ))}
        </div>
      </div>
    </Section>
  )
}
