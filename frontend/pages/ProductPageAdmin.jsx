import React from "react";
// import CreateButton from "./../components/Admin/CreateButton";
import MenuBar from "../components/Admin/menuBar/MenuBar";
import ManageProduct from "../components/Admin/manageProduct/ManageProduct";

function ProductPageAdmin(props) {
  return (
    <div className="admin-page-container">
      <MenuBar />
      <div className="content-area-admin">
        <ManageProduct />
      </div>
    </div>
  );
}

export default ProductPageAdmin;
