import { useEffect } from 'react';
import { X, Package, ChefHat, Bike, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useCart, ORDER_STEPS } from '../../context/CartContext';
import './OrderStatusModal.css';

const stepIcons = [Package, ChefHat, Bike, CheckCircle2];

export default function OrderStatusModal() {
  const {
    isStatusOpen,
    closeOrderStatus,
    selectedOrder,
    advanceOrderStep,
    orders,
    viewOrderHistory,
  } = useCart();

  useEffect(() => {
    if (!isStatusOpen || !selectedOrder) return;
    if (selectedOrder.step >= ORDER_STEPS.length - 1) return;
    const timer = setTimeout(() => {
      advanceOrderStep(selectedOrder.orderNumber);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isStatusOpen, selectedOrder, advanceOrderStep]);

  if (!isStatusOpen || !selectedOrder) return null;

  const orderStep = selectedOrder.step;
  const isDone = orderStep >= ORDER_STEPS.length - 1;

  const backToHistory = () => {
    closeOrderStatus();
    viewOrderHistory();
  };

  return (
    <div className="status-backdrop" onClick={closeOrderStatus}>
      <div className="status-modal" onClick={(e) => e.stopPropagation()}>
        {orders.length > 1 && (
          <button className="status-modal__back" onClick={backToHistory} aria-label="กลับไปดูออเดอร์ทั้งหมด">
            <ArrowLeft size={18} /> ออเดอร์ทั้งหมด
          </button>
        )}
        <button className="status-modal__close" onClick={closeOrderStatus} aria-label="ปิด">
          <X size={20} />
        </button>

        <div className="status-modal__header">
          <h2>สถานะออเดอร์</h2>
          <p>{selectedOrder.orderNumber}</p>
        </div>

        <div className="status-modal__steps">
          {ORDER_STEPS.map((label, i) => {
            const Icon = stepIcons[i];
            const isActive = i <= orderStep;
            const isCurrent = i === orderStep;
            return (
              <div className="status-step" key={label}>
                <div className="status-step__line-wrap">
                  <div className={`status-step__icon ${isActive ? 'status-step__icon--active' : ''} ${isCurrent && !isDone ? 'status-step__icon--pulse' : ''}`}>
                    <Icon size={18} />
                  </div>
                  {i < ORDER_STEPS.length - 1 && (
                    <div className={`status-step__line ${i < orderStep ? 'status-step__line--active' : ''}`} />
                  )}
                </div>
                <div className="status-step__text">
                  <p className={isActive ? 'status-step__label status-step__label--active' : 'status-step__label'}>
                    {label}
                  </p>
                  {isCurrent && !isDone && <span className="status-step__now">กำลังดำเนินการ...</span>}
                  {isCurrent && isDone && <span className="status-step__now status-step__now--done">เสร็จสมบูรณ์</span>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="status-modal__footer">
          {isDone
            ? 'ออเดอร์ของคุณถึงมือเรียบร้อยแล้ว ขอบคุณที่ใช้บริการ SweetHour!'
            : 'ใกล้เสร็จแล้ว กรุณารอสักครู่นะครับ/คะ'}
        </div>
      </div>
    </div>
  );
}
