import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Container from "../../components/card/Container";
import Layout from "../../components/Layout";
import cheerio from "cheerio";
const axios = require("axios");
import { Discover } from "../../utils/data";


const Recently = () => {
  const [content, setContent] = useState([]);
  const [loading,setLoading] = useState(true)


  const {
    query: { pages },
  } = useRouter();


  useEffect(() => {
    setLoading(true)

    let rec = Fetching()
    
    return () => {
      rec
    }
  }, [pages]);

  const Fetching = async (e) => {

    let d = await axios.get(
      `https://ajax.gogo-load.com/ajax/page-recent-release.html?page=${pages}&type=1`
    );
    d = d.data;
    // console.log(d);
    const myList = [];
    var $ = cheerio.load(d);
    $(".items li").each(function (index, element) {
      let result = {};
      let id = $(this)
        .children("div")
        .children("a")
        .attr("href")
        .split("-episode")[0];
      let title = $(this).children("div").children("a").attr("title");
      let image_url = $(this).find("img").attr("src");
      let episode = $(this).children(".episode").text();

      result = { title, id, image_url, episode };
      myList.push(result);
    });
    setContent(myList);
    setLoading(false)
    console.log(content);
  };

  return (
    <Layout title={`Recently ${pages}`}>
     

      <Container
        Data={content}
        heading={"Recently Added"}
        page={pages}
        Icon={Discover[0].icon}
        len={content.length}
        loading={loading}
      />
 
    </Layout>
  );
};

export default Recently;
