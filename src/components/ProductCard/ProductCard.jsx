import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { favorites, toggleFavorite, setActiveProduct } = useCart();
  const isFavorite = favorites.has(product.id);
  const [isPopping, setIsPopping] = useState(false);

  const handleHeartClick = () => {
    const willBeFavorite = !isFavorite;
    toggleFavorite(product.id);
    if (willBeFavorite) {
      setIsPopping(true);
      setTimeout(() => setIsPopping(false), 500);
    }
  };

  return (
    <div className="product-card">
      <div className="product-card__image">
        <span>{product.emoji}</span>
        <button
          className={`product-card__heart ${isFavorite ? 'product-card__heart--active' : ''} ${isPopping ? 'product-card__heart--pop' : ''}`}
          onClick={handleHeartClick}
          aria-label="ถูกใจ"
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
          {isPopping && (
            <span className="product-card__heart-burst" aria-hidden="true">
              <span /><span /><span /><span /><span /><span />
            </span>
          )}
        </button>
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__detail">{product.detail}</p>
        <p className="product-card__price">฿{product.price}</p>
        <button className="product-card__btn" onClick={() => setActiveProduct(product)}>
          เลือกเมนู
        </button>
      </div>
    </div>
  );
}
