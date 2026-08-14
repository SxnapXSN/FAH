import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import ProductCard from '../ProductCard/ProductCard';
import './RecommendedMenu.css';

export default function RecommendedMenu({ products, onViewAll }) {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, startScroll: 0, dragging: false, moved: false });

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 230, behavior: 'smooth' });
  };

  const DRAG_START_THRESHOLD = 6; // px of movement before it counts as a drag, not a click

  const handlePointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    dragState.current = {
      startX: e.clientX,
      startScroll: el.scrollLeft,
      dragging: true,
      moved: false,
      pointerId: e.pointerId,
    };
    // Note: we deliberately do NOT set isDragging / capture the pointer yet —
    // only once real movement happens, so a plain click still works normally.
  };

  const handlePointerMove = (e) => {
    const el = trackRef.current;
    const state = dragState.current;
    if (!state.dragging || !el) return;
    const delta = e.clientX - state.startX;

    if (!state.moved) {
      if (Math.abs(delta) < DRAG_START_THRESHOLD) return;
      state.moved = true;
      setIsDragging(true);
      el.setPointerCapture?.(state.pointerId);
    }

    el.scrollLeft = state.startScroll - delta;
  };

  const endDrag = () => {
    dragState.current.dragging = false;
    setIsDragging(false);
  };

  const handleCardClickCapture = (e) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section id="menu" className="recommended container section-gap">
      <div className="recommended__header">
        <h2>
          เมนูแนะนำ <Heart size={20} />
        </h2>
        <button className="recommended__view-all" onClick={onViewAll}>ดูทั้งหมด &gt;</button>
      </div>

      <div className="recommended__carousel">
        <button className="recommended__arrow" onClick={() => scroll(-1)} aria-label="เลื่อนซ้าย">
          <ChevronLeft size={20} />
        </button>

        <div
          className={`recommended__track ${isDragging ? 'recommended__track--dragging' : ''}`}
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={handleCardClickCapture}
        >
          {products.length === 0 ? (
            <p className="recommended__empty">ไม่พบเมนูที่ค้นหา</p>
          ) : (
            products.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>

        <button className="recommended__arrow" onClick={() => scroll(1)} aria-label="เลื่อนขวา">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
