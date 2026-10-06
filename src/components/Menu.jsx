import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Art from './Art'
import Tilt from './Tilt'
import Section from './Section'
import { useLocal } from '../hooks'
import { MENU, CATS, ARTS } from '../data'

const inp = 'w-full rounded-lg bg-crema/10 px-2 py-1.5 outline-none focus:ring-2 focus:ring-amber'
const btn = 'rounded-full border border-crema/20 px-4 py-2 text-sm font-semibold hover:bg-crema/10'

function Card({ item, edit, upd, remove, onAdd, ...rest }) {
  return (
    <Tilt {...rest} layout initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .6, rotate: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }} className="relative rounded-3xl border border-crema/15 bg-crema/10 p-5">
      {edit && <button onClick={remove} aria-label={`Remove ${item.name}`} className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-red-500/80 font-bold">×</button>}
      <div className="h-36 [transform:translateZ(50px)] drop-shadow-[0_18px_14px_rgba(0,0,0,.45)]"><Art kind={item.art} color={item.color} /></div>
      {edit ? (
        <div className="mt-3 space-y-2">
          <input className={inp} value={item.name} onChange={(e) => upd({ name: e.target.value })} aria-label="Name" />
          <input className={inp} value={item.desc} onChange={(e) => upd({ desc: e.target.value })} aria-label="Description" />
          <div className="flex gap-2">
            <input className={inp} type="number" min="0" step=".25" value={item.price} onChange={(e) => upd({ price: +e.target.value })} aria-label="Price" />
            <select className={inp} value={item.cat} onChange={(e) => upd({ cat: e.target.value })} aria-label="Category">{CATS.map((c) => <option key={c} className="text-black">{c}</option>)}</select>
          </div>
        </div>
      ) : (
        <div className="mt-3 [transform:translateZ(30px)]">
          <b className="block text-xl tracking-tight">{item.name}</b>
          <small className="mb-3 block text-latte">{item.desc}</small>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">${item.price.toFixed(2)}</span>
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: .9 }} onClick={onAdd} className="rounded-full bg-amber px-4 py-2 text-sm font-bold text-espresso">Add</motion.button>
          </div>
        </div>
      )}
    </Tilt>
  )
}

export default function Menu({ onAdd }) {
  const [items, setItems] = useLocal('eb-menu', MENU)
  const [cat, setCat] = useState('All')
  const [edit, setEdit] = useState(false)
  const [open, setOpen] = useState(false)
  const blank = { name: '', desc: '', price: '4', cat: 'Hot', art: 'cup', color: '#c49a6c' }
  const [f, setF] = useState(blank)
  const shown = cat === 'All' ? items : items.filter((i) => i.cat === cat)
  const upd = (id, p) => setItems((a) => a.map((i) => (i.id === id ? { ...i, ...p } : i)))
  const submit = (e) => {
    e.preventDefault()
    if (!f.name.trim()) return
    setItems((a) => [{ ...f, id: Date.now(), name: f.name.trim(), price: +f.price || 0 }, ...a])
    setF(blank); setOpen(false); setCat('All')
  }
  return (
    <Section id="menu" title="Today's menu" sub="Hover a card to tilt it. Switch on Edit menu to rename, reprice, remove or add your own items.">
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {['All', ...CATS].map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`rounded-full border px-4 py-2 text-sm font-semibold ${cat === c ? 'border-crema bg-crema text-espresso' : 'border-crema/20'}`}>{c}</button>
        ))}
        <span className="mx-auto" />
        <button className={btn} aria-pressed={edit} onClick={() => setEdit((v) => !v)}>{edit ? 'Done editing' : 'Edit menu'}</button>
        <button className={btn} onClick={() => setOpen((v) => !v)}>{open ? 'Close' : 'Add item'}</button>
        <button className={btn} onClick={() => confirm('Restore the default menu?') && setItems(MENU)}>Reset</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.form onSubmit={submit} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
            <div className="grid gap-3 rounded-3xl border border-crema/15 bg-crema/10 p-5 sm:grid-cols-6">
              <input className={inp + ' sm:col-span-2'} placeholder="Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} required />
              <input className={inp + ' sm:col-span-2'} placeholder="Short description" value={f.desc} onChange={(e) => setF({ ...f, desc: e.target.value })} />
              <input className={inp} type="number" min="0" step=".25" value={f.price} onChange={(e) => setF({ ...f, price: e.target.value })} aria-label="Price" />
              <select className={inp} value={f.cat} onChange={(e) => setF({ ...f, cat: e.target.value })} aria-label="Category">{CATS.map((c) => <option key={c} className="text-black">{c}</option>)}</select>
              <select className={inp + ' sm:col-span-2'} value={f.art} onChange={(e) => setF({ ...f, art: e.target.value })} aria-label="Picture">{ARTS.map((a) => <option key={a} className="text-black">{a}</option>)}</select>
              <label className="flex items-center gap-2 text-sm text-latte">Drink color <input type="color" value={f.color} onChange={(e) => setF({ ...f, color: e.target.value })} className="h-8 w-12 rounded" /></label>
              <button className="rounded-full bg-amber px-4 py-2 font-bold text-espresso sm:col-span-2">Add to menu</button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 900 }}>
        <AnimatePresence mode="popLayout">
          {shown.map((it) => (
            <Card key={it.id} item={it} edit={edit} upd={(p) => upd(it.id, p)} remove={() => setItems((a) => a.filter((i) => i.id !== it.id))} onAdd={() => onAdd(it)} />
          ))}
        </AnimatePresence>
      </motion.div>
      {!shown.length && <p className="py-10 text-center text-latte">No items here yet. Use Add item to create one.</p>}
    </Section>
  )
}
