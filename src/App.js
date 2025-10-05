import React, { useState, useEffect, useMemo, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider, CartContext } from "./context/CartContext";

// Core Component Imports
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import ScrollToTop from "./components/ScrollToTop";
import CartSidebar from "./components/CartSidebar";
import ProtectedRoute from './components/ProtectedRoute';

// Page Imports
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import DealsPage from "./pages/DealsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

// Auth Page Imports
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// Checkout Flow Page Imports
import CartPage from "./pages/CartPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmOrderPage from "./pages/ConfirmOrderPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

// Informational Page Imports
import FaqPage from "./pages/FaqPage";
import ShippingInfoPage from "./pages/ShippingInfoPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import CareersPage from "./pages/CareersPage";
import InvestorsPage from "./pages/InvestorsPage";
import SustainabilityPage from "./pages/SustainabilityPage";
import PressPage from "./pages/PressPage";

// Data Import
import { footerLinks } from './data';

const API_URL = "https://dummyjson.com/products?limit=100";

// Define the main categories to feature on the home page
const MAIN_CATEGORIES = ['laptops', 'beauty', 'mens-shirts', 'home-decoration'];

// --- HELPER FUNCTIONS ---

function pickImage(p) {
  if (!p) return "https://via.placeholder.com/400x300?text=No+Image";
  let img = p.thumbnail || (p.images && p.images[0]) || p.image;
  if (!img || typeof img !== 'string' || !img.startsWith('http') || img.includes("undefined")) {
    img = "https://via.placeholder.com/400x300?text=No+Image";
  }
  return img;
}

function normalizeProduct(p) {
    if (!p || typeof p !== 'object' || !p.id) return null;
  
    const originalPrice = Number(p.price);
    const applyDiscount = (p.discountPercentage || 0) > 10 && Math.random() > 0.4; 

    const currentPrice = applyDiscount 
      ? originalPrice * (1 - p.discountPercentage / 100) 
      : originalPrice;

    return {
      id: String(p.id),
      name: p.title || `Product ${p.id}`,
      price: `$${currentPrice.toFixed(2)}`,
      originalPrice: applyDiscount ? `$${originalPrice.toFixed(2)}` : null,
      discount: applyDiscount ? `${Math.round(p.discountPercentage)}% OFF` : null,
      image: pickImage(p),
      images: p.images || [p.thumbnail].filter(Boolean),
      description: p.description || "",
      category: (p.category || "general").toString().toLowerCase(),
      brand: p.brand || "Unknown Brand",
      rating: p.rating || 0,
      stock: p.stock || 0,
    };
}


// --- ROUTING COMPONENT ---
const AppRoutes = ({ products, allCategories, mainCategories, flashDeals, dailyDeals, showNotification }) => {
  const { dispatch } = useContext(CartContext);

  const addToCart = (product, quantity = 1) => {
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    showNotification(`✅ Added to cart: ${product.name}`);
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage categories={mainCategories} products={products.slice(0, 8)} addToCart={addToCart} />} />
      <Route path="/products" element={<ProductsPage allProducts={products} categories={allCategories} addToCart={addToCart} />} />
      <Route path="/product/:productId" element={<ProductDetailPage allProducts={products} addToCart={addToCart} />} />
      <Route path="/deals" element={<DealsPage flashDeals={flashDeals} dailyDeals={dailyDeals} addToCart={addToCart} />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage setNotification={showNotification} />} />
      <Route path="/login" element={<LoginPage setNotification={showNotification} />} />
      <Route path="/signup" element={<SignupPage setNotification={showNotification} />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/shipping" element={<ShippingPage />} />
      <Route path="/payment" element={<ProtectedRoute step="payment"><PaymentPage setNotification={showNotification} /></ProtectedRoute>} />
      <Route path="/confirm-order" element={<ProtectedRoute step="confirm"><ConfirmOrderPage setNotification={showNotification} /></ProtectedRoute>} />
      <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/shipping-info" element={<ShippingInfoPage />} />
      <Route path="/track-order" element={<TrackOrderPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/investors" element={<InvestorsPage />} />
      <Route path="/sustainability" element={<SustainabilityPage />} />
      <Route path="/press" element={<PressPage />} />
    </Routes>
  );
};

// --- MAIN APP COMPONENT ---
function App() {
  const [notification, setNotification] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [allCategories, setAllCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [dailyDeals, setDailyDeals] = useState([]);
  const [flashDeals, setFlashDeals] = useState([]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return allProducts;
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allProducts]);

  useEffect(() => {
    // Set main categories immediately, as they are a fixed list for the Home page.
    setMainCategories(MAIN_CATEGORIES);
    
    let cancelled = false;
    
    async function fetchProducts() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled || !data || !Array.isArray(data.products)) return;

        const normalizedProducts = data.products.map(normalizeProduct).filter(Boolean);
        setAllProducts(normalizedProducts);
        
        // Dynamically generate the full list of categories for the Products page
        const uniqueCategories = [...new Set(normalizedProducts.map(p => p.category))].sort();
        setAllCategories(uniqueCategories);

        const shuffled = [...normalizedProducts].sort(() => 0.5 - Math.random());
        setFlashDeals(shuffled.slice(0, 4).filter(p => p.discount));
        setDailyDeals(shuffled.slice(4, 12).filter(p => p.discount));

      } catch (err) {
        console.error("Fetch API error:", err);
        setAllProducts([]);
        setAllCategories([]);
        setDailyDeals([]);
        setFlashDeals([]);
      }
    }

    fetchProducts();
    return () => { cancelled = true; };
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
          <CartSidebar />
          <main>
            <AppRoutes
              products={filteredProducts}
              allCategories={allCategories}
              mainCategories={mainCategories}
              flashDeals={flashDeals}
              dailyDeals={dailyDeals}
              showNotification={showNotification}
            />
          </main>
          <Notification message={notification} />
          <Footer footerLinks={footerLinks} mainCategories={mainCategories} />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;