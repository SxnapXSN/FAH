import { X, Heart } from 'lucide-react';
import ProductCard from '../ProductCard/ProductCard';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import './FavoritesModal.css';

export default function FavoritesModal() {
  const { isFavoritesOpen, setFavoritesOpen, favorites } = useCart();

  if (!isFavoritesOpen) return null;

  const favoriteProducts = products.filter((p) => favorites.has(p.id));
  const close = () => setFavoritesOpen(false);

  return (
    <div className="favorites-backdrop" onClick={close}>
      <div className="favorites-modal" onClick={(e) => e.stopPropagation()}>
        <button className="favorites-modal__close" onClick={close} aria-label="ปิด">
          <X size={22} />
        </button>

        <div className="favorites-modal__header">
          <h2>
            เมนูที่ถูกใจ <Heart size={18} fill="currentColor" />
          </h2>
          <p>{favoriteProducts.length} รายการ</p>
        </div>

        <div className="favorites-modal__body">
          {favoriteProducts.length === 0 ? (
            <p className="favorites-modal__empty">
              ยังไม่มีเมนูที่กดถูกใจ ลองกดรูปหัวใจบนเมนูที่คุณชอบดูสิ!
            </p>
          ) : (
            <div className="favorites-modal__grid">
              {favoriteProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
