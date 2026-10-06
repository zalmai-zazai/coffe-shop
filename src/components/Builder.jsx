import { useState } from 'react'
import { motion } from 'motion/react'
import Art from './Art'
import Tilt from './Tilt'
import Section from './Section'

const DR = { Espresso: [3.5, '#3b2314'], Latte: [5, '#c49a6c'], Mocha: [5.5, '#6b3f2a'], Matcha: [5.5, '#8a9a5b'], 'Cold brew': [5, '#4a2a18'] }
const SZ = { Small: [.85, 0], Medium: [1, .5], Large: [1.15, 1] }

function Group({ label, opts, val, set, off }) {
  return (
    <div className={`mb-5 ${off ? 'opacity-40' : ''}`}>
      <div className="mb-2 font-bold">{label}</div>
      <div className="flex flex-wrap gap-2">
        {opts.map((o) => (
          <button key={o} disabled={off} aria-pressed={val === o} onClick={() => set(o)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${val === o ? 'border-crema bg-crema text-espresso' : 'border-crema/20 bg-crema/10'}`}>{o}</button>
        ))}
      </div>
    </div>
  )
}

export default function Builder({ onAdd }) {
  const [d, setD] = useState('Latte'), [m, setM] = useState('Oat'), [s, setS] = useState('Medium')
  const milky = d === 'Latte' || d === 'Mocha'
  const price = DR[d][0] + SZ[s][1] + (milky && m === 'Oat' ? .6 : 0)
  return (
    <Section id="make" title="Make your drink" sub="Pick a drink, milk and size. The cup updates live.">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <Tilt k={22} className="grid h-96 place-items-center rounded-4xl border border-crema/15 bg-crema/10 bg-[radial-gradient(circle_at_50%_40%,rgba(233,163,91,.25),transparent_65%)]">
          <motion.div key={d} initial={{ rotateY: -180, scale: .6 }} animate={{ rotateY: 0, scale: SZ[s][0] }} transition={{ type: 'spring', stiffness: 160, damping: 14 }} className="size-72 drop-shadow-[0_30px_20px_rgba(0,0,0,.5)]">
            <Art kind={d === 'Cold brew' ? 'iced' : 'cup'} color={DR[d][1]} />
          </motion.div>
        </Tilt>
        <div>
          <motion.div key={price} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-4 text-5xl font-extrabold tracking-tight">${price.toFixed(2)}</motion.div>
          <Group label="Drink" opts={Object.keys(DR)} val={d} set={setD} />
          <Group label="Milk" opts={['Oat', 'Whole', 'None']} val={m} set={setM} off={!milky} />
          <Group label="Size" opts={Object.keys(SZ)} val={s} set={setS} />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }} className="rounded-full bg-amber px-6 py-3 font-bold text-espresso"
            onClick={() => onAdd({ id: `b-${d}-${milky ? m : ''}-${s}`, name: `${s} ${d}${milky && m !== 'None' ? ` (${m})` : ''}`, price: +price.toFixed(2) })}>Add to order</motion.button>
        </div>
      </div>
    </Section>
  )
}
