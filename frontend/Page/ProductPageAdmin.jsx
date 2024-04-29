import React from "react";
// import CreateButton from "./../Components/Admin/CreateButton";
import MenuBar from "../Components/Admin/MenuBar/MenuBar";
import ManageProduct from "../Components/Admin/ManageProduct/ManageProduct";

function ProductPageAdmin(props) {
  return (
    <div className="admin-page-container">
      <MenuBar/>
      <div className="content-area-admin">
        <ManageProduct/>
      </div>
    </div>
  );
}

export default ProductPageAdmin;
