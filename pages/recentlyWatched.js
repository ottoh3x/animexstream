import Link from "next/link";

import { useSelector } from "react-redux";
import Container from "../components/card/Container";
import Layout from "../components/Layout";

export const Emessage = ({ message }) => {
  const { theme } = useSelector((state) => state);
  return (
    <div className="flex flex-col h-screen justify-start items-center">
      <div className="w-full flex h-4/6 justify-center items-center">
        <img
          width={400}
          src={theme.theme == "dark" ? "/404dark.svg" : "/404light.svg"}
        />
      </div>
      <div className=" flex flex-col justify-center items-center w-full">
        <span className={`${theme.text.notselected} text-4xl`}>
          There is nothing to see
        </span>
        {message && (
          <span className={`${theme.text.selected} py-10 font-thin text-lg`}>
            {message}
            <Link href={"/recentlyadded/1"}>
              <span
                className={` text-blue-400 mx-1 cursor-pointer font-bold text-xl `}
              >
                here
              </span>
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

import { Discover } from "../utils/data";
const RecentlyWatched = () => {
  const { watchList } = useSelector((state) => state);
  const sortedList = watchList.sort((a,b) => b.time - a.time);

  console.log(watchList);
  return (
    <Layout title={"My List"}>
      {watchList.length > 0 ? (
        <Container Data={sortedList} heading={"Recently Watched"} Icon={Discover[2].icon} />
      ) : (
        <Emessage message={"Watch Your Favourites Animes"} />
      )}
    </Layout>
  );
};

export default RecentlyWatched;
