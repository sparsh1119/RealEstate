import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation , Pagination} from "swiper/modules";
import { Autoplay, Mousewheel, Keyboard } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "swiper/css/free-mode";
import ListingItem from "../components/ListingItem";
import Image1 from "../assets/Propify_trans.png";
import Banner1 from "../assets/Banner1.gif";
import Banner2 from "../assets/banner2.jpg"; 
import Banner3 from "../assets/banner3.jpg"; 
import { FaArrowRight } from "react-icons/fa";
import FeedbackCards from "../components/FeedbackCards";
import Footer from "../components/Footer";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  SwiperCore.use([Pagination]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div className="mt-4">
      {/* top */}
      <div className="flex flex-col gap-3 p-14 px-3 max-w-6xl mx-auto">
        <div className="flex flex-row self-center  ">
          <h1 className="text-slate-700 text-3xl lg:text-6xl p-10 font-bold">
            BUY, SELL &amp; RENT on
          </h1>
          <img
            className="transition-all duration-200 h-40 w-fit hover:scale-110 -translate-x-12 "
            src={Image1}
            alt=""
          />
        </div>
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl self-center">
          Find Your <span className="text-rose-800">Sanctuary </span>
          in Every Listing.
        </h1>
      </div>

      {/* swiper */}
      <Swiper  mousewheel={{
        enabled: true,
        forceToAxis: true,
      }}
      keyboard={{
        enabled: true,
        onlyInViewport: true,
      }}
      allowSlidePrev={true}
      loop={true}
      pagination={true}
      modules={[Mousewheel, Keyboard, Autoplay]}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false
      }}
      style={{
        "--swiper-navigation-size": "20px",
        "--swiper-navigation-color": "black",
        "--swiper-pagination-color": "black",
      }}
      freeMode={true}
      rewind={true}
      navigation>
        <SwiperSlide >
          <img className="h-[600px] w-full " src={Banner1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[600px] w-full " src={Banner2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[600px] w-full " src={Banner3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[600px] w-full " src={Banner1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[600px] w-full " src={Banner1} alt="" />
        </SwiperSlide>
      </Swiper>

      {/* Mid */}
      <div className="flex flex-col gap-6 p-4 lg:p-16 max-w-6xl items-center mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl text-center">
          Home-Buying on Your Mind ?
        </h1>
        <Link to={"/search"} className="mx-auto lg:mx-0">
          <div className="group p-1 rounded-full bg-amber-400 font-bold transition-all duration-200 hover:scale-95 w-fit mx-auto lg:mx-0">
            <div className="flex flex-row items-center rounded-full gap-2 px-10 py-[15px] transition-all duration-200 group-hover:underline">
              <p>See all Properties</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
      </div>

      {/* listings */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Review */}
      <div className="max-w-6xl mx-auto p-3  gap-8 my-10">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Clients Feedback
        </h1>
        <FeedbackCards />
      </div>

      <Footer/>
    </div>
  );
}
