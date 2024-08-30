import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { fetchHome } from '../apis/recommend';
import { Banner } from '../component/home/Banner';
import { Section } from '../component/home/Section';
import { Article } from '../component/home/Article';


export const Home = () => {
  const [magzineData, setMagzineData] = useState([]);
  const [regionData, setRegionData] = useState([]);

  useEffect(()=>{
    const getHome = async() => {
      const result = await fetchHome();
      setRegionData(result.region_list);
      setMagzineData(result.magazine_list);
    }
    getHome();
  },[]);


  return (
    <>
    <Container>
        <Banner />
        <Section data={regionData}/>
        <Article data={magzineData}/>  
    </Container>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

