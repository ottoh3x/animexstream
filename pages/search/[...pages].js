import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/card/Container";
import Layout from "../../components/Layout";
import { asyncDataAction } from "../../redux/actions/asyncDataAction";
import { URL } from "../../utils/URLS";
import { FaSearch } from "react-icons/fa";
import {ThreeDots} from 'react-loader-spinner'
import axios from "axios"

const Search = () => {
  // const { data } = useSelector((state) => state);
  const [loading,setLoading] = useState(true)
  const [data,setData] = useState(true)
  const {
    query: { pages },
  } = useRouter();
  const dispatch = useDispatch();


  useEffect(() => {
    setLoading(true)

    const sear = fetchData();

    return () => {
      sear
    }
  }, [pages]);

  const fetchData = async () => {
    const SEARCHURL = URL.SEARCH + pages.join("/");
    let req = await axios.get(SEARCHURL)
    let res = req.data
    setData(res)
  setLoading(false)
}
  return (
    <Layout title={pages?.[0]}>
      {loading ? (<div className="h-screen w-full flex justify-center items-center ">
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

      <Container
        Data={data}
        heading={"Showing Results for"}
        page={pages}
        Icon={FaSearch}
        len={data.length}
      />
    )}
    </Layout>
  );
};

export default Search;
