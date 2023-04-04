import React, { useState } from "react";
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from "reactstrap";
import "./CarouselHome.css";

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

function CarouselHome(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={item.src} enableTouch={true}>
        <img src={item.src} alt={item.altText} style={{ width: "100%", height: "700px" }} />
        <CarouselCaption captionHeader={item.caption} captionText={item.altText} className="carousel-text" />
      </CarouselItem>
    );
  });
  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous} {...props}>
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default CarouselHome;
