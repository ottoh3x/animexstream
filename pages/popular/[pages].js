import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/card/Container";
import Layout from "../../components/Layout";
import { asyncDataAction } from "../../redux/actions/asyncDataAction";
import { URL } from "../../utils/URLS";
import { Discover } from "../../utils/data";
import {ThreeDots} from 'react-loader-spinner'
import useSWRImmutable from "swr/immutable"


import axios from "axios"
import useSWR from "swr";




const fetcher = async (url) => {
   
  let req = await fetch(url);
  let res = await req.json();
  return res;
};

const Popular = () => {

  const [loading,setLoading] = useState(false)
  const router = useRouter();
  const { pages } = router.query;
  let url = `https://ottodb.vercel.app/api/popular/${pages}`
  const { data, error } = useSWR(pages ? url : null, fetcher,{
        revalidateOnFocus: false,
        revalidateIfStale: false,
        // revalidateOnReconnect: false, // personally, I didn't need this one
    });

  console.log(data)

  // const { data } = useSelector((state) => state);
  // const [data,setData] = useState([])
 
  const dispatch = useDispatch();
  

  

  useEffect(() => {

    
  }, [pages]);

  
// const fetchData = async () => {
//     var PopularURL = URL.POPULAR + pages;
//     let req = await axios.get(PopularURL)
//     let res = req.data
//     setData(res)
//   setLoading(false)
// }

  return (
    <Layout title={`Popular ${pages}`}>
      {/* {loading ? (
        <div className="h-screen w-full flex justify-center items-center ">
        <ThreeDots 
     height="110" 
     width="110" 
     radius="9"
     color="#1C25B2" 
     ariaLabel="three-dots-loading"
     wrapperStyle={{}}
     
     visible={true}
      /> </div>
      ) : ( */}

      <Container
        Data={data}
        heading={"Popular"}
        Icon={Discover[1].icon}
        page={[pages]}
        len={data?.length}
        loading={loading}
      />
      {/* )} */}
    </Layout>
  );
};

export default Popular;
