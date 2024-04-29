import React, { Suspense, lazy, useRef } from "react";
import { Route, Routes, Outlet, Navigate, useNavigate } from "react-router-dom";
import HomePage from "../Page/homePage/HomePage";
import ProductDetail from "../Page/productDetailPage/ProductDetail";
import CartPage from "../Page/CartPage";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import AppContext from "../AppContext";
import storage from "../Storage/Storage";
import { useDispatch, useSelector } from "react-redux";
import { lazyLoad } from "../lazyLoad";
import { useTransition } from "react";

const role = storage.getItem("role");
const status = storage.getItem("status");
const token = storage.getItem("token");

const AdminPage = lazy(() => import("../Page/AdminPage"));
const ProductPageAdmin = lazy(() => import("../Page/ProductPageAdmin"));
const ProfilePage = lazy(() => import("../Page/ProfilePage"));
const LoginPage = lazy(() => import("../Page/LoginPage"));
const RegisterPage = lazy(() => import("../Page/RegisterPage"));
const NotFoundPage = lazy(() => import("../Page/NotFoundPage"));
const ChangePassPage = lazy(() => import("../Page/ChangePassPage"));
const ResetPassPage = lazy(() => import("../Page/ResetPassPage"));
const ForgotPasswordPage = lazy(() => import("../Page/ForgotPassPage"));
const ProductPage = lazy(() => import("../Page/productPage/ProductPage"));
const ProductCategoryPage = lazy(() =>
  import("../Page/productPage/ProductCategoryPage")
);
const CheckoutPage = lazy(() => import("../Page/CheckoutPage"));
const CheckoutSuccessPage = lazy(() => import("../Page/CheckoutSuccessPage"));
const OrderPage = lazy(() => import("../Page/OrderPage"));

const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(decodedPayload);
  } catch (e) {
    return null;
  }
};

const decodedJwt = parseJwt(token);
if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
  <Navigate to="/" />;
}

function AdminAuth() {
  const dispatchRedux = useDispatch();
  return role === "ADMIN" && token && status === "ACTIVE" ? (
    <AppContext.Provider
      value={{
        dispatchRedux,
      }}
    >
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </AppContext.Provider>
  ) : (
    <Navigate to="/" />
  );
}
function WithAuth() {
  const dispatchRedux = useDispatch();

  return token && status === "ACTIVE" ? (
    <AppContext.Provider
      value={{
        dispatchRedux,
      }}
    >
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </AppContext.Provider>
  ) : (
    <Navigate to="/login" />
  );
}

function WithNav() {
  const introRef = useRef(null);
  let accountDefaultImg = require(`../Assets/img/account-default-img.png`);
  const logoBackground = require(`../Assets/img/logowithbackground.png`);
  const dispatchRedux = useDispatch();
  let navigate = useNavigate();
  const cartStateRedux = useSelector((state) => state);
  const [isPending, startTransition] = useTransition();
  const drawerIsOpen = cartStateRedux.CartDrawerReducer.isOpen;
  const scrollToComponent = () => {
    if (introRef.current) {
      introRef.current.scrollIntoView({
        behavior: "smooth", // Optionally, add smooth scrolling effect
        block: "start", // Scroll to the top of the component
      });
    }
  };
  return role !== "ADMIN" ? (
    <AppContext.Provider
      value={{
        introRef,
        scrollToComponent,
        drawerIsOpen,
        logoBackground,
        accountDefaultImg,
        dispatchRedux,
        isPending,
        startTransition,
        navigate,
      }}
    >
      <Header />
      {isPending && "Loading..."}
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
      <Footer />
    </AppContext.Provider>
  ) : (
    <Navigate to="/admin" />
  );
}

export const routes = (
  <Routes>
    <Route element={<WithNav />}>
      <Route path="/" element={<HomePage />} />

      <Route element={<WithAuth />}>
        <Route path="/accounts/:id" element={<ProfilePage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/changePass" element={<ChangePassPage />} />
      </Route>
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/checkoutSuccess" element={<CheckoutSuccessPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
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
