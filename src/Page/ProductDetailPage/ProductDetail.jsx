import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { useParams } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { actionFetchSingleProductAPI } from "../../Redux/Action/ProductAction";
import {
  actionAddToCartAPI,
  actionAddItemQty,
  actionDecItemQty,
  actionUpdateCartAPI,
  actionCloseCart,
  actionOpenCart,
  actionUpdateCartQty,
  actionGetCartByUserIdAPI,
} from "../../Redux/Action/CartAction";
import "./ProductDetail.scss";
import storage from "../../Storage/Storage";
import { useContext } from "react";
import AppContext from "../../AppContext";

function ProductDetail(props) {
  const { drawerIsOpen } = useContext(AppContext);
  let stateRedux = useSelector((state) => state);
  let dispatchRedux = useDispatch();
  const cart = stateRedux.cartReducer;
  let product = stateRedux.singleProductReducer;
  let id = storage.getItem("id");
  let prodId = useParams();
  const [qty, setQty] = useState(1);

  const handleAddToCart = (id, cartItem) => {
    const existingItem = cart.cartItems.find(
      (item) => item.productId === cartItem.productId
    );
    if (existingItem) {
      existingItem.quantity += 1;
      dispatchRedux(actionUpdateCartAPI(id, existingItem));
    } else {
      const newCartItem = {
        user_id: id,
        productId: cartItem.productId,
        quantity: qty,
        price: cartItem.price,
      };
      console.log("newCartItem ", newCartItem);
      dispatchRedux(actionAddToCartAPI(newCartItem));
      dispatchRedux(actionUpdateCartQty(1));
    }
    dispatchRedux(actionOpenCart());
  };

  useEffect(() => {
    dispatchRedux(actionFetchSingleProductAPI(prodId.id));
    dispatchRedux(actionGetCartByUserIdAPI(id));
  }, [drawerIsOpen]);

  useEffect(() => {
    dispatchRedux(actionCloseCart());
  }, []);

  return (
    <div className="product-detail-container">
      <div className="product-detail-components">
        <div className="product-image">
          <img
            alt="Sample"
            src={
              "http://localhost:8080/api/v1/fileUpload/files/" +
              product.imageName
            }
            style={{ paddingTop: 30 }}
          />
        </div>
        <div className="product-details">
          <div>
            <h1 id="product-name">{product.name}</h1>
            <CardSubtitle className="mb-2 text-muted" tag="h5">
              {product.info}
            </CardSubtitle>
            <div>{product.detail}</div>
            <div id="product-price">
              {product.price
                ? product.price.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })
                : null}
            </div>

            <div>
              <Button
                onClick={() => setQty(qty - 1)}
                className="qty_btn"
                disabled={qty <= 1}
              >
                -
              </Button>
              <input
                type="text"
                className="input_qty"
                value={qty}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10); // Convert the value to an integer
                  if (!isNaN(value) && value > 0) {
                    setQty(value);
                  }
                }}
                size="3"
              />
              <Button className="qty_btn" onClick={() => setQty(qty + 1)}>
                +
              </Button>
            </div>
            <Button
              onClick={() => handleAddToCart(id, product)}
              id="add-to-cart"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
