import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import NoMatchPage from "./pages/NoMatchPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage";

import { useSelector } from "react-redux";

export default function App() {
  const { isAdmin } = useSelector((state) => state.auth);

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

            {/* Admin Only */}
            <Route
              path="/admin"
              element={isAdmin ? <AdminPage /> : <Navigate to="/" replace />}
            />

            {/* Error */}
            <Route path="*" element={<NoMatchPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
