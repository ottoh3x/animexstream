import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import Backdrop from "../BackDrop";
import { motion } from "framer-motion";
import styled from "styled-components";
import { ImPlay2 } from "react-icons/im";
import { useRouter } from "next/router";
import {GrClose} from "react-icons/gr"
import { Triangle } from "react-loader-spinner";

const ImageContainer = styled.div`
position: relative ;
overflow:hidden;
background:black;
display:flex;
width:100%;
justify-content:center;
align-items:center;

height: 181px ;
 &::before {
  content: '';

  position:  absolute ;
  top: 0 ;
  right: 0 ;
  bottom: 0 ;
  left: 0 ;
  filter : blur(8px) brightness(0.4);
  background-image: var(--bg-image) ;
  background-size: cover ;
  
  background-repeat:no-repeat;
  
   
}
  
    
  }
`;

function CardModal({ id, handleClose }) {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchData();
  }, []);

  const fetchData = async () => {
    let url = `https://ottodb.vercel.app/api/anime/${id}`;
    let req = await fetch(url);
    let res = await req.json();
    setData(res);
    setLoading(false)
  };

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        initial={{ y: "-100vh" }}
        animate={{
          y: 0,
          transition: {
            duration: 0.1,
            type: "spring",
            stiffness: 130,
            damping: 15,
          },
        }}
        onClick={e => e.stopPropagation()}
        exit={{y:"100vh"}}
        className="w-full max-w-[650px] bg-[#060606] h-full max-h-[90%] mx-auto shadow-2xl mt-[5rem] overflow-y-scroll scroll-smooth text-white	 cursor-default my-12"
      >
        {loading ? (
         <div className="h-full w-full flex justify-center items-center ">
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


        <div className=" flex flex-col gap-3 w-full p-1">
          <div className="overflow-hidden">
            <ImageContainer style={{ "--bg-image": `url(${data?.image_url})` }}>
              <ImPlay2
                onClick={() => data?.status !== "Not yet aired" && router.push(`/watching/${data.anime_id}/1`)}
                size={62}
                className="relative hover:scale-105 hover:text-white cursor-pointer transition-all duration-300"
                color="#e5e2e2"
              />
              <AiOutlineClose onClick={handleClose} color="white" size={24} strokeWidth={2.5} className="absolute cursor-pointer hover:scale-105 top-2 right-2 font-black"/>
            </ImageContainer>
          </div>
          <div className="relative px-4">
            <div className="flex justify-between w-full items-center">
            <h1 className="font-bold text-3xl text-gray-200">{data?.title}</h1>
            <span>{data?.type}</span>

            </div>
            <div className=" text-gray-400 flex justify-between">
              <div className="flex gap-3 items-center">
                <div className="flex gap-1 items-center">
                  <span>
                    <AiFillStar color="orange" />
                  </span>
                  {data?.score}
                </div>
                <span>{data?.duration}</span>
                <span className="text-gray-300">{data?.status}</span>
                
                
              </div>
              <span>{data?.rating}</span>
            </div>
          </div>
          <div className="px-2  text-left">
            <p className="px-2 text-gray-300 font-light">{data?.synopsis}</p>
          </div>
        </div>
      )}
      </motion.div>
    </Backdrop>
  );
}

export default CardModal;
