import dynamic from "next/dynamic";
const Card = dynamic(() => import("./Card"), {
  ssr: false,
});
// import Card from "./Card";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Loader from "../Loader/Loader";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef, useState } from "react";
import CardModal from "./CardModal";
SwiperCore.use([Navigation, Pagination]);

function HomeContainer({ Data = [], heading, page, Icon, to, swiperId,loading }) {
  const { theme } = useSelector((state) => state);
  const swiper = useSwiper();
  const currentSwiper = useRef(null);
  const [selected, setSelected] = useState(false);
  const [url, setUrl] = useState("");

  const emptyCards = [
    { i: 0 },
    { i: 1 },
    { i: 2 },
    { i: 3 },
    { i: 4 },
    { i: 5 },
    { i: 6 },
  ];
  const [my_swiper, set_my_swiper] = useState({});
  function next() {
    if (swiper !== null) {
      swiper.slideNext();
    }
  }

  const handleSelected = () => {
    setSelected(true);
  };
  return Data?.length > 0 && (
    <div className="py-8 xl:px-2 xl:py-1 relative">
      <div className="flex justify-between">
    <span
          className={` px-2 flex  ${theme.text.selected} font-semibold items-end  text-2xl`}
        >
          
          {heading}
        </span>
       
        
        <div className="flex items-center gap-1 mx-1">
          <button
            className="p-2 lg:p-3 rounded-full border-[1px] border-white bg-[#111] hover:bg-[#2228]"
            id={`swiper-back-${swiperId}`}
          >
            <FaChevronLeft color="white" size={22} />
          </button>
          <button
            className="p-2 lg:p-3  rounded-full bg-[#111] border-[1px] border-white hover:bg-[#2228]"
            id={`swiper-forward-${swiperId}`}
          >
            <FaChevronRight color="white" size={22} />
          </button>
        </div>
      </div>
      <div className={`bg-gray-400 rounded-full h-0.5 mx-2 w-[2rem]`} />

      <Swiper
        id={swiperId}
        ref={currentSwiper}
        onInit={(ev) => {
          set_my_swiper(ev);
        }}
        modules={[Navigation]}
        navigation={{
          nextEl: `#swiper-forward-${swiperId}`,
          prevEl: `#swiper-back-${swiperId}`,
        }}
        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          480: {
            slidesPerView: 3.5,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4.2,
            spaceBetween: 10,

            speed: 500,
          },
          720: {
            slidesPerView: 4.5,
            spaceBetween: 10,
            speed: 500,
          },
          1024: {
            slidesPerView: 5.1,
            spaceBetween: 10,
            slidesPerGroup: 5,
            speed: 500,
          },
          1224: {
            slidesPerView: 5.6,
            spaceBetween: 10,
            slidesPerGroup: 4,
            speed: 500,
          },
          1424: {
            slidesPerView: 6,
            spaceBetween: 10,
            slidesPerGroup: 5,
            speed: 500,
          },
          1624: {
            slidesPerView: 7.3,
            slidesPerGroup: 5,
            spaceBetween: 10,
            speed: 500,
          },
        }}
      >
        <div className="">
          {Data?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    onClick={() =>
                      setUrl(
                        item.animeId ||
                          item.anime_id ||
                          item?.id?.replace("/", "") ||
                          item.url,
                      )
                    }
                  >
                    <Card
                      {...item}
                      selected={handleSelected}
                      heading={heading}
                    />
                  </div>
                </SwiperSlide>
              ))}
           
        </div>
      </Swiper>
      <AnimatePresence>
        {selected && (
          <CardModal
            id={url}
            handleClose={(e) => {
              setSelected(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default HomeContainer;
