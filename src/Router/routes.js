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
import TestPage from "../Page/TestPage";
import ProductPageAdmin from "../Page/ProductPageAdmin";
import OrderPageAdmin from "../Page/OrderPageAdmin";
import AccountPage from "../Page/AccountPage";
import ResetPassPage from "../Page/ResetPassPage";
import ChangePassPage from "../Page/ChangePassPage";

export const routes = (
  <Routes>

    <Route element={<WithNav />}>
      <Route element={<AdminAuth />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/products-admin" element={<ProductPageAdmin />} />
        <Route path="/orders-admin" element={<OrderPageAdmin />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<WithAuth />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="/accounts/:id" element={<AccountPage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/categories/:id" element={<ProductCategoryPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/checkoutSuccess" element={<CheckOutSuccess />} />
      {/* <Route path="/test" element={<TestPage />} /> */}
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/forgotPass" element={<ForgotPasswordPage />} />
      <Route path="/resetPass/:token" element={<ResetPassPage />} />
      <Route path="/changePass" element={<ChangePassPage />} />
    </Route>
  </Routes>
);


