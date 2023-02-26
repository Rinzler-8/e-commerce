import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import NavReactstrap from "../Nav/NavReactstrap";
import Footer from "../Components/Home/Footer";



function AdminAuth() {
  let role = localStorage.getItem("role");
  return role === "ADMIN" && localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
}
function WithAuth() {
  let tokend = localStorage.getItem("token");
  // return tokend ? <Outlet /> : <Navigate to="/login" />;
  return <Outlet />;
}

function WithNav() {
  return (
    <>
      <NavReactstrap />
      <Outlet />
      <Footer />
    </>
  );
}

function WithoutNav() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
export { AdminAuth, WithAuth, WithNav, WithoutNav };
