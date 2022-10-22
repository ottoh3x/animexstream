import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import {
  addToMyList,
  removeFromMyList,
} from "../../redux/actions/myLIstDataAction";
import cheerio from "cheerio";

import dynamic from "next/dynamic";
const EpisodePagiNation = dynamic(() => import("../EpisodePagiNation"));
const HomeContainer = dynamic(() => import("../card/HomeContainer"));

import { Triangle } from "react-loader-spinner";

import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resumeAction } from "../../redux/actions/resumeAction";
import Link from "next/link";
import { addToWatchList } from "../../redux/actions/recentlyWatchedAction";
// import EpisodePagiNation from "../EpisodePagiNation";
import { BsPlay } from "react-icons/bs";
import { useRouter } from "next/router";

const axios = require("axios");

const Msg = ({ title, message }) => {
  return (
    <div className="flex flex-col">
      <span>
        <span className="font-bold text-gray-200">{title}</span> {message}
      </span>

      <span className="text-blue-800 text-xl "></span>
    </div>
  );
};

const WatchingContainer = ({
  data,
  slug,
  frame,
  mal,
  loading,
  epLoading,
  related,
  iframe,
  relatedLoading,
  maLoading,
}) => {
  const Myref = useRef(null);
  const { theme, resumeId, watchList, myList } = useSelector((state) => state);
  const [animeData, setAnimeData] = useState([]);
  const [image, setImage] = useState("");
  const [val, setVal] = useState(null);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [light, setLight] = useState(false);
  const dispatch = useDispatch();
  const [ep, setEp] = useState([]);
  const [schedule, setSchedule] = useState("");
  const [ifr, setIfr] = useState("");
  const [dataIfr, setDataIfr] = useState("");
  const [onGoingPopular, setOnGoingPopular] = useState([]);
  const violationRef = useRef(null);
  const scrollHere = useRef(null);
  const [rec, setRec] = useState([]);
  const [click, setClick] = useState(false);

  var myArray = [];
  const myFunc = () => {
    for (let i = ep; i >= 1; i--) {
      myArray.push(i);
    }
  };

  var r =
    "https://animixplay.to/api/live" +
    window.btoa(dataIfr + "LTXs3GrU8we9O" + window.btoa(dataIfr));

  // const ImageContainer = styled.div`
  //   background: linear-gradient(rgb(0 0 0 / 86%), rgb(0 0 0 / 90%)),
  //     url(${image}) 0% 0% / cover no-repeat fixed;
  //   height: 100vh;
  //   width: 100%;
  //   filter: blur(7.5px) drop-shadow(2px 4px 14px black);
  //   /* z-index: 1; */
  //   position: fixed;

  //   background-position: center;
  // `;

  useEffect(() => {
    // let offsetTop = scrollHere?.current?.offsetTop;
    // violationRef?.current?.scrollTo(0, offsetTop);
    fetchRec();
    FetchingOnGoing();
    const ifry = setIfr(
      `https://animixplay.to/api/live` +
        window.btoa(data.epid + "LTXs3GrU8we9O" + window.btoa(data.epid)),
    );
    setDataIfr(data.epid);
    fetchEpisodesList();
    dispatch(
      addToWatchList({
        id: slug[0],
        image_url: image,
        title: title,
        episode: slug[1],
        time: Date.now(),
      }),
    );
    dispatch(
      resumeAction({
        data: slug,
        time: 0,
      }),
    );
    fetchSchedule();

    const current = myList.filter((item) => item.id == mal?.anime_id);
    current.length > 0 ? setClick(true) : setClick(false);
    return () => {
      ifry;
    };
  }, [data, image]);

  const handleClick = () => {
    if (click) {
      setClick(false);
      dispatch(removeFromMyList(mal?.anime_id));
      toast.info(
        <Msg title={mal?.title} message="Was Removed From Your List" />,
      );
    } else {
      dispatch(
        addToMyList({
          id: mal?.anime_id,
          image_url: data.image_url || mal?.image_url,
          title: data?.title || mal?.title,
          released: data.year || mal?.aired?.prop?.from?.year,
        }),
      );
      setClick(true);
      toast.info(<Msg title={mal?.title} message="Was Added To Your List" />);
    }
  };

  const fetchEpisodesList = async () => {
    let res = await axios.get(
      `https://ottogo.vercel.app/api/details/${slug[0]}/`,
    );
    setAnimeData(res?.data);
    setImage(res.data.image_url);
    setTitle(res.data.title);
    setEp(res.data.episodes);
  };

  const fetchRec = async () => {
    let req = await axios.get(
      `https://api.jikan.moe/v4/anime/${mal?.mal_id}/recommendations`,
    );
    let res = req.data;
    setRec(res.data.slice(0, 15));
  };

  const FetchingOnGoing = async (e) => {
    let d = await axios.get(
      `  https://ajax.gogo-load.com/ajax/page-recent-release-ongoing.html?page=1
      `,
    );
    d = d.data;
    const myList = [];
    var $ = cheerio.load(d);
    $(".added_series_body ul li").each(function (index, element) {
      let result = {};
      let url = $(this).children("a").attr("href").replace("/category/", "");
      let title = $(this).children("a").attr("title");
      let latest = $(this).children("p").last().children("a").text();
      let image_url = $(this)
        .children("a")
        .children("div")
        .attr("style")
        .replace("background: url('", "")
        .replace("');", "");

      result = { title, url, image_url, latest };
      myList.push(result);
    });
    setOnGoingPopular(myList);
    console.log(myList);
  };

  const fetchSchedule = async () => {
    let res = await axios.get(
      `https://ottogo.vercel.app/api/schedule/${slug[0]}/`,
    );

    setSchedule(res.data?.time || "");
  };
  console.log(val);
  console.log(myArray.length);
  console.log(myArray);

  return (
    <div className="flex justify-between 2xl:w-[91%] px-2 mx-auto">
      {light && (
        <div className={`fixed left-0 top-0 right-0 bottom-0 bg-black z-50`} />
      )}

      <div className="relative  mt-[2rem] flex justify-center rounded-mde items-center   text-center flex-col lg:h-full w-full lg:w-[1100px] xl:w-[1145px] 2xl:w-[1345px]  ">
        {/* <div
          className={` flex flex-col pb-2 xl:w-full justify-between items-center w-full ${theme.text.selected}   my-4`}
        >
          <div className="w-full py-4 uppercase flex flex-col items-start lg:items-start">
            <Link href={`/details/${slug[0]}`}>
              <span
                className={`text-1xl lg:text-3xl ml-0 lg:ml-10 cursor-pointer text-blue-500`}
              >
                {slug[0].replaceAll("-", " ")}
              </span>
            </Link>
            <div
              className={`bg-gray-400 rounded-full h-0.5 ml-0 lg:ml-11 w-1/12`}
            />
          </div>
          
        </div> */}
        {/* <div className=" w-[80%] lg:w-1/2 h-22 bg-red-600 p-2 text-white mt-4 rounded-md">If your encounter any bug please report it in the message area bottom  !</div> */}
        <div
          className={`ifr-container mb-1 flex w-full ${
            light ? "z-50" : ""
          } justify-center items-center flex-col-reverse`}
        >
          <div className="flex flex-col-reverse md:flex-row w-full drop-shadow-2xl	">
            <div className=" w-full md:block md:w-[12.5rem] lg:w-[16rem] bg-[#100f0f] md:bg-[#000000eb]">
              <div
                className="flex flex-col text-white h-[350px] md:h-[500px] lg:h-[619px] xl:h-[610px] overflow-y-scroll"
                ref={violationRef}
              >
                <div className="flex justify-between p-2 font-bold border-b-2  border-slate-600 border-double items-center">
                  Episodes
                  <input
                    type="text"
                    className="text-blue-400 bg-transparent p-1 w-[6rem] outline outline-[#363333] outline-1 outline-solid focus:outline-blue-500 "
                    placeholder="Filter eps.."
                    onChange={(e) => setVal(e.target.value)}
                  />
                </div>
                {val <= parseInt(ep) && val > 0 ? (
                  <div
                    key={val}
                    className="m-[1px]"
                    onClick={() => router.push(`/watching/${slug[0]}/${val}`)}
                  >
                    <span
                      className={
                        slug[1] == ep
                          ? "bg-blue-500 p-3 cursor-pointer flex justify-between font-bold "
                          : `p-2 cursor-pointer flex justify-between font-light bg-[#0a0909]
              hover:bg-[#8080802b] hover:font-bold `
                      }
                    >
                      <h2>Episode {val} </h2>{" "}
                      <span>
                        <BsPlay
                          strokeWidth={0}
                          size={25}
                          className={
                            slug[1] == ep ? "text-white " : "text-blue-500"
                          }
                        />
                      </span>
                    </span>
                  </div>
                ) : (
                  (myFunc(),
                  myArray.reverse().map((ep) => (
                    <div
                      key={ep}
                      className="m-[1px]"
                      onClick={() => router.push(`/watching/${slug[0]}/${ep}`)}
                      ref={scrollHere}
                    >
                      <span
                        className={
                          slug[1] == ep
                            ? "bg-blue-500 p-2 cursor-pointer flex justify-between font-bold "
                            : `p-2 cursor-pointer flex justify-between font-light bg-[#0a0909]
                  hover:bg-[#8080802b] hover:font-bold `
                        }
                      >
                        <h2>Episode {ep} </h2>{" "}
                        <span>
                          <BsPlay
                            strokeWidth={0}
                            size={25}
                            className={
                              slug[1] == ep ? "text-white " : "text-blue-500"
                            }
                          />
                        </span>
                      </span>
                    </div>
                  )))
                )}
              </div>
            </div>

            {loading ? (
              <div className="w-full h-[225px] md:h-[500px] bg-black lg:h-[619px] xl:h-[610px] flex justify-center items-center ">
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
              <iframe
                className="w-full h-[225px] md:h-[500px] lg:h-[619px] xl:h-[610px] drop-shadow-xl "
                src={iframe}
                frameBorder="0"
                allowFullScreen
                ref={Myref}
              ></iframe>
            )}
          </div>

          <EpisodePagiNation
            page={[slug[0], slug[1]]}
            heading={"Ep"}
            total={ep}
            episodeid={data.epid}
            light={() => setLight(!light)}
            reload={() => (Myref.current.src += "")}
            change={() =>
              Myref.current.src == frame
                ? (Myref.current.src = data.iframe)
                : Myref.current.src == data.iframe
                ? (Myref.current.src = frame)
                : ""
            }
          />
        </div>
        <div className="flex justify-between w-full px-2 items-center">
          <h1
            className={`${theme.text.selected} font-black text-xl hover:text-blue-400 cursor-pointer`}
          >
            {mal?.title}
          </h1>
          <span className="text-gray-500">...</span>
        </div>
        <hr className="h-[1px] my-3 bg-gray-600 w-full border-none"></hr>
        {epLoading ? (
         <div className="w-full h-full bg-black  flex justify-center items-center ">


         <Triangle 
      height="110" 
      width="110" 
      radius="9"
      color="#1C25B2" 
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      
      visible={true}
       /> </div>
      ):(
        <div className=" rounded-md flex lg:flex-row gap-1 w-full p-2 ">
          <div className="w-full max-w-[200px] mx-auto">
            <img
              src={mal?.image_url}
              className="w-[140px] h-[200px] mx-auto text-center lg:w-full lg:h-[300px] rounded-sm object-cover"
            />
            {/* <div className="p-1 text-gray-400">
            <div className="flex gap-1 items-center">
            <span><AiFillStar color="orange"/>
            </span>{mal?.score}</div>
            </div> */}
          </div>
          <div className="p-1 lg:py-2 lg:px-3 w-full  text-left relative">
            <span className="absolute top-0 right-0 ">
              {click ? (
                <FaHeart onClick={handleClick} size={30} color="red" />
              ) : (
                <FaHeart onClick={handleClick} size={30} color="#BDBDBD" />
              )}
            </span>

            <div className="grid  md:grid-cols-2">
              <div className="flex flex-col py-1">
                <span className=" font-bold text-blue-600">Rank</span>
                <span className={`${theme.text.notselected} capitalize`}>
                  <span className="text-gray-400">#</span>
                  {mal?.rank}
                </span>
              </div>
              <div className="flex flex-col pb-1">
                <span className=" font-bold text-blue-600">Score</span>
                <span className={`${theme.text.notselected} capitalize`}>
                  {mal?.score}
                </span>
              </div>
              <div className="flex flex-col py-1">
                <span className=" font-bold text-blue-600">Duration</span>
                <span className={`${theme.text.notselected} capitalize`}>
                  {mal?.duration}
                </span>
              </div>

              <div className="flex flex-col py-1">
                <span className=" font-bold text-blue-600">Status</span>
                <span className={`${theme.text.notselected} capitalize`}>
                  {mal?.status}
                </span>
              </div>
              <div className="flex flex-col py-1">
                <span className=" font-bold text-blue-600">Title Japanese</span>
                <span className={`${theme.text.notselected} capitalize`}>
                  <span className="text-gray-400"></span>
                  {mal?.title_japanese}
                </span>
              </div>
              {mal?.airing === "true" && (
                <div className="flex flex-col py-1  ">
                  <span className="font-bold text-blue-600 ">Broadcast:</span>
                  <span className={`${theme.text.notselected} capitalize px-1`}>
                    {mal?.broadcast || "?"}
                  </span>
                </div>
              )}
              <div className="flex flex-col py-1">
                <span className=" font-bold text-blue-600">Release Date </span>
                <span className={`${theme.text.notselected} capitalize`}>
                  <span className="text-gray-400"></span>
                  {mal?.aired?.string}
                </span>
              </div>
              <div className="flex flex-col py-1">
                <span className=" font-bold text-blue-600">Rating </span>
                <span className={`${theme.text.notselected} capitalize`}>
                  <span className="text-gray-400"></span>
                  {mal?.rating}
                </span>
              </div>
              <div className="flex flex-col py-1">
                <span className=" font-bold text-blue-600">Source </span>
                <span className={`${theme.text.notselected} capitalize`}>
                  <span className="text-gray-400"></span>
                  {mal?.source}
                </span>
              </div>
            </div>
            {/* <p className={`p-0 lg:p-2 ${theme.text.notselected} font-light`}>{mal?.synopsis}</p> */}
          </div>
        </div> )}
        <div className="mx-2 p-8 mt-2 bg-[#0c0b0b] w-full">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 flex-wrap justify-center">
              {mal?.genres?.split(",").map((Item, index) => (
                <span
                  key={index}
                  className=" py-1 px-5 mr-2 text-[#BDBDBDBD] border-[1px] border-[#BDBDBDBD] cursor-pointer flex justify-center whitespace-nowrap items-center transform hover:-translate-y-1 hover:text-gray-300 transition-transform duration-200"
                >
                  {Item}
                </span>
              ))}
            </div>

            <p
              className={`${theme.text.notselected} text-[#BDBDBD] font-light`}
            >
              {mal?.synopsis}
            </p>
          </div>
        </div> 

        <div className="w-full  mx-auto mt-4">
          <HomeContainer
            Data={related?.filter((e) => e.animeTitle !== mal?.title)}
            heading={"Related"}
            loading={relatedLoading}
            Icon=""
            to={`recentlyWatched`}
            swiperId={2}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 max-w-[21%] mr-3">
        {rec?.length > 1 && (
          <div className="hidden lg:block w-full  h-full max-h-[70vh] overflow-y-scroll mt-[2rem]  ">
            <div className="p-2 bg-[#0c0b0b]">
              <h1 className="font-semibold text-center text-gray-200">
                Recommended Animes
              </h1>
            </div>
            {rec?.map((anime, i) => (
              <Link key={i} href={`/details/${anime.entry.mal_id}`}>
                <div
                  style={{ filter: "drop-shadow(2px 4px 6px black)" }}
                  className="flex my-1 drop-shadow-2xl p-1 bg-[#0c0b0b] hover:bg-[#141313]"
                >
                  <img
                    className="h-[4rem] w-full max-w-[3.5rem] rounded-lg object-cover"
                    src={anime.entry.images.jpg.image_url}
                    
                  />
                  <div className="px-2 flex flex-col">
                    <h1 className="text-gray-200 cursor-pointer hover:text-blue-300">
                      {anime.entry.title}
                    </h1>

                    <p className="flex gap-1 text-gray-300 items-end h-full">
                      Votes:{" "}
                      <span className="text-gray-500">{anime.votes}</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="hidden lg:block w-full  h-full max-h-[70vh] overflow-y-scroll mt-[2rem]  ">
          <div className="p-2 bg-[#0c0b0b]">
            <h1 className="text-center text-gray-200">Popular Ongoing</h1>
          </div>
          {onGoingPopular?.map((anime, i) => (
            <div
              key={i}
              style={{ filter: "drop-shadow(2px 4px 6px black)" }}
              className="flex my-1 drop-shadow-2xl p-1 bg-[#0c0b0b] hover:bg-[#141313]"
            >
              <img
                className="h-[4rem] w-full max-w-[3.5rem] rounded-lg object-cover"
                src={anime.image_url}
                alt="test"
              />
              <div className="px-2 flex flex-col">
                <Link href={`/details/${anime.url}`}>
                  <h1 className="font-semibold text-gray-200 cursor-pointer hover:text-blue-300">
                    {anime.title}
                  </h1>
                </Link>
                
                  <p onClick={() => router.push(`/watching/${anime.url}/${anime.latest.replace(
                    "Episode ",
                    "",
                  )}`)} className="flex gap-1 text-gray-300 items-end h-full">
                    Latest:{" "}
                    <span className="text-gray-500 cursor-pointer hover:text-blue-500">
                      {anime.latest}
                    </span>
                  </p>
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchingContainer;
