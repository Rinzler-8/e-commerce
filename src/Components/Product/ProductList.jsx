import React, { useEffect } from "react";
import ProductItem from "./ProductItem";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionFetchProductAPI } from "../../Redux/Action/ProductAction";
import { actionAddToCartAPI } from "../../Redux/Action/CartAction";
import Slider from "react-slick";
import "./ProductList.css";
import "./slickProduct.css";
import "../Carousel/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Arrow = ({ onClick, direction }) => {
  return (
    <div className={`controlProd-${direction}`} onClick={onClick}>
      {direction === "left" ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
    </div>
  );
};

let slidesToShow = 3;

const PreviousBtn = (props) => {
  console.log(props);
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
  console.log(props);
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
  let dispatchRedux = useDispatch();
  let stateRedux = useSelector((state) => state);
  let listProduct = stateRedux.listProductReducer;
  let id = localStorage.getItem("id");
  const handleAddToCart = (id, cartItem) => {
    let obj = {
      quantity: 1,
      price: cartItem.price,
      product_id: cartItem.product_id,
    };
    dispatchRedux(actionAddToCartAPI(id, obj));
    alert("Them san pham vao gio thanh cong");
    window.location.reload();
  };
  useEffect(() => {
    dispatchRedux(actionFetchProductAPI());
  }, []);
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
                to={`/products/${product.product_id}`}
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
                <img alt="Sample" className="productItem-img" src={"http://localhost:8080/api/v1/fileUpload/files/" + product.imageName} />

                <div className="productItem-information">
                  <h5 style={{ color: "black", fontFamily: "Lucida Sans, sans-serif", height: "50px" }}>{product.name}</h5>
                  <p className="mb-2 text-muted" tag="h6" style={{ height: "50px" }}>
                    {product.info}
                  </p>
                  <p style={{ color: "black", fontFamily: "Lucida Sans, sans-serif" }}>
                    {product.price.toLocaleString("vi", { style: "currency", currency: "VND" })}
                  </p>
                  <p style={{ color: "black", fontFamily: "Lucida Sans, sans-serif" }}>(Giá tham khảo)</p>
                </div>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(id, product)}>
                  Thêm vào giỏ hàng
                </button>
              </NavLink>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ProductList;
