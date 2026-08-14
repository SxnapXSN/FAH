import { useMemo, useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import HeroBanner from './components/HeroBanner/HeroBanner';
import SearchFilter from './components/SearchFilter/SearchFilter';
import RecommendedMenu from './components/RecommendedMenu/RecommendedMenu';
import PromoBanner from './components/PromoBanner/PromoBanner';
import Footer from './components/Footer/Footer';
import ProductModal from './components/ProductModal/ProductModal';
import CartDrawer from './components/CartDrawer/CartDrawer';
import AllProductsModal from './components/AllProductsModal/AllProductsModal';
import FavoritesModal from './components/FavoritesModal/FavoritesModal';
import OrderSuccessModal from './components/OrderSuccessModal/OrderSuccessModal';
import OrderStatusModal from './components/OrderStatusModal/OrderStatusModal';
import OrderHistoryModal from './components/OrderHistoryModal/OrderHistoryModal';
import { products } from './data/products';
import './App.css';

function AppContent() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [isAllProductsOpen, setAllProductsOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.trim().toLowerCase());
      const matchesCategory = !activeCategory || p.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <div className="app">
      <Header query={query} setQuery={setQuery} />
      <main>
        <HeroBanner />
        <SearchFilter
          query={query}
          setQuery={setQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <RecommendedMenu products={filteredProducts} onViewAll={() => setAllProductsOpen(true)} />
        <PromoBanner />
      </main>
      <Footer />
      <ProductModal />
      <CartDrawer />
      <AllProductsModal open={isAllProductsOpen} onClose={() => setAllProductsOpen(false)} />
      <FavoritesModal />
      <OrderSuccessModal />
      <OrderStatusModal />
      <OrderHistoryModal />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
