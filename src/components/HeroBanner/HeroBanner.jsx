import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Threads from '../Threads/Threads';
import './HeroBanner.css';

const slides = [
  {
    emoji: '🧋',
    title: 'อร่อยฟิน\nทุกโมเมนต์',
    subtitle: 'ชานมมุก & เบเกอรี่ ส่งถึงมือคุณ',
    price: 45,
    accent: '#c4913a',
    glow: 'rgba(196, 145, 58, 0.38)',
  },
  {
    emoji: '🍰',
    title: 'เบเกอรี่สด\nอบใหม่ทุกวัน',
    subtitle: 'หอมเนย นุ่มละมุน ทุกคำ',
    price: 65,
    accent: '#d96b82',
    glow: 'rgba(217, 107, 130, 0.34)',
  },
  {
    emoji: '☕',
    title: 'กาแฟเข้มข้น\nปลุกวันใหม่',
    subtitle: 'คั่วสดใหม่ พร้อมเสิร์ฟทุกเช้า',
    price: 55,
    accent: '#8dbf9f',
    glow: 'rgba(141, 191, 159, 0.42)',
  },
  {
    emoji: '🎁',
    title: 'เซ็ทสุดคุ้ม\nคุ้มกว่าที่คิด',
    subtitle: 'จับคู่ชานม & เบเกอรี่ ในราคาพิเศษ',
    price: 79,
    accent: '#9a7bce',
    glow: 'rgba(154, 123, 206, 0.32)',
  },
];

const SLIDE_INTERVAL = 5000;
const DRAG_LIMIT = 90; // px — max visual drag distance
const DRAG_THRESHOLD = 45; // px — distance needed to trigger a slide change

const hexToRgb = (hex) => hex.match(/\w\w/g).map((value) => parseInt(value, 16) / 255);

export default function HeroBanner() {
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef(null);
  const viewportRef = useRef(null);
  const dragState = useRef({ startX: 0, dragging: false });

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      startTimer();
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [startTimer, isAutoPlaying]);

  // Any manual interaction (arrow, dot, or drag) stops the auto slide.
  const stopAutoPlay = () => setIsAutoPlaying(false);

  const goTo = (index) => {
    stopAutoPlay();
    setActive(index);
  };

  const goNext = () => {
    stopAutoPlay();
    setActive((current) => (current + 1) % slides.length);
  };
  const goPrev = () => {
    stopAutoPlay();
    setActive((current) => (current - 1 + slides.length) % slides.length);
  };

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePointerDown = (e) => {
    if (e.target.closest('button, a')) return;
    stopAutoPlay();
    dragState.current.startX = e.clientX;
    dragState.current.dragging = true;
    setIsDragging(true);
    viewportRef.current?.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragState.current.dragging) return;
    const delta = e.clientX - dragState.current.startX;
    const clamped = Math.max(-DRAG_LIMIT, Math.min(DRAG_LIMIT, delta));
    setDragOffset(clamped);
  };

  const endDrag = () => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    setIsDragging(false);
    if (dragOffset <= -DRAG_THRESHOLD) {
      goNext();
    } else if (dragOffset >= DRAG_THRESHOLD) {
      goPrev();
    }
    setDragOffset(0);
  };

  const trackStyle = {
    transform: `translateX(calc(-${active * 100}% + ${dragOffset}px))`,
    transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
  };

  return (
    <section id="home" className="hero">
      <Threads className="hero__threads" color={hexToRgb(slides[active].accent)} amplitude={0.78} distance={0.88} />
      <div
        className="hero__viewport"
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        <button className="hero__arrow hero__arrow--left" onPointerDown={(e) => e.stopPropagation()} onClick={goPrev} aria-label="ก่อนหน้า">
          <ChevronLeft size={26} />
        </button>

        <div className="hero__track" style={trackStyle}>
          {slides.map((slide, i) => (
            <div
              className={`hero__slide ${i === active ? 'hero__slide--active' : ''}`}
              key={i}
              style={{ '--slide-accent': slide.accent, '--slide-glow': slide.glow }}
              aria-hidden={i !== active}
            >
              <div className="container hero__inner">
                <div className="hero__image">
                  <div className="hero__image-circle">
                    <span className="hero__sparkle hero__sparkle--one" aria-hidden="true" />
                    <span className="hero__sparkle hero__sparkle--two" aria-hidden="true" />
                    <span className="hero__sparkle hero__sparkle--three" aria-hidden="true" />
                    <span className="hero__emoji" aria-hidden="true">{slide.emoji}</span>
                    <span className="hero__price-tag">เริ่มต้น ฿{slide.price}</span>
                  </div>
                </div>
                <div className="hero__content">
                  <h1 className="hero__title">
                    {slide.title.split('\n').map((line, j) => (
                      <span key={j}>{line}<br /></span>
                    ))}
                  </h1>
                  <p className="hero__subtitle">{slide.subtitle}</p>
                  <button className="hero__cta" onClick={scrollToMenu}>สั่งเลย!</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="hero__arrow hero__arrow--right" onPointerDown={(e) => e.stopPropagation()} onClick={goNext} aria-label="ถัดไป">
          <ChevronRight size={26} />
        </button>
      </div>

      <div className="hero__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === active ? 'hero__dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`สไลด์ ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
