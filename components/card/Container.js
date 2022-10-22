import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import PagiNation from "../PagiNation";
import Loader from "../Loader/Loader";
import { clearMyWatchList } from "../../redux/actions/recentlyWatchedAction";
import { AiFillDelete } from "react-icons/ai";
import dynamic from "next/dynamic";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
import { Triangle } from "react-loader-spinner";
import { AnimatePresence } from "framer-motion";
import CardModal from "./CardModal";

function Container({ Data = [], heading, page, Icon, len, loading }) {
  const { theme, watchList } = useSelector((state) => state);
  const [selected, setSelected] = useState(false);
  const [url, setUrl] = useState("");
  const [top, setTop] = useState([]);
  console.log(Data);
  const dispatch = useDispatch();
  const clearWatch = () => {
    dispatch(clearMyWatchList());
  };

  useEffect(() => {
    fetchTop();
  }, []);

  const handleSelected = () => {
    setSelected(true)
  }

  const fetchTop = async () => {
    let url = `https://api.jikan.moe/v4/top/anime?filter=airing&limit=15`;
    let req = await axios.get(url);
    let res = await req.data;
    console.log(res);
    setTop(res.data);
  };
  return Data?.length > 0 ? (
    <div className="flex overflow-hidden justify-between max-w-[1650px] mx-auto">
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center ">
          <Triangle
            height="110"
            width="110"
            radius="9"
            color="#1C25B2"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            visible={true}
          />{" "}
        </div>
      ) : (
        <div>
          <div className="mt-[2rem] relative  w-full ">
            <span
              className={`${theme.text.selected} px-2 flex  font-bold items-center  text-2xl md:text-3xl`}
            >
              {/* {Icon ? (
            <Icon
              size={15}
              style={{
                margin: "0px 10px 0px 0px",
                color: heading == "My List" ? "red" : theme.text.selected,
              }}
            />
          ) : (
            ""
          )} */}
              {heading}
            </span>
            {/* <div className={`bg-gray-400 rounded-full h-0.5 mx-2 w-[2rem]`} /> */}
            <span
              className={`text-blue-500  capitalize px-16 font-thin text-xl`}
            >
              {heading == "Showing Results for"
                ? page?.[0]
                : heading == "Genres"
                ? page?.[0]
                : "Anime"}
            </span>
            {heading == "Recently Watched" ? (
              <div className="absolute cursor-pointer px-4 top-0 right-0">
                <div
                  className={`${theme.button.background} ${theme.button.text} h-10 w-10  rounded-full flex  p-2.5 shadow-2xl relative right-0`}
                  id="deletewatchlist"
                  onClick={clearWatch}
                >
                  {" "}
                  <AiFillDelete size={20} />
                </div>
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-3  w-full px-2 my-6  gap-[0.5rem] mt-[0.5rem] justify-center  md:grid-cols-5  lg:grid-cols-5 xl:grid-cols-5 lg:px-[1.5rem]  2xl:grid-cols-6 xl:gap-[0.6rem] 2xl:px-[2.3rem]">
            {Data?.map((item, index) => (
              <div
                key={index}
                onClick={() => setUrl(item.anime_id || item.id || item.url)}
              >
                <Card {...item} selected={handleSelected} heading={heading} />
              </div>
            ))}
          </div>
          {page ? <PagiNation page={page} heading={"Page"} len={len} /> : null}
        </div>
      )}
      <div className="hidden lg:block w-full max-w-[24%] mt-[2rem] mr-2 ">
        <div className="p-2 bg-[#141313]">
          <h1 className="font-semibold text-center text-gray-200">
            Weekly Top
          </h1>
        </div>
        {top.map((anime, i) => (
          <Link key={i} href={`/details/${anime.mal_id}`}>
            <div
              style={{ filter: "drop-shadow(2px 4px 6px black)" }}
              className="flex my-1 drop-shadow-2xl p-1 bg-[#141313]"
            >
              <img
                className="h-[5rem] w-full max-w-[4rem] rounded-lg object-cover"
                src={anime?.images.jpg.image_url}
                alt="test"
              />
              <div className="px-2 flex flex-col">
                <h1 className="font-semibold text-blue-600 cursor-pointer hover:text-blue-200">
                  {anime.title} <span className="text-gray-400"> #{i + 1}</span>
                </h1>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <span className="mb-[2px]">
                    <AiFillStar color="#ffd530e8" />
                  </span>{" "}
                  {anime.score}{" "}
                  <span className="ml-2 text-gray-500">{anime.year}</span>{" "}
                </p>
                <p className="flex gap-1 items-end h-full">
                  {anime.genres.map((genre, i) => (
                    <span key={i} className="text-gray-500 text-sm">
                      {genre.name}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
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
  ) : (
    <div className="h-screen w-full flex justify-center items-center ">
      <Triangle
        height="110"
        width="110"
        radius="9"
        color="#1C25B2"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        visible={true}
      />{" "}
    </div>
  );
}

export default Container;
