'use client';
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load cart items from localStorage on mount
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Save to localStorage whenever cart changes
    if (isInitialized) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  const addToCart = (product) => {
    const existing = cartItems.find(item => item._id === product._id);
    setCartItems(prev => {
      if (existing) {
        return prev.map(item =>
          item._id === product._id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(existing ? 'Item quantity updated in cart!' : 'Item added to cart!');
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => 
      prev.map(item =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    toast.success('Cart quantity updated');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item._id === productId);
  };

  // Don't render children until initialization is complete
  if (!isInitialized) {
    return null;
  }

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      setCartItems,
      isInCart,
      addToCart, 
      removeFromCart, 
      updateQuantity,
      getCartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);