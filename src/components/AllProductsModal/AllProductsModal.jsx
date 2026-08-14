import { X } from 'lucide-react';
import ProductCard from '../ProductCard/ProductCard';
import { products, categories } from '../../data/products';
import './AllProductsModal.css';

export default function AllProductsModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="all-products-backdrop" onClick={onClose}>
      <div className="all-products-modal" onClick={(e) => e.stopPropagation()}>
        <button className="all-products-modal__close" onClick={onClose} aria-label="ปิด">
          <X size={22} />
        </button>

        <div className="all-products-modal__header">
          <h2>เมนูทั้งหมด</h2>
          <p>{products.length} รายการ</p>
        </div>

        <div className="all-products-modal__body">
          {categories.map((cat) => {
            const items = products.filter((p) => p.category === cat.id);
            if (items.length === 0) return null;
            return (
              <div className="all-products-modal__group" key={cat.id}>
                <h3>
                  <span>{cat.emoji}</span> {cat.label}
                </h3>
                <div className="all-products-modal__grid">
                  {items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
