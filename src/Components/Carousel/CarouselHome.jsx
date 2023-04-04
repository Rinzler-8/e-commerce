import React, { useState } from "react";
import "./CarouselHome.css";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const items = [
  {
    src: require("../../Assets/img/carousel4.png"),
    altText: "Clinically Proven Cleansing for a Soothed Skin Barrier",
    caption: "BODY EMULSION",
    key: 1,
  },
  {
    src: require("../../Assets/img/carousel1.png"),
    altText: "Slide 2",
    caption: "Slide 2",
    key: 2,
  },
  {
    src: require("../../Assets/img/bodyem.png"),
    altText: "Slide 3",
    caption: "Slide 3",
    key: 3,
  },
];

const Arrow = ({ onClick, direction }) => {
  return (
    <div className={`control-${direction}`} onClick={onClick}>
      {direction === 'left' ? <ArrowBackIosNewIcon/> : <ArrowForwardIosIcon/>}
    </div>
  );
};

function CarouselHome(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <Arrow direction = "left"/>,
    nextArrow: <Arrow direction = "right"/>

  };
  return (
    <div>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.key} style={{ width: "100%", height: "700px",  position: "relative" }}>
            <img src={item.src} alt={item.altText} style={{ width: "100%", height: "700px" }} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CarouselHome;
