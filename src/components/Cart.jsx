import { motion, AnimatePresence } from 'motion/react'

export default function Cart({ open, onClose, cart, setCart, onPlace }) {
  const total = cart.reduce((a, c) => a + c.price * c.qty, 0)
  const q = (id, d) => setCart((c) => c.map((x) => (x.id === id ? { ...x, qty: x.qty + d } : x)).filter((x) => x.qty > 0))
  return (
    <AnimatePresence>
      {open && <motion.div key="o" className="fixed inset-0 z-50 bg-black/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />}
      {open && (
        <motion.aside key="a" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-roast p-6 shadow-2xl" aria-label="Your order">
          <div className="mb-4 flex items-center justify-between"><b className="text-2xl">Your order</b><button onClick={onClose} aria-label="Close" className="size-9 rounded-full bg-crema/10">×</button></div>
          <ul className="flex-1 space-y-2 overflow-auto">
            <AnimatePresence initial={false}>
              {cart.map((c) => (
                <motion.li key={c.id} layout initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="flex items-center gap-2 rounded-2xl bg-crema/10 p-3">
                  <span className="flex-1 text-sm font-semibold">{c.name}</span>
                  <button onClick={() => q(c.id, -1)} aria-label="Less" className="size-7 rounded-full bg-crema/15">−</button>
                  <span className="w-5 text-center">{c.qty}</span>
                  <button onClick={() => q(c.id, 1)} aria-label="More" className="size-7 rounded-full bg-crema/15">+</button>
                  <span className="w-16 text-right text-sm">${(c.price * c.qty).toFixed(2)}</span>
                </motion.li>
              ))}
            </AnimatePresence>
            {!cart.length && <li className="py-10 text-center text-latte">Nothing yet. Add a drink from the menu.</li>}
          </ul>
          <div className="mt-4 flex justify-between text-xl font-extrabold"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <div className="mt-4 flex gap-2">
            <button disabled={!cart.length} onClick={onPlace} className="flex-1 rounded-full bg-amber py-3 font-bold text-espresso disabled:opacity-40">Place order</button>
            <button onClick={() => setCart([])} className="rounded-full border border-crema/20 px-4">Clear</button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
