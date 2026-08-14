import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ShoppingCart, X, Heart, PackageSearch } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import './Header.css';

const navLinks = [
  { id: 'home', label: 'หน้าแรก' },
  { id: 'menu', label: 'เมนู' },
  { id: 'promo', label: 'โปรโมชั่น' },
  { id: 'how-to', label: 'วิธีสั่งซื้อ' },
  { id: 'contact', label: 'ติดต่อเรา' },
];

export default function Header({ query, setQuery }) {
  const {
    totalCount,
    setCartOpen,
    setActiveProduct,
    favorites,
    setFavoritesOpen,
    orders,
    viewLastOrderStatus,
  } = useCart();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [query]);

  const suggestions = showAllResults ? matches : matches.slice(0, 6);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSearchOpen(false);
        setShowAllResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Typing a new query resets the "view all" expansion.
    setShowAllResults(false);
  }, [query]);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setShowAllResults(false);
  };

  const handleSelectSuggestion = (product) => {
    setQuery(product.name);
    setActiveProduct(product);
    setSearchOpen(false);
    setShowAllResults(false);
  };

  const handleSeeAll = () => {
    // Show every matching menu item inside the dropdown itself
    // (scrollable within the dropdown) instead of scrolling the page.
    setShowAllResults(true);
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <div className={`header__logo ${isSearchOpen ? 'header__logo--hidden' : ''}`} onClick={() => scrollTo('home')}>
          <span className="header__logo-icon">🧋</span>
          <div className="header__logo-text">
            <span className="header__logo-title">SweetHour</span>
            <span className="header__logo-sub">ชานม & เบเกอรี่</span>
          </div>
        </div>

        <nav className={`header__nav ${isSearchOpen ? 'header__nav--hidden' : ''}`}>
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => scrollTo(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>

        <div className="header__actions">
          <div
            className={`header__search ${isSearchOpen ? 'header__search--open' : ''}`}
            ref={wrapperRef}
          >
            <button
              className="header__icon-btn header__search-toggle"
              aria-label="ค้นหา"
              onClick={() => (isSearchOpen ? closeSearch() : openSearch())}
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            <div className="header__search-box">
              <Search size={16} className="header__search-icon" />
              <input
                ref={inputRef}
                type="text"
                placeholder="ค้นหาเมนูที่คุณชอบ..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
              />
            </div>

            {isSearchOpen && (
              <div className="header__search-dropdown">
                {suggestions.length === 0 ? (
                  <p className="header__search-empty">ไม่พบเมนูที่ค้นหา</p>
                ) : (
                  <>
                    <ul className="header__search-list">
                      {suggestions.map((p) => (
                        <li key={p.id}>
                          <button onClick={() => handleSelectSuggestion(p)}>
                            <span className="header__search-emoji">{p.emoji}</span>
                            <span className="header__search-name">{p.name}</span>
                            <span className="header__search-price">฿{p.price}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    {!showAllResults && matches.length > suggestions.length && (
                      <button className="header__search-viewall" onClick={handleSeeAll}>
                        ดูเมนูทั้งหมด ({matches.length}) &gt;
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <button
            className="header__icon-btn"
            aria-label="เมนูที่ถูกใจ"
            onClick={() => setFavoritesOpen(true)}
          >
            <Heart size={20} />
            {favorites.size > 0 && <span className="header__badge">{favorites.size}</span>}
          </button>

          <button
            className={`header__icon-btn ${orders.length === 0 ? 'header__icon-btn--disabled' : ''}`}
            aria-label="สถานะคำสั่งซื้อก่อนหน้า"
            onClick={viewLastOrderStatus}
            disabled={orders.length === 0}
            title={orders.length > 0 ? 'ดูสถานะออเดอร์ก่อนหน้า' : 'ยังไม่มีคำสั่งซื้อ'}
          >
            <PackageSearch size={20} />
            {orders.length > 0 && <span className="header__badge">{orders.length}</span>}
          </button>

          <button
            className="header__icon-btn header__cart-btn"
            aria-label="ตะกร้าสินค้า"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart size={20} />
            {totalCount > 0 && <span className="header__badge">{totalCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
