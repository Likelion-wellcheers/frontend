import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { MapModal } from '../../component/modal/MapModal';
import { useLocation } from 'react-router-dom';

const { kakao } = window;


export const SearchMap = () => {
  //map 객체를 담기
  const [mymap, setMymap] = useState({});
  const [load, setLoad] = useState(false); // 지도 로드 여부..
  const location = useLocation();
  const { city_cd } = location.state || {}; // 추천해줄 지역 코드(이전 필터링 단계에서 받아옴)
  const [cityCodes, setCityCodes] = useState([]); // 추천해줄 지역코드 상태, mapModal에 넘겨줄것임

  useEffect(()=>{
    // MapModal 에 넘겨주기 전에 instance가 완전히 생성되었는지 확인해야함.
      const createMapInstance = async() => {
        var mapContainer = document.getElementById('map');
        var mapOptions = {
          center: new kakao.maps.LatLng(36.3504119, 127.3845475),
          level: 12
        }
        var map =  await new kakao.maps.Map(mapContainer, mapOptions);
        setMymap(map);
      }
      createMapInstance();
      setLoad(true); // 로드 되었는지에 따라 자식 컴포넌트에서 비동기적으로 실행되도록

      if(city_cd){
        setCityCodes(city_cd);
      }
}, [city_cd]);


  return (
    <>
        <Container>
          <MapModal mymap={mymap} load={load} cityCodes={cityCodes}/>
          <MapContainer id="map"></MapContainer>
        </Container>
  </>
  )
};

const Container = styled.div`
  width: 100%;
  height: 92vh;
  display: flex;
  flex-direction: row;
`

const MapContainer = styled.div`
  width: 180%;
  height: 92vh;
`