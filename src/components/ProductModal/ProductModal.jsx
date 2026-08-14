import { useState, useEffect } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { sizes, sweetness, toppingGroups, drinkStyles, beverageCategories } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './ProductModal.css';

export default function ProductModal() {
  const {
    activeProduct,
    setActiveProduct,
    addToCart,
    editingItem,
    setEditingItem,
    updateCartItem,
  } = useCart();
  const isEditing = !activeProduct && !!editingItem;
  const product = activeProduct || editingItem;
  const isBeverage = product ? beverageCategories.includes(product.category) : true;

  const [size, setSize] = useState(sizes[1]);
  const [sweet, setSweet] = useState(sweetness[1]);
  const [style, setStyle] = useState(drinkStyles[0]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (activeProduct) {
      setSize(sizes[1]);
      setSweet(sweetness[1]);
      setStyle(drinkStyles[0]);
      setSelectedToppings([]);
      setQty(1);
      setNote('');
    } else if (editingItem) {
      setSize(editingItem.options?.size || sizes[1]);
      setSweet(editingItem.options?.sweet || sweetness[1]);
      setStyle(editingItem.options?.style || drinkStyles[0]);
      setSelectedToppings(editingItem.options?.toppings || []);
      setQty(editingItem.quantity || 1);
      setNote(editingItem.note || '');
    }
  }, [activeProduct, editingItem]);

  if (!product) return null;

  const toggleTopping = (t) => {
    setSelectedToppings((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const close = () => {
    setActiveProduct(null);
    setEditingItem(null);
  };

  const handleAdd = () => {
    const options = isBeverage
      ? { size, sweet, style, toppings: selectedToppings }
      : { size, toppings: selectedToppings };
    if (isEditing) {
      updateCartItem(editingItem.cartId, { options, quantity: qty, note });
    } else {
      addToCart(activeProduct, options, qty, note);
    }
    close();
  };

  const total = product.price * qty;

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={close} aria-label="ปิด">
          <X size={20} />
        </button>

        <div className="modal__image">
          <span>{product.emoji}</span>
        </div>

        <div className="modal__body">
          <div className="modal__title-row">
            <h3>{product.name}</h3>
            <span className="modal__price">฿{product.price}</span>
          </div>

          <div className="modal__option">
            <p className="modal__option-label">ขนาด</p>
            <div className="modal__chips">
              {sizes.map((s) => (
                <button
                  key={s}
                  className={`chip ${size === s ? 'chip--active' : ''}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {isBeverage && (
            <>
              <div className="modal__option">
                <p className="modal__option-label">รูปแบบเครื่องดื่ม</p>
                <div className="modal__chips">
                  {drinkStyles.map((s) => (
                    <button
                      key={s}
                      className={`chip ${style === s ? 'chip--active' : ''}`}
                      onClick={() => setStyle(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="modal__option">
                <p className="modal__option-label">ความหวาน</p>
                <div className="modal__chips">
                  {sweetness.map((s) => (
                    <button
                      key={s}
                      className={`chip ${sweet === s ? 'chip--active' : ''}`}
                      onClick={() => setSweet(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {toppingGroups.map((g) => (
            <div className="modal__option" key={g.group}>
              <p className="modal__option-label">{g.group}</p>
              <div className="modal__chips">
                {g.items.map((t) => (
                  <button
                    key={t}
                    className={`chip ${selectedToppings.includes(t) ? 'chip--active' : ''}`}
                    onClick={() => toggleTopping(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="modal__option">
            <p className="modal__option-label">จำนวน</p>
            <div className="modal__stepper">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus size={16} /></button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}><Plus size={16} /></button>
            </div>
          </div>

          <div className="modal__option">
            <p className="modal__option-label">โน้ตถึงร้าน (ถ้ามี)</p>
            <textarea
              className="modal__note"
              placeholder="เช่น ไม่ใส่น้ำแข็ง, แยกน้ำแข็ง..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
            />
          </div>

          <button className="modal__submit" onClick={handleAdd}>
            {isEditing ? `บันทึกการแก้ไข — ฿${total}` : `เพิ่มลงตะกร้า — ฿${total}`}
          </button>
        </div>
      </div>
    </div>
  );
}
