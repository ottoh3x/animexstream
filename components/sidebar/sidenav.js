import NavContainer from "../nav/nav_container/navcontainer";
import { Discover, Genre } from "../../utils/data";
import Toggle from "../nav/Toggle";
import { useSelector } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect } from "react";
import {motion,AnimatePresence} from "framer-motion"
import Backdrop from "../BackDrop";
const Sidenav = ({ onClick, show, visit }) => {
  const { theme } = useSelector((state) => state);
  useEffect(() => {
    var Mymenu = document.getElementById("sidemenu");
    document.addEventListener("click", function (event) {
      var isClicked = Mymenu.contains(event.target);
      if (!isClicked) onClick();
    });
  }, []);
  return (
    
    <AnimatePresence>
      
  
  {show && (
    <Backdrop onClick={onClick}>
    <motion.div
    initial={{x:"-100vh"}}
    animate={{x:0,transition:{duration:0.2}}}
    exit={{x:"-100vh"}}
    
      className={` fixed  
        flex  overflow-y-scroll w-full lg:w-[32vh] 
      h-full left-0 top-0 z-50  
        ${theme.nav}
       transition-all duration-900 ease-out shadow-2xl`}
    >
      <div
        className={`flex flex-col w-full space-x-2 m-4 whitespace-nowrap ${theme.nav}`}
      >
        <div className=" flex w-full justify-between items-center">
          <Toggle />
          

          <AiOutlineCloseCircle
            onClick={onClick}
            size={35}
            style={{ color: `${theme.detailsButton.text}` }}
            className={` cursor-pointer  rounded-full p-1  `}
          />
        </div>
        <a href="https://www.buymeacoffee.com/ottoprogrammer" className="flex justify-center" rel="noreferrer"
          target="_blank">
      <img src="/coffe1.svg" className="pt-[1rem] cursor-pointer"/>
      </a>

        <NavContainer links={Discover} heading={"Discover"} />
        <NavContainer links={Genre} heading={"Genres"} />
        
        <span
          className={`${theme.text.notselected} text-lg pb-10 px-4 w-full justify-start  flex items-center `}
        >
          Visits:&nbsp;
          <span className={`${theme.text.selected} text-xl font-bold`}>
            {visit}
          </span>
        </span>
      </div>
    </motion.div>
    </Backdrop>
  )}
  </AnimatePresence>
  )
};
export default Sidenav;
