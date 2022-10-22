import Link from "next/link";
import { useRouter } from "next/router";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {FaDownload,FaBackward,FaForward,FaLightbulb} from "react-icons/fa";
import {IoPlayForward} from "react-icons/io";
import {useEffect,useRef} from "react"
import {FiRefreshCw} from "react-icons/fi"
import {HiSwitchHorizontal} from "react-icons/hi"

const PB = styled.span`
  &:hover {
    color: blue;
  }
`;

const PageButton = ({ href, children, style }) => {
  const { theme } = useSelector((state) => state);
  return (
    <Link href={href}>
      <PB
        button={theme.button}
        className={`${style} group   p-2 px-1 flex justify-center items-center  cursor-pointer shadow-2xl transition-all duration-100`}
      >
        {children}
      </PB>
    </Link>
  );
};

const EpisodePagiNation = ({ total, heading, episodeid,reload ,change,light}) => {
  const { theme } = useSelector((state) => state);
  const ref = useRef()
  const router = useRouter();
  const pathList = router.asPath;
  const path = pathList?.split("/");
  const page = parseInt(path?.[path?.length - 1]);
  var nxt = "";
  var prev = "";

  
  
  
  
  if (path) {
    const nextPage = page + 1;
    const prevPage = page - 1;
    if (total) {
      nxt =
        page == total
          ? null
          : (path[path.length - 1] = nextPage) && path.join("/");
      prev =
        page === 1
          ? null
          : (path[path.length - 1] = prevPage) && path.join("/");
    } else {
      nxt = (path[path.length - 1] = nextPage) && path.join("/");
      prev = (path[path.length - 1] = prevPage) && path.join("/");
    }
  }
  return (
    <div className={`${theme.text.selected} relative flex flex-row text-gray-200 w-full justify-end items-center p-1 px-3`}>
      <span className=" absolute left-1 p-1 font-black text-[20px]">EP {page}</span>
      <div
        className={`group relative p-2 shadow-lg rounded-sm   font-bold cursor-pointer  hover:text-yellow-500`} onClick={light}
      >
        
          <FaLightbulb size={24} strokeWidth={1} className=""/>
          <span className="hidden group-hover:lg:block  bg-[#1e1b1bc7] text-gray-200 px-[12px] py-[2px] absolute top-[-32px] left-[-1rem]  rounded-md">Light</span>
        
      </div>

      <div
        className={`group relative p-2 shadow-lg rounded-sm   font-bold cursor-pointer  hover:text-blue-600`} onClick={change}
      >
        
          <HiSwitchHorizontal size={24} strokeWidth={1} className=""/>
          <span className="hidden group-hover:lg:block  bg-[#1e1b1bc7] text-gray-200 px-[12px] py-[2px] absolute top-[-32px] left-[-1rem]  rounded-md">Switch</span>
        
      </div><div
        className={`group relative p-2 shadow-lg rounded-sm   font-bold cursor-pointer hover:text-blue-600 `} onClick={reload}
      >
        
          <FiRefreshCw size={20} strokeWidth={4} className=" "/>
          <span className="hidden group-hover:lg:block  bg-[#1e1b1bc7] text-gray-200 px-[12px] py-[2px] absolute top-[-32px] left-[-1rem]  rounded-md">Reload</span>
        
      </div>
      <div
        className={`group relative p-2 shadow-lg rounded-sm   font-bold cursor-pointer  `}
      >
        <a
          href={`https://goload.io/download?id=${episodeid}`}
          rel="noreferrer"
          target="_blank"
          className=""
        >
          <FaDownload size={20} className=" hover:text-blue-600"/>
          <span className="hidden group-hover:lg:block  bg-[#1e1b1bc7] text-gray-200 px-[12px] py-[2px] absolute top-[-32px] left-[-2rem]  rounded-md">Download</span>
        </a>
      </div>

      {page === 1 ? null : (
        <PageButton style={""}  href={prev} pre={true}>
          <FaBackward size={20} className=" hover:text-blue-600"  />
          <span className="hidden group-hover:lg:block  bg-[#1e1b1bc7] text-gray-200 px-[12px] py-[2px] absolute top-[-25px]  rounded-md">Prev</span>
          
        </PageButton>
      )}
      {page != total ? (
        <PageButton style={""} href={nxt} pre={false}>
          
          <FaForward size={20} className=" hover:text-blue-600"  />
          <span className="hidden group-hover:lg:block  bg-[#1e1b1bc7] text-gray-200 px-[12px] py-[2px] absolute top-[-25px]  rounded-md">Next</span>
        </PageButton>
      ) : null}

      
    </div>
  );
};

export default EpisodePagiNation;
