// import React, { useState, useEffect} from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Col, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
// import { useParams } from "react-router-dom";
// import { Button, Box } from "@mui/material";
// import { actionFetchSingleProductAPI } from "../../Redux/Action/ProductAction";
// import {
//   actionAddToCartAPI,
//   actionAddItemQty,
//   actionDecItemQty,
//   actionUpdateCartAPI,
//   actionCloseCart,
//   actionOpenCart,
//   actionUpdateCartQty,
// } from "../../Redux/Action/CartAction";
// import "./ProductDetail.css";

// function ProductDetail(props) {
//   let stateRedux = useSelector((state) => state);
//   let dispatchRedux = useDispatch();
//   const cart = stateRedux.cartReducer;
//   let product = stateRedux.singleProductReducer;
//   let id = storage.getItem("id");
//   let prodId = useParams();
//   const [qty, setQty] = useState(1);

//   if (!id) {
//     storage.setItem("id", Math.floor(Math.random() * 3000) + 1);
//   }
  
//   const handleAddToCart = (id, cartItem) => {
//     const existingItem = cart.cartItems.find((item) => item.productId === cartItem.productId);
//     if (existingItem) {
//       existingItem.quantity += 1;
//       dispatchRedux(actionUpdateCartAPI(id, existingItem));
//     } else {
//       const newCartItem = {
//         quantity: 1,
//         price: cartItem.price,
//         productId: cartItem.productId,
//       };
//       dispatchRedux(actionAddToCartAPI(newCartItem));
//       dispatchRedux(actionUpdateCartQty(1));
//     }
//     dispatchRedux(actionOpenCart());
//   };

//   const addQty = (cartItem) => {
//     dispatchRedux(actionAddItemQty(cartItem));
//     dispatchRedux(actionUpdateCartAPI(id, cartItem));
//   };

//   const decQty = (cartItem) => {
//     dispatchRedux(actionDecItemQty(cartItem));
//     dispatchRedux(actionUpdateCartAPI(id, cartItem));
//   };

//   const updateQty = (id, product, e) => {
//     let obj = { cart_id: product.cart_id, quantity: e.target.value, price: product.price * e.target.value };
//     dispatchRedux(actionUpdateCartAPI(id, obj));
//   };

//   useEffect(() => {
//     dispatchRedux(actionFetchSingleProductAPI(prodId.id));
//   }, [prodId.id]);

//   useEffect(() => {
//     dispatchRedux(actionCloseCart());
//   }, []);

//   // useEffect(() => {
//   //   dispatchRedux(actionCloseCart());
//   // }, []);
//   // dispatchRedux(actionFetchSingleProductAPI(prodId.id));
//   return (
//     <Col sm="4" style={{ padding: 30 }}>
//       <Box>
//         {/* <img alt="Sample" src= {require('../../Assets/Product/' + product.imageName)} style={{ paddingTop: 30 }} /> */}
//         <img alt="Sample" src={"http://localhost:8080/api/v1/fileUpload/files/" + product.imageName} style={{ paddingTop: 30 }} />
//         <CardBody>
//           <CardTitle tag="h5">{product.name}</CardTitle>
//           <CardSubtitle className="mb-2 text-muted" tag="h6">
//             {product.info}
//           </CardSubtitle>
//           <CardText>{product.detail}</CardText>
//           {/* <CardText>{product.price.toLocaleString("vi", { style: "currency", currency: "VND" })}</CardText> */}
//         </CardBody>
//         <span>
//           <Button disabled={qty <= 1} onClick={() => decQty(product)}>
//             -
//           </Button>
//           <input
//             type="text"
//             className="input_qty"
//             value={product.quantity}
//             onChange={(e) => updateQty(id, product, e)}
//             size="3"
//           />
//           <Button onClick={() => addQty(product)}>+</Button>
//         </span>
//       </Box>
//       <Button color="primary" onClick={() => handleAddToCart(id, product)}>
//         Add to cart
//       </Button>
//     </Col>
//   );
// }

// export default ProductDetail;
