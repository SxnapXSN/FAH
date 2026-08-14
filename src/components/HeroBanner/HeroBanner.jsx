import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroBanner.css';

const slides = [
  {
    emoji: '🧋',
    title: 'อร่อยฟิน\nทุกโมเมนต์',
    subtitle: 'ชานมมุก & เบเกอรี่ ส่งถึงมือคุณ',
    price: 45,
  },
  {
    emoji: '🍰',
    title: 'เบเกอรี่สด\nอบใหม่ทุกวัน',
    subtitle: 'หอมเนย นุ่มละมุน ทุกคำ',
    price: 65,
  },
  {
    emoji: '☕',
    title: 'กาแฟเข้มข้น\nปลุกวันใหม่',
    subtitle: 'คั่วสดใหม่ พร้อมเสิร์ฟทุกเช้า',
    price: 55,
  },
  {
    emoji: '🎁',
    title: 'เซ็ทสุดคุ้ม\nคุ้มกว่าที่คิด',
    subtitle: 'จับคู่ชานม & เบเกอรี่ ในราคาพิเศษ',
    price: 79,
  },
];

const SLIDE_INTERVAL = 5000;
const DRAG_LIMIT = 90; // px — max visual drag distance
const DRAG_THRESHOLD = 45; // px — distance needed to trigger a slide change

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

  const goNext = () => goTo((active + 1) % slides.length);
  const goPrev = () => goTo((active - 1 + slides.length) % slides.length);

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePointerDown = (e) => {
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
      <div
        className="hero__viewport"
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        <button className="hero__arrow hero__arrow--left" onClick={goPrev} aria-label="ก่อนหน้า">
          <ChevronLeft size={26} />
        </button>

        <div className="hero__track" style={trackStyle}>
          {slides.map((slide, i) => (
            <div className="hero__slide" key={i}>
              <div className="container hero__inner">
                <div className="hero__image">
                  <div className="hero__image-circle">
                    <span>{slide.emoji}</span>
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

        <button className="hero__arrow hero__arrow--right" onClick={goNext} aria-label="ถัดไป">
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
