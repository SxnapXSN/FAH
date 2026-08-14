import { ThumbsUp, Camera, MessageCircle } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="contact" className="footer section-gap">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span>🧋</span>
            <div>
              <p className="footer__logo-title">SweetHour</p>
              <p className="footer__logo-sub">ชานม & เบเกอรี่</p>
            </div>
          </div>
        </div>

        <div className="footer__col">
          <h4>ข้อมูลร้านค้า</h4>
          <ul>
            <li><a href="#home">เกี่ยวกับเรา</a></li>
            <li><a href="#how-to">วิธีการสั่งซื้อ</a></li>
            <li><a href="#home">นโยบายการคืนเงิน</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>ช่วยเหลือ</h4>
          <ul>
            <li><a href="#home">คำถามที่พบบ่อย</a></li>
            <li><a href="#home">การจัดส่ง</a></li>
            <li><a href="#contact">ติดต่อเรา</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>ติดตามเรา</h4>
          <div className="footer__social">
            <a href="#" aria-label="Facebook"><ThumbsUp size={18} /></a>
            <a href="#" aria-label="Instagram"><Camera size={18} /></a>
            <a href="#" aria-label="LINE"><MessageCircle size={18} /></a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2025 SweetHour All rights reserved.</p>
      </div>
    </footer>
  );
}
