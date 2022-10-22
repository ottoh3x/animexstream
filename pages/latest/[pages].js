import Layout from "../../components/Layout";
import Container from "../../components/card/Container";
import { useEffect, useState } from "react";
import cheerio from "cheerio";
const axios = require("axios");
import { useRouter } from "next/router";
import { AiFillPlayCircle } from "react-icons/ai";


// export async function getServerSideProps(context) {
//   let {pages} = context.params
//   let d = await axios.get(
//     `https://ajax.gogo-load.com/ajax/page-recent-release.html?page=${pages}&type=1`
//   );
//   d = d.data;
//   // console.log(d);
//   const myList = [];
//   var $ = cheerio.load(d);
//   $(".items li").each(function (index, element) {
//     let result = {};
//     let url = $(this).children("div").children("a").attr("href");
//     let title = $(this).children("div").children("a").attr("title");
//     let image_url = $(this).find("img").attr("src");
//     let episode = $(this).children(".episode").text();

//     result = { title, url, image_url, episode };
//     myList.push(result);
    
//   });

//   return {
//     props: {
//       data: myList,
//     },
//   };
// }

function Latest() {
  const [content,setContent] = useState([])
  

  const {
    query: { pages },
  } = useRouter();
  useEffect(() => {
    Fetching();
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
      let id = $(this).children("div").children("a").attr("href").split("-episode")[0];
      let title = $(this).children("div").children("a").attr("title");
      let image_url = $(this).find("img").attr("src");
      let episode = $(this).children(".episode").text();

      result = { title, id, image_url, episode };
      myList.push(result);
      
    });
    setContent(myList);
  };
  return (
    <Layout title={"Popular " + pages?.[0]}>
      <Container
        Data={content}
        page={pages}
        Icon={AiFillPlayCircle}
        heading={"Recently Watched"}
        len={content.length}
      />
    </Layout>
  );
}

export default Latest;
