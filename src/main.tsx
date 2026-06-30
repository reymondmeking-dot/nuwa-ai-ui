import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import './styles.css'

type Slide = {
  marker: string
  eyebrow: string
  title: React.ReactNode
  copy: string
  action: string
  visual: 'threads' | 'iris' | 'sphere' | 'grid'
}

const slides: Slide[] = [
  {
    marker: 'A',
    eyebrow: '[ v01b ]',
    title: (
      <>
        WHERE AI<br />MERGES<br /><span className="thin">with</span><br />
        <span className="indent">// YOUR</span><br />
        <span className="indent deep">VISION</span>
      </>
    ),
    copy: 'NUWA transforms intuition into interface systems — a calm, precise workspace for ideas before they become products.',
    action: 'GET STARTED',
    visual: 'threads',
  },
  {
    marker: 'B',
    eyebrow: '[ neural canvas ]',
    title: (
      <>
        START <span className="thin">seeing</span><br />DIFFERENTLY
      </>
    ),
    copy: 'A visual AI layer that interprets direction, iterates silently, and gives your team sharper creative confidence.',
    action: 'TRY SOMETHING',
    visual: 'iris',
  },
  {
    marker: 'C',
    eyebrow: '[ design engine ]',
    title: (
      <>
        BUILD<br />BEYOND<br />IMAGINATION
      </>
    ),
    copy: 'From landing pages to product flows, NUWA produces elegant systems with hierarchy, rhythm, and motion discipline.',
    action: 'EXPLORE NOW',
    visual: 'sphere',
  },
  {
    marker: 'D',
    eyebrow: '[ launch ready ]',
    title: (
      <>
        // CREATE<br />WITHOUT<br />LIMITS
      </>
    ),
    copy: 'Every artifact is prepared for speed: lightweight code, responsive structure, and a premium presentation layer.',
    action: 'START CREATING',
    visual: 'grid',
  },
]

function Particles() {
  const particles = useMemo(
    () => Array.from({ length: 22 }, (_, index) => ({
      id: index,
      left: `${5 + ((index * 41) % 90)}%`,
      top: `${7 + ((index * 57) % 82)}%`,
      size: 2 + (index % 5),
      delay: `${(index % 11) * 0.32}s`,
      duration: `${6 + (index % 7)}s`,
    })),
    [],
  )

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((dot) => (
        <span
          key={dot.id}
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            animationDelay: dot.delay,
            animationDuration: dot.duration,
          }}
        />
      ))}
    </div>
  )
}

function Visual({ type }: { type: Slide['visual'] }) {
  return (
    <div className={`visual visual-${type}`} aria-hidden="true">
      {type === 'threads' && (
        <>
          <i /><i /><i /><i /><i /><i /><i />
          <b />
        </>
      )}
      {type === 'iris' && (
        <>
          {Array.from({ length: 28 }, (_, i) => <i key={i} style={{ rotate: `${i * 12.85}deg` }} />)}
          <b />
        </>
      )}
      {type === 'sphere' && (
        <>
          <i /><i /><i /><i /><i />
          <b />
        </>
      )}
      {type === 'grid' && (
        <>
          {Array.from({ length: 24 }, (_, i) => <i key={i} />)}
          <b />
        </>
      )}
    </div>
  )
}

function App() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const slide = slides[active]

  const goTo = (next: number) => {
    setDirection(next >= active ? 1 : -1)
    setActive((next + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = window.setInterval(() => goTo(active + 1), 9000)
    return () => window.clearInterval(timer)
  }, [active])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') goTo(active + 1)
      if (event.key === 'ArrowLeft') goTo(active - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <main className="site-shell">
      <section className="stage">
        <Particles />

        <nav className="nav">
          <a className="brand" href="#" aria-label="NUWA AI home">
            <span>(NUWA_AI)</span>
            <small>{slide.eyebrow}</small>
          </a>
          <div className="links">
            <a href="#">home ↗</a>
            <a href="#">plans ↗</a>
            <a href="#">services ↗</a>
            <a href="#">contact us ↗</a>
          </div>
        </nav>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            className="slide"
            initial={{ opacity: 0, x: direction * 36, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: direction * -24, filter: 'blur(8px)' }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="copy-block">
              <p className="kicker">AI interface studio</p>
              <h1>{slide.title}</h1>
            </div>
            <Visual type={slide.visual} />
          </motion.div>
        </AnimatePresence>

        <button className="arrow previous" onClick={() => goTo(active - 1)} aria-label="Previous slide">←</button>
        <button className="arrow next" onClick={() => goTo(active + 1)} aria-label="Next slide">→</button>

        <aside className="caption-panel">
          <strong>({slide.marker})</strong>
          <code>[ {String(active + 1).padStart(3, '0')} /{String(slides.length).padStart(3, '0')} ]</code>
          <p>{slide.copy}</p>
          <button>{slide.action}</button>
        </aside>

        <div className="dots" aria-label="Slide navigation">
          {slides.map((item, index) => (
            <button
              key={item.marker}
              className={index === active ? 'active' : ''}
              onClick={() => goTo(index)}
              aria-label={`Open slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
