import { useState } from "react";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import {FaArrowLeft,FaDiscord,FaDonate,FaRandom} from "react-icons/fa";
import Toggle from "../nav/Toggle";

import Sidenav from "./sidenav";
import Search from "./search";
import Image from "next/image";
import { useRouter } from 'next/router'

import Link from "next/link";
const Sidebar = ({ visit }) => {

  const { theme } = useSelector((state) => state);
  const [show, setShow] = useState(false);
  const router = useRouter()


  return (
    <>
      <div
        className={`${theme.nav} fixed w-full top-0 py-8 px-5 shadow-2xl justify-between z-50  `}
      >
        <Sidenav
          visit={visit}
          onClick={() => {
            setShow(false);
          }}
          show={show}
        />

        <div id="sidemenu" className=" px-4 flex justify-center relative items-center  w-full ">
          <Link href="/">
            <div
              className={`${theme.text.selected} lg:hidden absolute cursor-pointer`}
            >
              <Image
                width={140}
                height={40}
                src={
                  theme.theme == "dark"
                    ? "/animexlogodarksidebar.svg"
                    : "/animexlogolightsidebar.svg"
                }
              />
            </div>
          </Link>
          {router.asPath !== "/" && (
            <>


          <GiHamburgerMenu
            size={36}
            onClick={() => {
              setShow(true);
            }}
            className={`  cursor-pointer ${theme.text.selected}  absolute left-0  p-1   `}
          />
          {/* <FaArrowLeft */}
          {/*   size={33} */}
          {/*   onClick={() => router.back()} */}
          {/*   className={`cursor-pointer ${theme.text.selected}  absolute left-[2.4rem] rounded-full p-1  `} */}
          {/* /> */}


          </>
          )}
          <div className={`absolute ${router.asPath !== "/" ? "left-0" : "left-[3rem]"} hidden lg:flex  gap-2`}>
          <img src={`/kan.jpg`} className="h-10 w-10 rounded-full object-cover" />
            <h1 id='title' 
          onClick={() => router.push('/')} 
          className={`cursor-pointer ${theme.text.selected}  items-center text-[27px] spacing-[1px] text-white font-black `}>
          <span className="text-blue-800  font-black">A
          </span>
          NIMΞX</h1>
          </div>
          
          <GiHamburgerMenu
            size={36}
            onClick={() => {
              setShow(true);
            }}
            className={` cursor-pointer ${theme.text.selected} absolute left-0  p-1  lg:hidden  `}
          />
          <div className="absolute right-0 flex gap-3 items-center">
          <span className="hidden md:flex items-center">
            <Toggle />
          </span>
          
          <FaRandom size={36.5}
            onClick={() => router.push(`/surprise`)}
            className={` cursor-pointer ${theme.text.selected} hidden md:block hover:scale-105 p-1  `} />
          <FaDonate size={36.5}
            className={` cursor-pointer ${theme.text.selected} hidden md:block hover:scale-105  p-1  `} />
          <FaDiscord size={36.5}
          onClick={() => alert("https://discord.gg/uEAKwRrFpn")}
           className={` cursor-pointer ${theme.text.selected} hidden md:block hover:scale-105    p-1  `} />
          
           
          
          </div>
          <Search size={26}/>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
