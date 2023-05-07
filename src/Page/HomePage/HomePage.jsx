import React, { useEffect } from "react";
import CarouselHome from "../../Components/Carousel/CarouselHome";
import ProductList from "./../../Components/Product/ProductList";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

function HomePage(props) {
  const navigate = useNavigate();

  useEffect(() => {
    // navigate(0);
  }, []);
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
