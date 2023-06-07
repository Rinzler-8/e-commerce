import { Route, Routes } from "react-router-dom";
import LoginPage from "../Page/LoginPage";
import HomePage from "../Page/HomePage/HomePage";
import AdminPage from "../Page/AdminPage";
import RegisterPage from "../Page/RegisterPage";
import NotFoundPage from "../Page/NotFoundPage";
import ProductPage from "../Page/ProductPage/ProductPage";
import CheckoutPage from "./../Page/CheckoutPage";
import CheckOutSuccess from "../Page/CheckoutSuccessPage";
import ForgotPasswordPage from "./../Page/ForgotPassPage";
import { AdminAuth, WithAuth, WithNav } from "../HOC/Authentication";
import ProductDetail from "../Page/ProductDetailPage/ProductDetail";
import ProductCategoryPage from "../Page/ProductPage/ProductCategoryPage";
import CartPage from "../Page/CartPage";
import ProductPageAdmin from "../Page/ProductPageAdmin";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import OrderPageAdmin from "../Page/OrderPageAdmin";
import AccountPage from "../Page/AccountPage";
=======
import OrderPage from "../Page/OrderPage";
import ProfilePage from "../Page/ProfilePage";
>>>>>>> prod
import ResetPassPage from "../Page/ResetPassPage";
import ChangePassPage from "../Page/ChangePassPage";
>>>>>>> 1e2a83ac9c2a47d6346ddfe870f3ebdb2e5f6dea

export const routes = (
  <Routes>
    <Route element={<WithNav />}>
<<<<<<< HEAD
      <Route element={<AdminAuth />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/products-admin" element={<ProductPageAdmin />} />
<<<<<<< HEAD
=======
        <Route path="/orders-admin" element={<OrderPageAdmin />} />
>>>>>>> 1e2a83ac9c2a47d6346ddfe870f3ebdb2e5f6dea
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
=======
>>>>>>> prod
      <Route element={<WithAuth />}>
        <Route path="/accounts/:id" element={<ProfilePage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/changePass" element={<ChangePassPage />} />
      </Route>
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/checkoutSuccess" element={<CheckOutSuccess />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/categories/:id" element={<ProductCategoryPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Route>
    <Route element={<AdminAuth />}>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/product-admin" element={<ProductPageAdmin />} />
      <Route path="/order-admin" element={<OrderPage />} />
      <Route path="/admin/:id" element={<ProfilePage />} />
      <Route path="/changePass" element={<ChangePassPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
    {/* <Route path="/test" element={<TestPage />} /> */}
    <Route path="/forgotPass" element={<ForgotPasswordPage />} />
    <Route path="/resetPass/:token" element={<ResetPassPage />} />
  </Routes>
);
