import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { AiOutlineExclamation } from "react-icons/ai";
import { useEffect, useState } from "react";
import Image from "next/image";
import CardModal from "./CardModal";
import { ImPlay2 } from "react-icons/im";
import {
  addToMyList,
  removeFromMyList,
} from "../../redux/actions/myLIstDataAction";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHeart } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
const MovieWrapper = styled.a`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  border-radius: 0.8rem;
  background-color: transparent;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    transform: scale(1.03);

    ::after {
      transform: scaleY(1);
      opacity: 1;
    }
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.8rem;
    transform: scaleY(0);
    transform-origin: top;

    opacity: 0;
    z-index: -99;
    box-shadow: 0rem 2rem 5rem rgba(0, 0, 0, 0.2);
    transition: all 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`;

const Episode = styled.span`
  padding: 0.3rem 0;
  color: #878080;
`;

const MovieImg = styled.div`
  width: 100%;
  max-height: 100%;
  object-fit: "cover";
  transform : scale(1);
  // filter: drop-shadow(2px 4px 6px black);

  border-radius: 0;
  
  // transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
  // &:hover {
  //   filter: brightness(0.9);
  // }


  &::after {
    content: "";
  position: absolute;
  top: auto;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  opacity: 0;
  background: rgba(22,22,22,.5);
  z-index: 1;
  pointer-events: none;
  }

   &:hover:after {
      
            opacity: 1;
       
    }
    
  }

 
 
`;

const Title = styled.span`
  width: 100%;
  overflow: hidden;
  display: block;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 10px;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // border: 1px #ffffff0f solid;

  border-top: none;
  width: 100%;
  // background: #ffffff0f;
  padding: 0.5rem 0;
  padding-bottom: 3px;
  color: white;
  background: #141313;
  filter: drop-shadow(2px 4px 6px black);
`;
const PlayButton = styled.span`
  z-index: 9999;
  &::after {
    content: "";
    width: 60px;
    height: 60px;
    margin-top: -30px;
    margin-left: -30px;
    border-radius: 50%;
    background: linear-gradient(
      243deg,
      rgb(255 118 0) 0,
      rgb(255 183 21) 100%
    ) !important;
    opacity: 0;
    z-index: 2;
  }
`;

const Msg = ({ title, message }) => {
  return (
    <div className="flex flex-col">
      <span>
        <span className="font-bold text-white">{title}</span> {message}
      </span>

      <span className="text-blue-800 text-xl "></span>
    </div>
  );
};

const Card = ({
  title,
  id,
  url,
  heading,
  image_url,
  episode,
  released,
  latest,
  animeImg,
  animeTitle,
  animeId,
  selected,
}) => {
  // const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);

  const { myList } = useSelector((state) => state);

  const theme = useSelector((state) => state.theme);
  useEffect(() => {
    const current = myList.filter((item) =>
      id ? item.id == id : item.id == url,
    );
    current.length > 0 ? setClick(true) : setClick(false);
  }, [click]);

  const handleClick = () => {
    if (click) {
      setClick(false);
      dispatch(removeFromMyList(url || id || animeId));
      toast.info(<Msg title={title} message="Was Removed From Your List" />);
    } else {
      dispatch(
        addToMyList({
          id: url || id || animeId,
          image_url: image_url,
          title: title,
          released: released?.replace("Released: ", "") || "",
        }),
      );
      setClick(true);
      toast.info(<Msg title={title} message="Was Added To Your List" />);
    }
  };
  return (
    <>
      <MovieWrapper
        className={`relative ${theme.card.text} ${theme.card.bghover} items-center rounded-xl w-full text-center justify-start flex flex-col  `}
        card={theme.card}
      >
        {/* <MovieImg
            className="w-full object-cover rounded-xl h-[11rem]  xl:h-70 md:h-72 lg:h-66"
            lazy="loading"
            src={image_url}
            alt={title}
          > */}

        <MovieImg
          id="card"
          className=" group w-full object-cover rounded-xl  hover:after:opacity-1 cursor-pointer   h-[11rem] md:h-[14rem] lg:h-[15.2rem] flex items-center justify-center  xl:h-[16rem]  2xl:h-[15.5rem] 	 "
        >
          {/* <div style={{
              backgroundImage:`url(${image_url})`,
              backgroundSize:'cover',
              height:"100%",
              boxShadow:"grey 0px 11px 0px -10px inset, #111 0px -64px 50px -10px inset"
            }}></div> */}

          <Link
            href={
              episode
                ? `/watching/${id.replace("/", "")}/${episode
                    .replace("Episode", "")
                    .replace(" ", "")}`
                : heading === "My List" ||
                  heading === "List" ||
                  heading === "Recommended Animes" ||
                  heading === "Recommended" ||
                  heading === "Related"
                ? `/details/${id || animeId}`
                : `/details/${url}`
            }
          >
            <div className="">
              <PlayButton
                id="info"
                className="relative invisible group-hover:visible"
              >
                <ImPlay2 size={54} color="white" />
              </PlayButton>
              <Link
                href={
                  episode
                    ? `/watching/${id.replace("/", "")}/${episode
                        .replace("Episode", "")
                        .replace(" ", "")}`
                    : heading === "My List" ||
                      heading === "List" ||
                      heading === "Recommended Animes" ||
                      heading === "Recommended" ||
                      heading === "Related"
                    ? `/details/${id || animeId}`
                    : `/details/${url}`
                }
              >
                <div>
                  <Image
                    src={image_url || animeImg || "/ss.png"}
                    layout="fill"
                    objectFit="cover"
                    alt={title || animeTitle}
                    title={title || animeTitle}
                  />
                </div>
              </Link>
            </div>
          </Link>

          {heading === "Popular Ongoing" ||
          heading === "Trending" ||
          heading === "Popular" ||
          heading === "Movies" ||
          heading === "New Season" ||
          heading === "Showing Results for" ||
          heading === "Genres" ||
          heading === "Related" ||
          heading === "Recommended Animes" ||
          heading === "My List" ||
          heading === "List"
          ? (
            <div className=" text-white bg-[#000000a3] absolute bottom-0 py-1 z-50 flex justify-between w-full px-1">
              {click ? (
                <span
                  onClick={handleClick}
                  className="hover:scale-105 text-red-600"
                >
                  <FaHeart size={22} color="red" />
                </span>
              ) : (
                <span
                  onClick={handleClick}
                  className="cursor-pointer hover:scale-105 hover:text-red-600"
                >
                  <FaHeart size={22} />
                </span>
              )}
              <span
                onClick={selected}
                className="p-1 cursor-pointer border-white border-[2px] hover:scale-105 rounded-full"
              >
                <AiOutlineExclamation strokeWidth={2} color="white" />
              </span>
            </div>
          ) : null}
        </MovieImg>

        <DetailsWrapper className="">
          <Link
            href={
              episode
                ? `/watching/${id.replace("/", "")}/${episode
                    .replace("Episode", "")
                    .replace(" ", "")}`
                : heading === "My List" ||
                  heading === "List" ||
                  heading === "Recommended Animes" ||
                  heading === "Recommended"
                ? `/details/${id}`
                : `/details/${url}`
            }
          >
            <Title
              title={title || animeTitle}
              className="text-[13px] md:text-lg hover:text-blue-500 cursor-pointer"
            >
              {title || animeTitle}
            </Title>
          </Link>
          {heading == "Popular" ||
          heading == "Trending" ||
          heading == "New Season" ||
          heading == "Genres" ||
          heading == "Showing Results for" ||
          heading == "Movies" ||
          heading == "Recommended Animes" ||
          heading == "Recommended" ? (
            <Episode className="text-[13px] md:text-md">
              {heading == "Recommended Animes" || heading == "Recommended"
                ? "Year: " + released
                : released}{" "}
            </Episode>
          ) : (
            ""
          )}
          {heading == "Recently Added" ||
          heading == "Latest Dub Uploads" ||
          heading == "Latest Sub Uploads" ? (
            <>
              <Episode>{episode}</Episode>
            </>
          ) : (
            ""
          )}
          {heading == "Watch List" || heading == "Recently Watched" ? (
            <>
              <Episode>{"Episode " + episode}</Episode>
            </>
          ) : (
            ""
          )}
          {heading == "Popular Ongoing" ? (
            <>
              <Episode>
                {"Latest: "}
                <span className="text-gray-400">{latest}</span>
              </Episode>
            </>
          ) : (
            ""
          )}
        </DetailsWrapper>
      </MovieWrapper>
      <AnimatePresence>
        {/* {selected && 
    <CardModal id={url} handleClose={(e) => {
      
      setSelected(false);
    
    }}/>
    } */}
      </AnimatePresence>
    </>
  );
};

export default Card;
