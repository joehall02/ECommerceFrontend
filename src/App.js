import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import axios from "axios";
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
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/product-page" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/orders" element={<Orders />} />
          <Route path="/account/addresses" element={<Addresses />} />
          <Route path="/account/addresses/add-address" element={<AddAddress />} />
          <Route path="/account/settings" element={<Settings />} />
          <Route path="/account/settings/edit-name" element={<EditName />} />
          <Route path="/account/settings/edit-password" element={<EditPassword />} />
          <Route path="/account/settings/delete-account" element={<DeleteAccount />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/categories/new-category" element={<NewCategory />} />
          <Route path="/admin/categories/category-details" element={<CategoryDetails />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/new-product" element={<NewProduct />} />
          <Route path="admin/products/product-details" element={<ProductDetails />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/orders/order-details" element={<OrderDetails />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
