import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailsContainer from "../../components/Details/detailsContainer";
import Layout from "../../components/Layout";
import { asyncDataAction } from "../../redux/actions/asyncDataAction";
import { URL } from "../../utils/URLS";
import Head from "next/head";
import axios from "axios"
import {Triangle} from 'react-loader-spinner'

import useSWR from "swr";


const fetcher = async (url) => {
   
  let req = await axios.get(url);
  let res = req.data
  return res;
};

const Details = () => {
  // const { data } = useSelector((state) => state);
  const [animeData,setAnimeData] = useState({})
  const [loading,setLoading] = useState(false)
  
  const {
    query: { id },
  } = useRouter();
  const dispatch = useDispatch();
  let url = `https://ottodb.vercel.app/api/anime/${id}`
  const { data, error } = useSWR(id ? url : null, fetcher, fetcher,{
        revalidateOnFocus: false,
        revalidateIfStale: false,
        // revalidateOnReconnect: false, // personally, I didn't need this one
    });


  useEffect(() => {
    
      let det = fetchData();
      // let ma = fetchMal()

      return () => {
        det
      }   
  }, [id]);

  const fetchData = async () => {
    if (id) {
      let DETAILURL = URL.DETAILS + id;
      let req = await axios.get(DETAILURL)
      let res = req.data
      console.log(res)
      setAnimeData(res)
      
  }
      
  
  }

  // const fetchMal = async () => {
  //   let url = `https://ottodb.vercel.app/api/anime/${id}`
  //   let req = await axios.get(url)
  //   let res = await req.data
  //   setMal(res)
  //   console.log(res)
  //   setLoading(false)
    
  // }

  console.log(data)

  return (
    
    <div className="w-full justify-center items-center min-h-screen mx-auto lg:h-full mt-0 md:mt-[4rem] overflow-hidden">
      <Head>
        <title>{animeData?.title}</title>
        <meta property="og:title" content={animeData?.title} key={animeData?.title} />

        <meta property="og:description" content={animeData?.plot_summary} />
      </Head>
    {!data ? (
      <div className="h-screen w-full flex justify-center items-center ">
      <Triangle
                  height="110"
                  width="110"
                  radius="9"
                  color="#1C25B2"
                  ariaLabel="triangle-loading"
                  wrapperStyle={{}}
                  visible={true}
    /> </div>
    ) : (

      <DetailsContainer id={data?.anime_id} data={animeData || []} mal={data}/>
    )}
    </div>
    
  );
};

export default Details;
