import { Route, Routes } from "react-router-dom";
import LoginPage from "../Page/LoginPage";
import HomePage from "../Page/HomePage";
import AdminPage from "../Page/AdminPage";
import RegisterPage from "../Page/RegisterPage";
import NotFoundPage from "../Page/NotFoundPage";
import ProductPage from "./../Page/ProductPage";
import CheckoutPage from "./../Page/CheckoutPage";
import CheckOutSuccess from "../Page/CheckoutSuccessPage";
import ForgotPasswordPage from "./../Page/ForgotPassPage";
import { AdminAuth, WithAuth, WithNav, WithoutNav } from "../HOC/Authentication";
import ProductDetail from "../Components/Product/ProductDetail";
import CartPage from "../Page/CartPage";
import TestPage from "../Page/TestPage";
import ProductPageAdmin from "../Page/ProductPageAdmin";
import AccountPage from "../Page/AccountPage";
import ResetPassPage from "../Page/ResetPassPage";
import ChangePassPage from "../Page/ChangePassPage";

export const routes = (
  <Routes>
    <Route element={<WithoutNav />}></Route>

    <Route element={<WithNav />}>
      <Route element={<AdminAuth />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/products-admin" element={<ProductPageAdmin />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<WithAuth />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="/accounts/:id" element={<AccountPage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/checkoutSuccess" element={<CheckOutSuccess />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/forgotPass" element={<ForgotPasswordPage />} />
      <Route path="/resetPass/:token" element={<ResetPassPage />} />
      <Route path="/changePass" element={<ChangePassPage />} />
    </Route>
  </Routes>
);

// // List route trong chương trình, Trong TH tích hợp API có thể dùng luôn
// const routeList = [
//   {
//     path: "/login",
//     exact: true,
//     component: () => <LoginPage />, // Sử dụng hàm arrow để sau này có thể có những route có tham số thì có thể truyền vào luôn
//   },
//   {
//     path: "/home",
//     exact: true,
//     element: () => <HomePage />,
//   },
//   {
//     path: "/admin",
//     exact: true,
//     element: () => {
//       <AdminPage />;
//     },
//     authen: true,
//   },
//   {
//     path: "/register",
//     exact: true,
//     element: () => <RegisterPage />,
//   },
//   {
//     path: "",
//     exact: false,
//     element: () => <NotFoundPage />,
//   },
// ];

// // Hàm tạo ra Switch Route
// let generateRouteMenus = (routeListParam) => {
//   // Lặp qua từng phần tử trong list để tạo ra các tuyến route tương ứng
//   let routeResult = routeListParam.map((route, index) => {
//     if (route.authen) {
//       return <AuthenRoute key={index} path={route.path} exact={route.exact} ComponentAuthen={AdminPage} />;
//     }

//     <Routes key={index} path={route.path} exact={route.exact} element={route.element} />;
//   });

//   return (
//     <Routes>
//       {routeResult}

//     </Routes>
//   );
// };
// // Export routes để sử dụng bên App
// export const routes = generateRouteMenus(routeList);

