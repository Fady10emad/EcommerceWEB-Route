import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import imageSlider1 from '../../assets/images/work-1.jpg';
import imageSlider2 from '../../assets/images/work-2.jpg';
import imageSlider3 from '../../assets/images/work-3.jpg';
import imageSlider4 from '../../assets/images/work-4.jpg';
import imageSlider5 from '../../assets/images/work-5.jpg';
import imageSlider6 from '../../assets/images/work-6.jpg';

export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

  };

  return (
    <div className="slider-container mx-auto px-4 py-6">
      <Slider {...settings}>
        <div>
          <img src={imageSlider1} className="w-full h-80 object-cover rounded-xl" alt="Slide 1" />
        </div>
        <div>
          <img src={imageSlider2} className="w-full h-80 object-cover rounded-xl" alt="Slide 2" />
        </div>
        <div>
          <img src={imageSlider3} className="w-full h-80 object-cover rounded-xl" alt="Slide 3" />
        </div>
        <div>
          <img src={imageSlider4} className="w-full h-80 object-cover rounded-xl" alt="Slide 4" />
        </div>
        <div>
          <img src={imageSlider5} className="w-full h-80 object-cover rounded-xl" alt="Slide 5" />
        </div>
        <div>
          <img src={imageSlider6} className="w-full h-80 object-cover rounded-xl" alt="Slide 6" />
        </div>
      </Slider>
    </div>
  );
}
