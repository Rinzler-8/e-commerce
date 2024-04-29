import React, { useContext, useEffect } from "react";
import "./ProductItem.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  actionAddToCartAPI,
  actionOpenCart,
  actionGetCartByUserIdAPI,
  actionUpdateCartQty,
  actionUpdateCartAPI,
} from "../../redux/Action/CartAction";
import "../../../src/css/toastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import storage from "../../Storage/Storage";
import AppContext from "../../AppContext";

function ProductItem() {
  const { dispatchRedux } = useContext(AppContext);
  let stateRedux = useSelector((state) => state);
  let cartStateRedux = useSelector((state) => state.cartReducer);
  const cart = stateRedux.cartReducer;
  let listProduct = stateRedux.listProductReducer;
  let id = storage.getItem("id");

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
              margin: "0px 10px",
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
          </NavLink>

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
            <p id="product-info">{product.info}</p>
            <p id="price">
              {product.price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <p id="price">(Giá tham khảo)</p>
          </div>
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
