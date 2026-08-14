import { createContext, useContext, useState, useMemo, useCallback } from 'react';

const CartContext = createContext(null);

let uid = 1;
let orderSeq = 1024;

const DISCOUNT_RATE = 0.15;

export const ORDER_STEPS = [
  'รับออเดอร์แล้ว',
  'กำลังเตรียมเมนู',
  'กำลังจัดส่ง',
  'จัดส่งสำเร็จ',
];

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [isCartOpen, setCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [isFavoritesOpen, setFavoritesOpen] = useState(false);
  const [orders, setOrders] = useState([]); // every past order, newest first
  const [lastOrder, setLastOrder] = useState(null);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [isHistoryOpen, setHistoryOpen] = useState(false);
  const [isStatusOpen, setStatusOpen] = useState(false);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(null);

  const addToCart = useCallback((product, options, quantity, note = '') => {
    setItems((prev) => [
      ...prev,
      {
        cartId: uid++,
        productId: product.id,
        name: product.name,
        emoji: product.emoji,
        price: product.price,
        category: product.category,
        options,
        quantity,
        note,
      },
    ]);
    setCartOpen(true);
  }, []);

  const updateCartItem = useCallback((cartId, updates) => {
    setItems((prev) =>
      prev.map((it) => (it.cartId === cartId ? { ...it, ...updates } : it))
    );
  }, []);

  const updateQuantity = useCallback((cartId, delta) => {
    setItems((prev) =>
      prev
        .map((it) =>
          it.cartId === cartId ? { ...it, quantity: it.quantity + delta } : it
        )
        .filter((it) => it.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((cartId) => {
    setItems((prev) => prev.filter((it) => it.cartId !== cartId));
  }, []);

  const toggleFavorite = useCallback((productId) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);

  const totalCount = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity * it.price, 0),
    [items]
  );

  const discountAmount = useMemo(
    () => Math.round(totalPrice * DISCOUNT_RATE),
    [totalPrice]
  );

  const finalTotal = useMemo(
    () => totalPrice - discountAmount,
    [totalPrice, discountAmount]
  );

  const checkout = useCallback(() => {
    if (items.length === 0) return;
    const now = new Date();
    const order = {
      orderNumber: `SH-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${orderSeq++}`,
      date: now,
      items: items.map((it) => ({ ...it })),
      itemCount: items.reduce((sum, it) => sum + it.quantity, 0),
      subtotal: totalPrice,
      discount: discountAmount,
      total: finalTotal,
      step: 0,
    };
    setOrders((prev) => [order, ...prev]);
    setLastOrder(order);
    setItems([]);
    setCartOpen(false);
    setSuccessOpen(true);
  }, [items, totalPrice, discountAmount, finalTotal]);

  // Open the status view for the order that was just placed.
  const openOrderStatus = useCallback(() => {
    if (!lastOrder) return;
    setSuccessOpen(false);
    setSelectedOrderNumber(lastOrder.orderNumber);
    setStatusOpen(true);
  }, [lastOrder]);

  // Open a picker of every past order (for when there's more than one to check on).
  const viewOrderHistory = useCallback(() => {
    if (orders.length === 0) return;
    setHistoryOpen(true);
  }, [orders]);

  const closeOrderHistory = useCallback(() => {
    setHistoryOpen(false);
  }, []);

  const selectOrderFromHistory = useCallback((orderNumber) => {
    setSelectedOrderNumber(orderNumber);
    setHistoryOpen(false);
    setStatusOpen(true);
  }, []);

  const closeOrderStatus = useCallback(() => {
    setStatusOpen(false);
  }, []);

  const closeSuccess = useCallback(() => {
    setSuccessOpen(false);
  }, []);

  // Header shortcut: one order -> jump straight to it, several -> show the picker.
  const viewLastOrderStatus = useCallback(() => {
    if (orders.length === 0) return;
    if (orders.length === 1) {
      setSelectedOrderNumber(orders[0].orderNumber);
      setStatusOpen(true);
    } else {
      setHistoryOpen(true);
    }
  }, [orders]);

  const advanceOrderStep = useCallback((orderNumber) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.orderNumber === orderNumber
          ? { ...o, step: Math.min(o.step + 1, ORDER_STEPS.length - 1) }
          : o
      )
    );
  }, []);

  const selectedOrder = useMemo(
    () => orders.find((o) => o.orderNumber === selectedOrderNumber) || null,
    [orders, selectedOrderNumber]
  );

  const value = {
    items,
    addToCart,
    updateCartItem,
    updateQuantity,
    removeItem,
    favorites,
    toggleFavorite,
    isFavoritesOpen,
    setFavoritesOpen,
    totalCount,
    totalPrice,
    discountAmount,
    finalTotal,
    isCartOpen,
    setCartOpen,
    activeProduct,
    setActiveProduct,
    editingItem,
    setEditingItem,
    checkout,
    orders,
    lastOrder,
    isSuccessOpen,
    closeSuccess,
    openOrderStatus,
    viewLastOrderStatus,
    isHistoryOpen,
    viewOrderHistory,
    closeOrderHistory,
    selectOrderFromHistory,
    isStatusOpen,
    closeOrderStatus,
    selectedOrder,
    advanceOrderStep,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
