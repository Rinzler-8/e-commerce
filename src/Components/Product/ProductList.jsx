import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, CardBody, CardTitle, CardSubtitle, CardText, Button, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { Card, CardContent, Grid, Box, Typography, Rating } from "@mui/material";
import { Container } from "reactstrap";
import { actionAddToCartAPI } from "../../Redux/Action/CartAction";

const ProductList = () => {
  let stateRedux = useSelector((state) => state);
  let dispatchRedux = useDispatch();
  let listProduct = stateRedux.listProductReducer;
  let id = localStorage.getItem("id");
  const handleAddToCart = (id, cartItem) => {
    dispatchRedux(actionAddToCartAPI(id, cartItem));
  };
// console.log("image: ", listProduct)
  // Khai báo item hiển thị dữ liệu
  // Kiểm tra nếu listProduct !="" sẽ hiển thị dữ liệu
  if (listProduct) {
    return (
      <Grid container spacing={2}>
        {listProduct.map((product, index) => (
          <Col className="bg" sm="4" xs="6" key={index} align="center">
            <Box>
              <NavLink href={`/products/${product.product_id}`}>
                <img alt="Sample" src={require('../../Assets/Product/' + product.imageName)} style={{ paddingTop: 30 }} />
                <CardContent>
                  <CardTitle tag="h5">{product.name}</CardTitle>
                  <CardText>{product.price}</CardText>
                  <CardText>{product.info}</CardText>
                  <CardText>{product.detail}</CardText>
                </CardContent>
              </NavLink>
            </Box>

            <Button color="primary" onClick={() => handleAddToCart(id, product)}>
              Add to cart
            </Button>
          </Col>
        ))}
      </Grid>
    );
  }
};

export default ProductList;
// <Grid item md={5} key={index}>
//   <Box
//     sx={{ width: "100%" }}
//     component='img'
//     src={product.imageName}
//   />
//   <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//     {product.name}
//   </Typography>
//   <Box>
//     <Rating name='rating' defaultValue={product.ratingStar} precision={1} />
//   </Box>
// </Grid>
