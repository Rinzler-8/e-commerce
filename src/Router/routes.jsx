import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../Page/LoginPage";
import HomePage from "../Page/HomePage/HomePage";
import AdminPage from "../Page/AdminPage";
import RegisterPage from "../Page/RegisterPage";
import NotFoundPage from "../Page/NotFoundPage";
import ProductPage from "../Page/ProductPage/ProductPage";
import CheckoutPage from "../Page/CheckoutPage";
import CheckOutSuccess from "../Page/CheckoutSuccessPage";
import ForgotPasswordPage from "../Page/ForgotPassPage";
import { AdminAuth, WithAuth, WithNav } from "../HOC/Authorization";
import ProductDetail from "../Page/ProductDetailPage/ProductDetail";
import ProductCategoryPage from "../Page/ProductPage/ProductCategoryPage";
import CartPage from "../Page/CartPage";
import ProductPageAdmin from "../Page/ProductPageAdmin";
import OrderPage from "../Page/OrderPage";
import ProfilePage from "../Page/ProfilePage";
import ResetPassPage from "../Page/ResetPassPage";
import ChangePassPage from "../Page/ChangePassPage";

export const routes = (
  <Routes>
    <Route element={<WithNav />}>
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
