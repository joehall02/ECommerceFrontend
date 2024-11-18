import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import Admin from "./components/Admin/Admin";

const App = () => {
  return (
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
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
