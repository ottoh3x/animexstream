import React, { useEffect, useState } from 'react'
import Container from '../components/card/Container';
import Layout from '../components/Layout';

function Recommended() {

    const [data,setData] = useState([])

    useEffect(() => {
        fetchRecommended();
    
    },[])

    

    function getMultipleRandom(arr, num) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
      
        return shuffled.slice(0, num);
      }
      
      const arr = data;
      console.log(getMultipleRandom(arr,10))
      console.log(getMultipleRandom(arr,10))

    const fetchRecommended = async () => {
        let req = await fetch('/recommended.json')
        let res = await req.json()
        setData(res)

    }
      return (
        <Layout title={"Recommended Animes"}>
        
          <Container Data={data} heading={"Recommended Animes"}  />
       
      </Layout>
  )
}

export default Recommended