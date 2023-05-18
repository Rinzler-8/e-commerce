import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionFetchProductAPI } from "../../Redux/Action/ProductAction";
import {
  actionAddToCartAPI,
  actionUpdateCartQty,
  actionGetCartByUserIdAPI,
  actionOpenCart,
  actionUpdateCartAPI,
} from "../../Redux/Action/CartAction";
import Slider from "react-slick";
import "./ProductList.css";
import "./slickProduct.css";
import "../Carousel/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../../../src/css/toastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let slidesToShow = 3;

const PreviousBtn = (props) => {
  const { onClick, currentSlide } = props;
  return (
    <>
      {currentSlide == 0 ? (
        <div className={`controlProd-left`}>
          <ArrowBackIosNewIcon style={{ color: "grey", fontSize: "30px" }} />
        </div>
      ) : (
        <div className={`controlProd-left`} onClick={onClick}>
          <ArrowBackIosNewIcon style={{ color: "0a0f9e", fontSize: "30px" }} />
        </div>
      )}
    </>
  );
};
const NextBtn = (props) => {
  const { onClick, slideCount, currentSlide } = props;
  return (
    <>
      {(currentSlide !== slideCount - slidesToShow) == 0 ? (
        <div className={`controlProd-right`}>
          <ArrowForwardIosIcon style={{ color: "grey", fontSize: "30px" }} />
        </div>
      ) : (
        <div className={`controlProd-right`} onClick={onClick}>
          <ArrowForwardIosIcon style={{ color: "0a0f9e", fontSize: "30px" }} />
        </div>
      )}
    </>
  );
};

const ProductList = () => {
  const dispatchRedux = useDispatch();
  const stateRedux = useSelector((state) => state);
  const cartStateRedux = useSelector((state) => state.cartReducer);
  const cart = stateRedux.cartReducer;
  const listProduct = stateRedux.listProductReducer;
  let id = localStorage.getItem("id");

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
      console.log("cart.cartItems", cart.cartItems);
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
        console.log("newCartItem", newCartItem.productId);

        dispatchRedux(actionAddToCartAPI(newCartItem));
        dispatchRedux(actionUpdateCartQty(1));
      }
      dispatchRedux(actionOpenCart());
    }
  };

  useEffect(() => {
    dispatchRedux(actionFetchProductAPI());
    dispatchRedux(actionGetCartByUserIdAPI(id));
  }, [id, cartStateRedux.quantity, cart.cartItems.length]);

  const settings = {
    // centerMode: true;
    dots: false,
    touchMove: false,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };
  return (
    <>
      <div className="product-list-title">SẢN PHẨM BÁN CHẠY</div>
      <div className="list-item-container">
        <Slider {...settings}>
          {listProduct.map((product, index) => (
            <div className="productItem-container" key={index}>
              <NavLink
                to={`/products/${product.id}`}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingLeft: "17px",
                  padding: "0",
                  width: "400px",
                }}
              >
                <img
                  alt="Sample"
                  className="productItem-img"
                  src={
                    "http://localhost:8080/api/v1/fileUpload/files/" +
                    product.imageName
                  }
                />

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
            </div>
          ))}
        </Slider>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProductList;
