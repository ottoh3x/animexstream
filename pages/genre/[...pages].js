import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/card/Container";
import Layout from "../../components/Layout";
import { URL } from "../../utils/URLS";
import { AiFillPlayCircle } from "react-icons/ai";
import axios from "axios"



const Genres = () => {
  // const { data } = useSelector((state) => state);
  const [loading,setLoading] = useState(true)
  const [data,setData] = useState([])


  const {
    query: { pages },
  } = useRouter();
  const dispatch = useDispatch();



  useEffect(() => {
    setLoading(true)

    const pop = fetchData();

    return () => {
      pop
    }
  }, [pages]);

  const fetchData = async () => {
    const GENREURL = URL.GENRES + pages.join("/");
    let req = await axios.get(GENREURL)
    let res = req.data
    setData(res)
  setLoading(false)
}

  return (
    <Layout title={pages?.[0]}>
      

      <Container
        Data={data}
        Icon={AiFillPlayCircle}
        heading={"Genres"}
        page={pages}
        len={data.length}
        loading={loading}
      />

    </Layout>
  );
};

export default Genres;
