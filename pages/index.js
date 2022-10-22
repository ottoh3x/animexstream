import dynamic from "next/dynamic";
import Head from "next/head";
import cheerio from "cheerio";
const HomePage = dynamic(() => import("../components/home/HomePage"));
const Header = dynamic(() => import("../components/home/Header"));
import styled from "styled-components";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination,EffectFade,Autoplay } from "swiper";
import { useEffect, useState } from "react";
import axios from "axios";
import {AiFillStar, AiFillTags} from "react-icons/ai";
import { FaPlay, FaYoutube } from "react-icons/fa";
import { useRouter } from "next/router";
import HomeContainer from "../components/card/HomeContainer";
import { useSelector } from "react-redux";

SwiperCore.use([Navigation, Pagination,Autoplay,EffectFade ]);




const IndexContainer = styled.div`
    width: 100%;
    height:100%;
    
        background-position: center top;
    background-size: cover;
    overflow:hidden;
  
   
}
  
    
  }
`;

const ImageContainer = styled.div`
position: relative ;
margin-top: 4rem ;
overflow:hidden;
background:black;

height: 600px ;
 &::before {
  content: '';

  position:  absolute ;
  top: 0 ;
  right: 0 ;
  bottom: 0 ;
  left: 0 ;
  filter : blur(0px) brightness(0.3);
  background-image: var(--bg-image) ;
  background-size: cover ;

  background-repeat:no-repeat;
  box-shadow:grey 0px 11px 0px -10px inset, #111 0px -110px 50px -10px inset;
  
   
}
  
    
  }
`;

const Description = styled.p`
display: -webkit-box;
-webkit-line-clamp: 4;
overflow: hidden;
-webkit-box-orient: vertical;
text-overflow: ellipsis;
  
   
}
  
    
  }
`;



export default function Home() {
  const [top,setTop] = useState([])
  const router = useRouter()
  const [content, setContent] = useState([]);
  const [onGoingPopular, setOnGoingPopular] = useState([]);

  const [dub, setDub] = useState([]);
  const { theme, resumeId, myList, watchList } = useSelector((state) => state);


  const [dataRecently, setDataRecently] = useState([]);
  const [dataPopular, setDataPopular] = useState([]);

  const sortedList = watchList.sort((a, b) => b.time - a.time);


  useEffect(() => {
    fetchTop();
    Fetching();
    FetchingDub();

    PopularFetch();
    FetchingOnGoing();

  },[])


  const Fetching = async (e) => {
    let d = await axios.get(
      `https://ajax.gogo-load.com/ajax/page-recent-release.html?page=1&type=1`,
    );
    d = d.data;
    const myList = [];
    var $ = cheerio.load(d);
    $(".items li").each(function (index, element) {
      let result = {};
      let id = $(this)
        .children("div")
        .children("a")
        .attr("href")
        .split("-episode")[0];
      let title = $(this).children("div").children("a").attr("title");
      let image_url = $(this).find("img").attr("src");
      let episode = $(this).children(".episode").text();

      result = { title, id, image_url, episode };
      myList.push(result);
    });
    setContent(myList);
  };
  const FetchingDub = async (e) => {
    let d = await axios.get(
      `https://ajax.gogo-load.com/ajax/page-recent-release.html?page=1&type=2`,
    );
    d = d.data;
    const myList = [];
    var $ = cheerio.load(d);
    $(".items li").each(function (index, element) {
      let result = {};
      let id = $(this)
        .children("div")
        .children("a")
        .attr("href")
        .split("-episode")[0];
      let title = $(this).children("div").children("a").attr("title");
      let image_url = $(this).find("img").attr("src");
      let episode = $(this).children(".episode").text();

      result = { title, id, image_url, episode };
      myList.push(result);
    });
    setDub(myList);
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
      let image_url = $(this)
        .children("a")
        .children("div")
        .attr("style")
        .replace("background: url('", "")
        .replace("');", "");
      let latest = $(this).children("p").last().children("a").text();

      result = { title, url, image_url, latest };
      myList.push(result);
    });
    setOnGoingPopular(myList);

  };

  // const recentlyFetch = async () => {
  //   let res = await axios.get("https://ottogo.vercel.app/api/latest/1/");
  //   setDataRecently(res.data.slice(0, 12));
  //   console.log(dataRecently);
  // };

  const PopularFetch = async () => {
    let res = await axios.get("https://ottodb.vercel.app/api/popular/1/");
    setDataPopular(res.data);

  };
  
  const fetchTop = async () => {
    let url = `/topaired.json`
    let req = await axios.get(url)
    let res = await req.data
    setTop(res)
  }
  return (
    <>
    <Head>
        
        <title>Animex Stream</title>
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:title" content="Animex Stream | Watch HD Animes." />
        <meta name="keywords" content="animexstream,animex stream,ottoanime,otto anime,watch anime, anime online,animex stream , free anime, english anime, sites to watch anime" />
        <meta name="apple-mobile-web-app-title" content="Otto Anime Stream" />
        <meta property="og:site_name" content="Otto Anime"/>

        <meta property="og:image" content="/ottoanime192.svg " />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:description"
          content="Watch Anime for free in HD quality with English subbed or dubbed."
        />
         <meta
          property="description"
          content="Watch Anime for free in HD quality with English subbed or dubbed."
        />
        
        
      </Head>
    <IndexContainer>


    <Swiper
    modules={[Autoplay]}
    className="header-swiper"
    autoplay={{delay:8000}}
   
  
         
        
        
        breakpoints={{
         1624: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          
            speed:700,
            
          },
        }}
       
      >
        {top?.map((anime,i) => (
      <SwiperSlide key={i}>

          <ImageContainer  style={{"--bg-image":`url(${anime.images.jpg.large_image_url})`}}>
            <div className="absolute lg:w-[80%] 2xl:w-[62%] h-full  p-4">
            <div className="flex flex-col items-start justify-center h-full">
            <h1 className="text-2xl lg:text-4xl text-white drop-shadow-2xl font-black">{anime.title} </h1>
            <div className=" flex justify-between  py-1 px-3 w-full">
              <div className="flex items-center">
            <span className="text-gray-300 flex gap-1 items-center"><span className="mb-[1px]"><AiFillStar color="orange" /></span>{anime.score}</span>
             <span className="text-gray-400 text-small mx-1">•</span>
            <span className="text-gray-400">{anime.year} </span>
            <span className="text-gray-400 text-small mx-1">•</span>
            <span className="text-gray-400 ">{anime.type} </span>
            </div>
            <span className="text-gray-400 hidden lg:block">{anime.rating} </span>
            </div>
            <Description className="text-gray-300 px-2 mt-2 font-extralight">{anime.synopsis}</Description>

            <div className="text-blue-400 flex items-center py-1 px-3 gap-1">
              <span className="text-white mr-1"><AiFillTags /></span>
              <div>
              {anime.genres.map((genre,i) => (
                <span key={i} className=""><span className="text-gray-400">{i ? "," : ""}</span>{genre.name}</span>
              ))}</div>
            </div>
            <div className="flex justify-between gap-1 p-2">
                 

                  <button onClick={() => router.push(`/details/${anime.mal_id}`)} className="py-2 px-4 bg-[#2227] text-gray-200 rounded-sm font-semibold flex  items-center justify-center gap-2  hover:bg-blue-800 hover:scale-105 transition-all ease-in-out">
                  <FaPlay size={16} />
                  <span className="mx-auto">WATCH</span>
                  
                  </button>
                 
                  {/* <button
                  
                    className="py-2 px-4  bg-[#2227] text-gray-200 rounded-full font-semibold flex  items-center gap-2  hover:bg-blue-800  justify-center hover:scale-105 transition-all ease-in-out"
                  >
                    <FaYoutube size={18}  />
                    <span className="mx-auto">TRAILER</span>
                  </button> */}
                </div>
            </div>
            </div>
          </ImageContainer>
          </SwiperSlide>
        ))}
       
      
        
      </Swiper>
      

      <div className={`mx-auto lg:px-[0.7rem] mt-6 lg:mt-0 2xl:px-[3.2rem]`}>
      {myList.length > 0 ? (
        <HomeContainer
          Data={myList}
          heading={"List"}

          to={"myList"}
          swiperId={1}
        />
      ) : (
        ""
      )}
      {watchList.length > 0 ? (
        <HomeContainer
          Data={sortedList}
          heading={"Watch List"}

          to={`recentlyWatched`}
          swiperId={2}
        />
      ) : (
        ""
      )}

      <HomeContainer
        Data={content}
        heading={"Latest Sub Uploads"}
        to={`recentlyadded`}
        swiperId={3}
      />

      <HomeContainer
        Data={dub}
        heading={"Latest Dub Uploads"}
        to={`recentlyadded`}
        swiperId={4}
      />

      <HomeContainer
        Data={onGoingPopular}
        heading={"Popular Ongoing"}
        to={`recentlyadded`}
        swiperId={5}
      />

      <HomeContainer
        Data={dataPopular}
        heading={"Trending"}
        to={"popular"}
        swiperId={6}
      />

      
    </div>
    </IndexContainer>
    </>
  );
}
