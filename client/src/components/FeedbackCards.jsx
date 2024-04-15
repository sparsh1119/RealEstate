 import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Mousewheel, Keyboard } from "swiper/modules";
import ReactStars from "react-rating-stars-component";

export default function FeedbackCards() {
  const [fbdata, setFbdata] = useState([]);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch("/api/user/getfb");
        const data = await res.json();
        setFbdata(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleMouseEnter = () => {
    if (swiper) {
      swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiper) {
      swiper.autoplay.start();
    }
  };

  return (
    <Swiper
      mousewheel={{
        enabled: true,
        forceToAxis: true,
      }}
      keyboard={{
        enabled: true,
        onlyInViewport: true,
      }}
      allowSlidePrev={true}
      slidesPerView={1}
      loop={true}
      spaceBetween={20}
      pagination={false}
      modules={[Mousewheel, Keyboard, Autoplay]}
      className="mySwiper md:pt-5"
      autoplay={{
        delay: 2000,
        disableOnInteraction: false
      }}
      style={{
        "--swiper-navigation-size": "20px",
      }}
      freeMode={true}
      rewind={true}
      centeredSlides={true}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      breakpoints={{
        300: { slidesPerView: 1.1, spaceBetween: 10 },
        640: { slidesPerView: 1.5, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 3.1, spaceBetween: 40 },
      }}
      onSwiper={setSwiper}
    >
      <div className="swiper-button-next"></div>

      {fbdata.map((e, index) => (
        <SwiperSlide key={index} className="flex justify-center">
          <div
            className="w-full max-w-lg rounded-lg overflow-hidden shadow-md bg-gray-800 text-white p-6 cursor-pointer transform transition-transform hover:scale-105"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <h3 className="text-xl font-semibold mb-2">{e.username}</h3>
            <p className="text-sm mb-4">{e.feedback}</p>
            <div className="flex items-center">
              <ReactStars
                count={5}
                size={24}
                value={e.rating}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
                edit={false}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}

      <div className="swiper-button-prev"></div>
    </Swiper>
  );
}

