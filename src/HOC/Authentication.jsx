import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

let role = localStorage.getItem("role");
let status = localStorage.getItem("status");
let tokend = localStorage.getItem("token");

function AdminAuth() {
  return role === "ADMIN" && tokend && status == "ACTIVE" ? <Outlet /> : <Navigate to="/" />;
}
function WithAuth() {
  return tokend && status == "ACTIVE" ? <Outlet /> : <Navigate to="/login" />;
}

// console.log("admin", role);

function WithNav() {
  return role !== "ADMIN" ? (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ) : (
    <Navigate to="/admin" />
  );
}

export { AdminAuth, WithAuth, WithNav };
