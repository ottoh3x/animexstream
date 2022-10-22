import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

const NotFound = () => {
  const { theme } = useSelector((state) => state);
  const { page } = useRouter();
  return (
    <div className={` flex flex-col h-screen  w-full text-lg`}>
      <div
        className={`h-full ${theme.text.notselected} flex flex-col justify-center items-center`}
      >
        <div className="w-full flex  flex-col justify-start items-center">
          <img
            width={400}
            src={
              theme.theme == "dark"
                ? "https://c4.wallpaperflare.com/wallpaper/976/117/318/anime-girls-404-not-found-glowing-eyes-girls-frontline-wallpaper-preview.jpg"
                : "https://i.imgur.com/ZMBgJa4.png"
            }
          />
        </div>
        <span className="py-4">
          Nothing found for&nbsp;
          <span
            className={`${theme.text.selected} capitalize text-xl font-bold`}
          >
            {page?.[0]}
          </span>
        </span>
      </div>
    </div>
  );
};

export default NotFound;
