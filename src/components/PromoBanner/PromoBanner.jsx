import { Gift } from 'lucide-react';
import './PromoBanner.css';

export default function PromoBanner() {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="promo" className="promo container section-gap">
      <div className="promo__box">
        <div className="promo__info">
          <Gift size={26} />
          <div>
            <p className="promo__title">โปรโมชั่นพิเศษ! ลด 15% สำหรับเมนูยอดนิยม</p>
            <p className="promo__date">วันนี้ – 31 พฤษภาคม 2568</p>
          </div>
        </div>
        <button className="promo__cta" onClick={scrollToMenu}>คลิกเลย</button>
      </div>
    </section>
  );
}
