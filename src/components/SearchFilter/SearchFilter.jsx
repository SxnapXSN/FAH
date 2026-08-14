import { useMemo, useRef, useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { categories, products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './SearchFilter.css';

export default function SearchFilter({ query, setQuery, activeCategory, setActiveCategory }) {
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);
  const { setActiveProduct } = useCart();

  const handleCategoryClick = (id) => {
    setActiveCategory((prev) => (prev === id ? null : id));
  };

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  const showDropdown = isFocused && query.trim().length > 0;

  const handlePick = (product) => {
    setActiveProduct(product);
  };

  return (
    <section className="search-filter container">
      <div
        className={`search-filter__input ${isFocused ? 'search-filter__input--focused' : ''}`}
        ref={wrapperRef}
      >
        <input
          type="text"
          placeholder="ค้นหาเมนูที่คุณชอบ..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 120)}
        />
        <Search size={18} className="search-filter__icon" />

        {showDropdown && (
          <div className="search-filter__dropdown">
            {matches.length === 0 ? (
              <p className="search-filter__empty">ไม่พบเมนูที่ค้นหา</p>
            ) : (
              <ul className="search-filter__list">
                {matches.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      className="search-filter__result"
                      onClick={() => handlePick(p)}
                    >
                      <span className="search-filter__result-emoji">{p.emoji}</span>
                      <span className="search-filter__result-info">
                        <span className="search-filter__result-name">{p.name}</span>
                        <span className="search-filter__result-price">฿{p.price}</span>
                      </span>
                      <span className="search-filter__result-add" aria-label="เพิ่มลงตะกร้า">
                        <Plus size={16} />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="search-filter__categories">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-pill ${activeCategory === cat.id ? 'category-pill--active' : ''}`}
            onClick={() => handleCategoryClick(cat.id)}
          >
            <span className="category-pill__icon">{cat.emoji}</span>
            <span className="category-pill__label">{cat.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
