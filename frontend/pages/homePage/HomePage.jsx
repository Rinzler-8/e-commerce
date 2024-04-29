import React, { useContext, useEffect } from "react";
import CarouselHome from "../../components/carousel/CarouselHome";
import ProductList from "../../components/product/ProductList";
import "./HomePage.scss";
import AppContext from "../../AppContext";

function HomePage(props) {
  const { introRef } = useContext(AppContext);

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
