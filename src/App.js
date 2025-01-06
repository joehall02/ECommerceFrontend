import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { BasketProvider } from "./contexts/BasketContext";
import axios from "axios";
import AdminRoute from "./components/routes/AdminRoutes";
import UserRoute from "./components/routes/UserRoutes";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Shop from "./components/Shop/Shop";
import ProductPage from "./components/Shop/ProductPage/ProductPage";
import Footer from "./components/Footer/Footer";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Orders from "./components/Account/Orders/Orders";
import Addresses from "./components/Account/Addresses/Addresses";
import AddAddress from "./components/Account/Addresses/AddAddress/AddAddress";
import EditAddress from "./components/Account/Addresses/EditAddress/EditAddress";
import Settings from "./components/Account/Settings/Settings";
import EditName from "./components/Account/Settings/EditName/EditName";
import EditPassword from "./components/Account/Settings/EditPassword/EditPassword";
import DeleteAccount from "./components/Account/Settings/DeleteAccount/DeleteAccount";
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import AdminCategories from "./components/Admin/AdminCategories/AdminCategories";
import NewCategory from "./components/Admin/AdminCategories/NewCategory/NewCategory";
import CategoryDetails from "./components/Admin/AdminCategories/CategoryDetails/CategoryDetails";
import AdminProducts from "./components/Admin/AdminProducts/AdminProducts";
import NewProduct from "./components/Admin/AdminProducts/NewProduct/NewProduct";
import ProductDetails from "./components/Admin/AdminProducts/ProductDetails/ProductDetails";
import AdminOrders from "./components/Admin/AdminOrders/AdminOrders";
import OrderDetails from "./components/Admin/AdminOrders/OrderDetails/OrderDetails";

// Set Axios defaults
axios.defaults.withCredentials = true; // Allow cookies to be sent and stored, allowing access and refresh tokens to be stored

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <BasketProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/product-page/:product_id" element={<ProductPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* User only routes */}
            <Route path="/account" element={<UserRoute />}>
              <Route path="orders" element={<Orders />} />
              <Route path="addresses" element={<Addresses />} />
              <Route path="addresses/add-address" element={<AddAddress />} />
              <Route path="addresses/edit-address/:address_id" element={<EditAddress />} />
              <Route path="settings" element={<Settings />} />
              <Route path="settings/edit-name" element={<EditName />} />
              <Route path="settings/edit-password" element={<EditPassword />} />
              <Route path="settings/delete-account" element={<DeleteAccount />} />
            </Route>
            {/* Admin only routes */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="categories/new-category" element={<NewCategory />} />
              <Route path="categories/category-details/:category_id" element={<CategoryDetails />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new-product" element={<NewProduct />} />
              <Route path="products/product-details/:product_id" element={<ProductDetails />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="orders/order-details" element={<OrderDetails />} />
            </Route>
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </BasketProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
