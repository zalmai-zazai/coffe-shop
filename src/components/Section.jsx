import { motion } from 'motion/react'

export default function Section({ id, title, sub, children }) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }} transition={{ duration: .7, ease: [.2, .8, .2, 1] }}>
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl">{title}</h2>
        {sub && <p className="mt-3 max-w-xl text-lg text-latte">{sub}</p>}
        <div className="mt-10">{children}</div>
      </motion.div>
    </section>
  )
}
