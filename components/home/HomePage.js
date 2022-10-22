import dynamic from "next/dynamic";
import cheerio from "cheerio";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Discover } from "../../utils/data";
const HomeContainer = dynamic(() => import("../card/HomeContainer"), {
  ssr: false,
});
// import HomeContainer from "../card/HomeContainer";
const axios = require("axios");

const HomePage = ({content,onGoingPopular,dub,dataPopular}) => {
  


  const { theme, resumeId, myList, watchList } = useSelector((state) => state);
  const sortedList = watchList.sort((a, b) => b.time - a.time);

  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    
  }, []);
 

  return (
    <div className={`mx-auto lg:px-[0.7rem] mt-6 lg:mt-0 2xl:px-[3.2rem]`}>
      {myList.length > 0 ? (
        <HomeContainer
          Data={myList}
          heading={"List"}
          Icon={Discover[2].icon}
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
          Icon={Discover[4].icon}
          to={`recentlyWatched`}
          swiperId={2}
        />
      ) : (
        ""
      )}

      <HomeContainer
        Data={content}
        heading={"Latest Sub Uploads"}
        Icon={Discover[0].icon}
        to={`recentlyadded`}
        swiperId={3}
      />

      <HomeContainer
        Data={dub}
        heading={"Latest Dub Uploads"}
        Icon={Discover[0].icon}
        to={`recentlyadded`}
        swiperId={4}
      />

      <HomeContainer
        Data={onGoingPopular}
        heading={"Popular Ongoing"}
        Icon={Discover[0].icon}
        to={`recentlyadded`}
        swiperId={5}
      />

      <HomeContainer
        Data={dataPopular}
        heading={"Trending"}
        Icon={Discover[1].icon}
        to={"popular"}
        swiperId={6}
      />

      
    </div>
  );
};

export default HomePage;
