import React, { memo } from "react";
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SliderCustom = ({ images }) => {
  console.log(images);
  return (
    <div className="w-full">
      <Slider {...settings}>
        <img
          src="https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/08/03/z3616101876318-f4aaaa35f92150c39a20eda805347bba_1659534373.jpg"
          alt="slider"
          className="w-full h-[320px] object-cover"
        />
      </Slider>
    </div>
  );
};

export default memo(SliderCustom);
