import { Container } from "react-bootstrap";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import AllProducts from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import NoMatchPage from "./pages/NoMatchPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Logout from "./pages/Logout";
import OrdersPage from "./pages/OrdersPage";
import UsersPage from "./pages/UsersPage";
import StockPage from "./pages/StockPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:category?" element={<ProductsPage />} />
            <Route
              path="products/product/:id"
              element={<ProductDetailPage />}
            />
            <Route path="/cart/:id?" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Authentication */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/logout" element={<Logout />} />

            {/* Admin Only */}
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/stock" element={<StockPage />} />

            {/* Error */}
            <Route path="*" element={<NoMatchPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
