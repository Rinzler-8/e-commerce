import React, { useEffect } from "react";
import "./ProductItem.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  actionAddToCartAPI,
  actionOpenCart,
  actionGetCartByUserIdAPI,
  actionUpdateCartQty,
  actionUpdateCartAPI,
} from "../../Redux/Action/CartAction";
import "../../../src/css/toastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import storage from "../../Storage/Storage";

function ProductItem() {
  let dispatchRedux = useDispatch();
  let stateRedux = useSelector((state) => state);
  let cartStateRedux = useSelector((state) => state.cartReducer);
  const cart = stateRedux.cartReducer;
  let listProduct = stateRedux.listProductReducer;
  let id = storage.getItem("id");
  if (!id) {
    storage.setItem("id", Math.floor(Math.random() * 3000) + 1);
  }

  const handleAddToCart = (id, cartItem) => {
    const prod = listProduct.find(
      (item) => item.productId === cartItem.productId
    );

    if (prod.stockQty <= 0) {
      toast.error("Sản phẩm đã hết hàng !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const existingItem = cart.cartItems.find(
        (item) => item.productId === cartItem.productId
      );
      if (existingItem) {
        existingItem.quantity += 1;
        dispatchRedux(actionUpdateCartAPI(id, existingItem));
      } else {
        const newCartItem = {
          user_id: id,
          quantity: 1,
          price: cartItem.price,
          productId: cartItem.productId,
        };
        dispatchRedux(actionAddToCartAPI(newCartItem));
        dispatchRedux(actionUpdateCartQty(1));
      }
      dispatchRedux(actionOpenCart());
    }
  };

  useEffect(() => {
    dispatchRedux(actionGetCartByUserIdAPI(id));
  }, [cartStateRedux.quantity]);
  return (
    <>
      {listProduct.map((product, index) => (
        <div className="productItem-wrapper" key={index}>
          <NavLink
            to={`/products/${product.productId}`}
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "0px 10px",
              alignItems: "center",
            }}
          >
            <div className="productItem-img">
              <img
                alt="Sample"
                src={
                  "http://localhost:8080/api/v1/fileUpload/files/" +
                  product.imageName
                }
              />
            </div>
            <div className="productItem-information">
              <h5
                style={{
                  color: "black",
                  fontFamily: "Lucida Sans, sans-serif",
                  height: "50px",
                }}
              >
                {product.name}
              </h5>
              <p
                className="mb-2 text-muted"
                tag="h6"
                style={{ height: "50px" }}
              >
                {product.info}
              </p>
              <p
                style={{
                  color: "black",
                  fontFamily: "Univers LT Std, sans-serif",
                }}
              >
                {product.price.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <p
                style={{
                  color: "black",
                  fontFamily: "Univers LT Std, sans-serif",
                }}
              >
                (Giá tham khảo)
              </p>
            </div>
          </NavLink>
          <button
            className="add-to-cart-btn"
            onClick={() => handleAddToCart(id, product)}
          >
            Thêm vào giỏ hàng
          </button>
          <ToastContainer />
          {/* </div> */}
        </div>
      ))}
    </>
  );
}

export default ProductItem;
