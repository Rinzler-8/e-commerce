import React, { useContext, useEffect } from "react";
import CarouselHome from "../../Components/Carousel/CarouselHome";
import ProductList from "./../../Components/Product/ProductList";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import AppContext from "../../AppContext";

function HomePage(props) {
  const {introRef} = useContext(AppContext);;
  const navigate = useNavigate();

  useEffect(() => {
    // navigate(0);
  }, []);
  return (
    <>
      <div className="homepage-carousel-container">
        <CarouselHome></CarouselHome>
      </div>
      <div className="product-list-container" ref={introRef}>
        <ProductList></ProductList>
      </div>
    </>
  );
}

export default HomePage;
