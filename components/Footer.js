import React from "react";
import { BiMessage } from "react-icons/bi";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { useSelector } from "react-redux";
import {SiBuymeacoffee} from "react-icons/si"

function Footer({ contact }) {
  const { theme } = useSelector((state) => state);

  return (
    <footer className="p-2   md:px-6 md:py-4 mt-6 relative">
      <div>
      <div className="flex flex-col  items-center justify-center relative z-[1]">
          
          <img src={`/kan.jpg`} className="h-[4rem] w-[4rem] rounded-full object-cover" />
          <h1
            id="title"
            onClick={() => router.push("/")}
            className={`flex cursor-pointer  items-end text-[30px] spacing-[1px] text-white font-black `}
          >
            <span className="text-blue-800  font-black">A</span>
            NIMΞX
          </h1>


      
        <div className="flex gap-1">
           <span className="rounded-full border-[2px] cursor-pointer border-white p-2 hover:bg-blue-700 transition-all ease-in-out duration-500 hover:-translate-y-1 text-[#ffffff]"><SiBuymeacoffee size={18}/></span>
          <span className="rounded-full border-[2px] cursor-pointer border-white p-2 hover:bg-blue-700 transition-all ease-in-out duration-500 hover:-translate-y-1 text-[#ffffff]"><FaDiscord size={18}/></span>
          <span className="rounded-full border-[2px] cursor-pointer border-white p-2 hover:bg-blue-700 transition-all ease-in-out duration-500 hover:-translate-y-1 text-[#ffffff]"><FaGithub size={18}/></span>
          <span onClick={contact} className="rounded-full border-[2px] cursor-pointer border-white p-2 hover:bg-blue-700 transition-all ease-in-out duration-500 hover:-translate-y-1 text-[#ffffff]"><BiMessage size={18}/></span>
        </div>
      </div>
      <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-400 lg:my-6 z-[1] relative" />
      <div className="flex flex-col gap-2">
        <span className="block  text-gray-200 text-center z-[1]  relative">
          Animex does not store any files on our server, we only linked to the
          media which is hosted on 3rd party services.
        </span>

        <span className="block text-sm text-gray-400 text-center z-[1] relative">
          © 2022{" "}
          <a href="#" className="hover:underline">
            AnimexStream™
          </a>
          . All Rights Reserved.
        </span>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
