import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/card/Container";
import Layout from "../../components/Layout";
import { URL } from "../../utils/URLS";
import {Discover} from "../../utils/data"
import axios from "axios"

const Movies = () => {
  // const { data } = useSelector((state) => state);
  const router = useRouter();
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(true)


  const { pages } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true)

    const sea = fetchData();

    return () => {
      sea
    }
  }, [pages]);

  const fetchData = async () => {
    var MoviesURL = URL.MOVIES + pages;
    let req = await axios.get(MoviesURL)
    let res = req.data
    setData(res)
  setLoading(false)
}
  return (
    <Layout title={"Movies"}>
     

      <Container Data={data} heading={"Movies"} Icon={Discover[1].icon} page={[pages]} len={data.length} loading={loading}/>
     
    </Layout>
  );
};

export default Movies;
