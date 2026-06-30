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
    eyebrow: '[ AI 先行者 ]',
    title: (
      <>
        让 AI<br />
        融合<br />
        <span className="thin">你的</span><br />
        <span className="indent">// 商业</span><br />
        <span className="indent deep">远见</span>
      </>
    ),
    copy: 'NUWA AI UI 为 ReyMao 打造：把管理经验、系统化方法和 AI 产品表达，转化为高端、克制、可信的数字界面。',
    action: '开始探索',
    visual: 'threads',
  },
  {
    marker: 'B',
    eyebrow: '[ 系统化增长 ]',
    title: (
      <>
        从经验<br />
        到<span className="thin">系统</span><br />
        再到规模化
      </>
    ),
    copy: '面向企业管理、供应链、跨文化协同和复杂项目交付，用 AI 重新组织知识、流程和决策效率。',
    action: '查看能力',
    visual: 'iris',
  },
  {
    marker: 'C',
    eyebrow: '[ 未来界面 ]',
    title: (
      <>
        高级感<br />
        不是装饰<br />
        是秩序
      </>
    ),
    copy: '大留白、低饱和、精准动效、清晰层级，让访问者第一眼感受到专业、稳定、前沿。',
    action: '体验设计',
    visual: 'sphere',
  },
  {
    marker: 'D',
    eyebrow: '[ ReyMao × AI ]',
    title: (
      <>
        // AI<br />
        先行者<br />
        REYMAO
      </>
    ),
    copy: '某头部德企多年管理经验，十亿级项目视角，结合 AI 工具链，构建下一代个人品牌与商业展示系统。',
    action: '联系合作',
    visual: 'grid',
  },
]

function Particles() {
  const particles = useMemo(
    () => Array.from({ length: 30 }, (_, index) => ({
      id: index,
      left: `${5 + ((index * 41) % 90)}%`,
      top: `${7 + ((index * 57) % 82)}%`,
      size: 2 + (index % 5),
      delay: `${(index % 11) * 0.28}s`,
      duration: `${5 + (index % 8)}s`,
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
          {Array.from({ length: 36 }, (_, i) => <i key={i} style={{ rotate: `${i * 10}deg` }} />)}
          <b />
        </>
      )}
      {type === 'sphere' && (
        <>
          <i /><i /><i /><i /><i /><i />
          <b />
        </>
      )}
      {type === 'grid' && (
        <>
          {Array.from({ length: 30 }, (_, i) => <i key={i} />)}
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
            <a href="#">首页 ↗</a>
            <a href="#">能力 ↗</a>
            <a href="#">案例 ↗</a>
            <a href="mailto:rey.mao@mmu.top">联系 ReyMao ↗</a>
          </div>
        </nav>

        <div className="signature">
          <span>REYMAO</span>
          <small>AI pioneer · Systems thinker · Cross-cultural operator</small>
        </div>

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

        <div className="contact-strip">
          <a href="mailto:rey.mao@mmu.top">rey.mao@mmu.top</a>
          <span>+86 177 1707 0994</span>
        </div>

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
