import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import dynamic from "next/dynamic";
const WatchingContainer = dynamic(() =>
  import("../../components/watch/watchingContainer")
);
import { asyncDataAction } from "../../redux/actions/asyncDataAction";
const axios = require("axios");

import { URL } from "../../utils/URLS";
const Recently = () => {
  const [data, setData] = useState([]);
  const [anime,setAnime] = useState([]);
  const [frame,setFrame]=useState("")
  const [iframe,setIframe]=useState("")
  const [eps,setEps] = useState([])
  // const { data } = useSelector((state) => state);
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true)
  const [episodesLoading,setEpisodesLoading] = useState(true)
  const [related,setRelated] = useState([])
  const [relatedLoading,setRelatedLoading] = useState(true)
  const animeid = slug && slug[0]




  useEffect(() => {
    setLoading(true)
    setEpisodesLoading(true)
    setRelatedLoading(true)
    let wat = fetchEpisode();
    let dat = fetchData()
    let rel = fetchRelated()
    return () => {
      wat,dat,rel
    }
  }, [animeid]);

  useEffect(() => {
    if(eps?.length > 0) {
    let code = eps?.filter(t => t.epNum == slug?.[1])[0].link?.split("&")[0].split("id=")[1]
    setIframe(`https://animixplay.to/api/live` +
    window.btoa(code + "LTXs3GrU8we9O" + window.btoa(code)))
    }
  
  
  },[slug])
  const split_title = (t) => {
    let s = t.split("-")
    if (s.length >= 2 ) {
      let title = `${s[0]} ${s[1]}`
      return title
    }
    else {
        let title = s[0];
        return title
    }
  }
  const fetchRelated = async () => {
    let url = `https://ottodbapi.vercel.app/animix/search?keyw=${split_title(slug[0])}`
    let req = await axios.get(url)
    setRelated(req.data)
    setRelatedLoading(false)
  }

  const fetchEpisode = async () => {
    let url = `https://ottodbapi.vercel.app/animix/episodes/${slug[0]}`
    let WatchingURL = URL.EPLINK + slug[0] + "/episode/" + slug[1];
    

    let res = await axios.get(url);
    let epCode = res.data.episodes.filter(t => t.epNum == slug?.[1])[0].link.split("&")[0].split("id=")[1]
    setEps(res.data.episodes)
    setData(res.data);
    setIframe(`https://animixplay.to/api/live` +
    window.btoa(epCode + "LTXs3GrU8we9O" + window.btoa(epCode)))
    setLoading(false)


  };
  const fetchData = async () => {
    
    let url = `https://ottodb.vercel.app/api/anime/${slug[0]}`
    let req = await axios.get(url)
    let res = req.data
    setAnime(res)
    setEpisodesLoading(false)
    



  };

  

  return  (
    <Layout title={"Watching " + slug?.[0]}>
      {slug && <WatchingContainer relatedLoading={relatedLoading} iframe={iframe} related={related} mal={anime} data={data} slug={slug} frame={frame} loading={loading} epLoading={episodesLoading}/>}
    </Layout>
  );
};

export default Recently;
