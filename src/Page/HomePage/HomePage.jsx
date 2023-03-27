import React from "react";
import CarouselHome from "../../Components/Carousel/CarouselHome";
import ProductList from "./../../Components/Product/ProductList";
import "./HomePage.css";

function HomePage(props) {
  return (
    <>
      <div className="homepage-carousel-container">
        <CarouselHome></CarouselHome>
      </div>
      <div className="product-list-container">
        <ProductList></ProductList>
      </div>
    </>
  );
}

export default HomePage;
