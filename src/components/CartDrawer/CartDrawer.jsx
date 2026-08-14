import { X, Minus, Plus, Trash2, Receipt, Pencil } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

const formatDate = (date) =>
  date.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' }) +
  ' ' +
  date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeItem,
    setEditingItem,
    totalPrice,
    totalCount,
    discountAmount,
    finalTotal,
    checkout,
  } = useCart();

  if (!isCartOpen) return null;

  const previewDate = formatDate(new Date());

  return (
    <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer__header">
          <h3>ตะกร้าสินค้า ({totalCount})</h3>
          <button onClick={() => setCartOpen(false)} aria-label="ปิด">
            <X size={20} />
          </button>
        </div>

        <div className="drawer__items">
          {items.length === 0 ? (
            <p className="drawer__empty">ยังไม่มีสินค้าในตะกร้า</p>
          ) : (
            items.map((it) => (
              <div className="drawer-item" key={it.cartId}>
                <div className="drawer-item__image">{it.emoji}</div>
                <div className="drawer-item__info">
                  <p className="drawer-item__name">{it.name}</p>
                  {it.options && (
                    <p className="drawer-item__options">
                      {it.options.size}
                      {it.options.style ? ` · ${it.options.style}` : ''}
                      {it.options.sweet ? ` · ${it.options.sweet}` : ''}
                      {it.options.toppings?.length ? ` · ${it.options.toppings.join(', ')}` : ''}
                    </p>
                  )}
                  {it.note && <p className="drawer-item__note">โน้ต: {it.note}</p>}
                  <div className="drawer-item__row">
                    <span className="drawer-item__price">฿{it.price * it.quantity}</span>
                    <div className="drawer-item__stepper">
                      <button onClick={() => updateQuantity(it.cartId, -1)}><Minus size={14} /></button>
                      <span>{it.quantity}</span>
                      <button onClick={() => updateQuantity(it.cartId, 1)}><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
                <div className="drawer-item__actions">
                  <button className="drawer-item__edit" onClick={() => setEditingItem(it)} aria-label="แก้ไข">
                    <Pencil size={15} />
                  </button>
                  <button className="drawer-item__remove" onClick={() => removeItem(it.cartId)} aria-label="ลบ">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer__footer">
            <div className="drawer__summary">
              <div className="drawer__summary-title">
                <Receipt size={16} />
                <span>สรุปคำสั่งซื้อ</span>
              </div>
              <div className="drawer__summary-row">
                <span>จำนวนรายการ</span>
                <span>{totalCount} ชิ้น</span>
              </div>
              <div className="drawer__summary-row">
                <span>ราคารวม</span>
                <span>฿{totalPrice}</span>
              </div>
              <div className="drawer__summary-row drawer__summary-row--discount">
                <span>ส่วนลด 15%</span>
                <span>-฿{discountAmount}</span>
              </div>
              <div className="drawer__summary-row">
                <span>วันที่สั่งซื้อ</span>
                <span>{previewDate}</span>
              </div>
              <div className="drawer__summary-divider" />
              <div className="drawer__summary-row drawer__summary-row--total">
                <span>ยอดชำระ</span>
                <span>฿{finalTotal}</span>
              </div>
            </div>

            <button className="drawer__checkout" onClick={checkout}>สั่งซื้อเลย</button>
          </div>
        )}
      </div>
    </div>
  );
}
