import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Defs } from './components/Art'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Builder from './components/Builder'
import Gallery from './components/Gallery'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Rain from './components/Rain'

export default function App() {
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [rain, setRain] = useState(0)

  const flash = (t) => { setToast(t); clearTimeout(flash.t); flash.t = setTimeout(() => setToast(''), 1800) }
  const add = (it) => {
    setCart((c) => (c.some((x) => x.id === it.id)
      ? c.map((x) => (x.id === it.id ? { ...x, qty: x.qty + 1 } : x))
      : [...c, { id: it.id, name: it.name, price: it.price, qty: 1 }]))
    flash(`Added ${it.name}`)
  }
  const place = () => {
    setCart([]); setOpen(false); setRain((k) => k + 1); flash('Order placed. See you soon!')
    setTimeout(() => setRain(0), 3600)
  }

  return (
    <>
      <Defs />
      <Background />
      <Navbar count={cart.reduce((a, c) => a + c.qty, 0)} onCart={() => setOpen(true)} />
      <main className="relative z-10">
        <Hero />
        <Menu onAdd={add} />
        <Builder onAdd={add} />
        <Gallery />
        <About />
        <Testimonials />
      </main>
      <Footer />
      <Cart open={open} onClose={() => setOpen(false)} cart={cart} setCart={setCart} onPlace={place} />
      {rain > 0 && <Rain key={rain} />}
      <AnimatePresence>
        {toast && (
          <motion.div role="status" initial={{ opacity: 0, y: 30, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: 30, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-[70] rounded-full bg-crema px-6 py-3 font-bold text-espresso">{toast}</motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
