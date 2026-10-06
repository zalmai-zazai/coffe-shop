import { useState } from 'react'
import { motion } from 'motion/react'

export default function Footer() {
  const [email, setEmail] = useState(''), [done, setDone] = useState(false)
  return (
    <footer className="relative z-10 border-t border-crema/10 bg-espresso/70 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <b className="text-xl">Ember &amp; Bean</b>
          <p className="mt-2 text-sm text-latte">Small-batch coffee, baked daily.</p>
        </div>
        <div className="text-sm text-latte">
          <b className="mb-2 block text-crema">Hours</b>
          Mon–Fri 7am–6pm<br />Sat–Sun 8am–5pm
        </div>
        <div className="text-sm text-latte">
          <b className="mb-2 block text-crema">Find us</b>
          12 Roast Lane<br />hello@emberandbean.example
        </div>
        <form onSubmit={(e) => { e.preventDefault(); email && setDone(true) }} className="text-sm">
          <b className="mb-2 block">Weekly new beans</b>
          {done ? (
            <motion.p initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-sage">Thanks! You're on the list.</motion.p>
          ) : (
            <div className="flex gap-2">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" aria-label="Email" className="min-w-0 flex-1 rounded-full bg-crema/10 px-4 py-2 outline-none focus:ring-2 focus:ring-amber" />
              <button className="rounded-full bg-amber px-4 py-2 font-bold text-espresso">Join</button>
            </div>
          )}
        </form>
      </div>
      <div className="flex items-center justify-between border-t border-crema/10 px-6 py-4 text-xs text-latte">
        <span>© {new Date().getFullYear()} Ember &amp; Bean</span>
        <a href="#home" className="font-semibold hover:text-crema">Back to top ↑</a>
      </div>
    </footer>
  )
}
