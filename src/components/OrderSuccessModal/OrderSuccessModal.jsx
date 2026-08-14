import { CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './OrderSuccessModal.css';

export default function OrderSuccessModal() {
  const { isSuccessOpen, closeSuccess, openOrderStatus, lastOrder } = useCart();

  if (!isSuccessOpen || !lastOrder) return null;

  return (
    <div className="success-backdrop" onClick={closeSuccess}>
      <div className="success-modal" onClick={(e) => e.stopPropagation()}>
        <div className="success-modal__icon">
          <CheckCircle2 size={56} />
        </div>
        <h2>สั่งซื้อสำเร็จ!</h2>
        <p className="success-modal__subtitle">ขอบคุณที่อุดหนุน SweetHour นะครับ/คะ 🧋</p>

        <div className="success-modal__order-box">
          <div className="success-modal__row">
            <span>เลขที่ออเดอร์</span>
            <span className="success-modal__order-number">{lastOrder.orderNumber}</span>
          </div>
          <div className="success-modal__row">
            <span>จำนวน</span>
            <span>{lastOrder.itemCount} ชิ้น</span>
          </div>
          <div className="success-modal__row">
            <span>ยอดชำระ</span>
            <span className="success-modal__total">฿{lastOrder.total}</span>
          </div>
        </div>

        <div className="success-modal__actions">
          <button className="success-modal__secondary" onClick={closeSuccess}>ปิด</button>
          <button className="success-modal__primary" onClick={openOrderStatus}>ดูสถานะออเดอร์</button>
        </div>
      </div>
    </div>
  );
}
