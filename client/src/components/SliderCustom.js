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
  return (
    <div className="w-full">
      <Slider {...settings}>
        {images?.length > 0 &&
          images?.map((img, index) => (
            <div
              key={index}
              className="flex justify-center items-center h-[320px] bg-black"
            >
              <img
                src={img}
                alt={`slider-${index}`}
                className="h-full object-contain m-auto"
              />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default memo(SliderCustom);
