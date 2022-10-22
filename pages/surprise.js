import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailsContainer from "../components/Details/detailsContainer";
import Layout from "../components/Layout";
import { URL } from "../utils/URLS";
import Head from "next/head";
import axios from "axios"
import {ThreeDots} from 'react-loader-spinner'


const Surprise = () => {
  // const { data } = useSelector((state) => state);
  const [data,setData] = useState({})
  const [mal,setMal] = useState()
  const [loading,setLoading] = useState(true)
 
  useEffect(() => {
    setLoading(true)
    
      let det = fetchData();
      

      return () => {
        det
      }   
  }, []);

  
      
  
  

  const fetchData = async () => {
    let url = `https://ottodb.vercel.app/api/suprise`
    let req = await fetch(url)
    let res = await req.json()
    setData(res)
    console.log(res)
    setLoading(false)
    
  }

  console.log(data)

  return (
    
    <div className="w-full justify-center items-center min-h-screen mx-auto lg:h-full mt-0 md:mt-[4rem] overflow-hidden">
      <Head>
        <title>{data?.title}</title>
        <meta property="og:title" content={data?.title} key={data?.title} />

        <meta property="og:description" content={data?.plot_summary} />
      </Head>
    {loading ? (
      <div className="h-screen w-full flex justify-center items-center ">
      <ThreeDots 
   height="110" 
   width="110" 
   radius="9"
   color="#2A36F3" 
   ariaLabel="three-dots-loading"
   wrapperStyle={{}}
   
   visible={true}
    /> </div>
    ) : (

      <DetailsContainer id={data?.mal_id} data={[]} mal={data}/>
    )}
    </div>
    
  );
};

export default Surprise;
