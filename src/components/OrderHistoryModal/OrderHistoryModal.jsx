import { X, ChevronRight, Package, ChefHat, Bike, CheckCircle2 } from 'lucide-react';
import { useCart, ORDER_STEPS } from '../../context/CartContext';
import './OrderHistoryModal.css';

const stepIcons = [Package, ChefHat, Bike, CheckCircle2];

const formatDate = (date) =>
  new Date(date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }) +
  ' ' +
  new Date(date).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

export default function OrderHistoryModal() {
  const { isHistoryOpen, closeOrderHistory, orders, selectOrderFromHistory } = useCart();

  if (!isHistoryOpen) return null;

  return (
    <div className="history-backdrop" onClick={closeOrderHistory}>
      <div className="history-modal" onClick={(e) => e.stopPropagation()}>
        <button className="history-modal__close" onClick={closeOrderHistory} aria-label="ปิด">
          <X size={20} />
        </button>

        <div className="history-modal__header">
          <h2>คำสั่งซื้อของฉัน</h2>
          <p>{orders.length} ออเดอร์</p>
        </div>

        <div className="history-modal__list">
          {orders.map((order) => {
            const StepIcon = stepIcons[order.step];
            const isDone = order.step >= ORDER_STEPS.length - 1;
            return (
              <button
                key={order.orderNumber}
                className="history-item"
                onClick={() => selectOrderFromHistory(order.orderNumber)}
              >
                <div className={`history-item__icon ${isDone ? 'history-item__icon--done' : ''}`}>
                  <StepIcon size={18} />
                </div>
                <div className="history-item__info">
                  <p className="history-item__number">{order.orderNumber}</p>
                  <p className="history-item__meta">
                    {formatDate(order.date)} · {order.itemCount} ชิ้น · ฿{order.total}
                  </p>
                  <p className={`history-item__status ${isDone ? 'history-item__status--done' : ''}`}>
                    {ORDER_STEPS[order.step]}
                  </p>
                </div>
                <ChevronRight size={18} className="history-item__chevron" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
