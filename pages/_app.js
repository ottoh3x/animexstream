import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../components/nav/Navbar"));
const Contact = dynamic(() => import("../components/Contact"));
const Footer = dynamic(() => import("../components/Footer"));

import "../styles/globals.css";
import { PersistGate } from "redux-persist/integration/react";
import { Store, Persistor } from "../redux/store";
import { Provider, useSelector } from "react-redux";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import countapi from "countapi-js";



import Sidebar from "../components/sidebar/sidebar";
import NextProgress from "next-progress";

import "../styles/svg.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const Msg = ({ resumeId }) => {
  return (
    <div className="flex flex-col">
      <span>You were watching</span>
      <span className={"uppercase font-bold text-xl text-gray-200"}>
        {resumeId[0]?.split("-").join(" ")}
      </span>
      <span>
        To Continue Press <span className="text-yellow-300 text-xl ">here</span>
      </span>
    </div>
  );
};

//  if (
//         typeof window !== "undefined" &&
//         typeof window.navigator !== "undefined" &&
//         typeof navigator !== "undefined" &&
//         navigator.userAgent
//     ) {
//         const disableDevtool = require("disable-devtool");
//         disableDevtool();
//     }
const App = ({ Component, pageProps }) => {
  const [showContact,setShowContact] = useState(false)
  const [visit, setVisit] = useState(0);
  const { theme, resumeId } = useSelector((state) => state);
  const router = useRouter();
  useEffect(() => {
    console.log(
      "%c OTTO ANIME! ",
      "background: #222; color:#4198db ;font-size:50px"
    );
    localStorage.removeItem("persist:root");
    if (resumeId) if (resumeId) toast.info(<Msg resumeId={resumeId.data} />);
    countapi
      .update("axstream.com", "b8156dc8-31b0-4730-8bce-3d467554c469", 1)
      .then((result) => {
        setVisit(result.value);
      });
  }, []);
  return (
    <div className={`${theme.background} h-full `}>
      

      <Sidebar visit={visit} />
      <div className="flex justify-center">
        <Navbar visit={visit} />

         <Component {...pageProps} />
      </div>
      <ToastContainer
        position={"top-center"}
        onClick={() =>
          router.push(`/watching/${resumeId.data[0]}/${resumeId.data[1]}`)
        }
        autoClose={5000}
        transition={Flip}
        draggablePercent={30}
      />
      
<Footer contact={() => setShowContact(!showContact)} />
<Contact showContact={showContact} hideContact={(e) => {
  e.stopPropagation();
  setShowContact(false)
  }}/>
    </div>
    

  );
};

const MYapp = ({ Component, pageProps }) => (
  <Provider store={Store}>
    <Head>
    <link rel="icon" href={"/kan.jpg"} />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:title" content="AniMex Stream | Watch HD Animes." />
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
              <PersistGate loading={null} persistor={Persistor}>
           
            <NextProgress delay={300} height={3} options={{ showSpinner: false }} /> 
            <App Component={Component} pageProps={pageProps} />
      </PersistGate>
            


  </Provider>
);
export default MYapp;
