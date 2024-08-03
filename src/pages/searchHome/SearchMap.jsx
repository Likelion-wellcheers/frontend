import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { MapModal } from '../../component/modal/MapModal';

const { kakao } = window;


export const SearchMap = () => {
  //map 객체를 담기
  const [mymap, setMymap] = useState({});
  const [load, setLoad] = useState(false); // 지도 로드 여부..

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

}, []);


  return (
    <>
        <Container>
          <MapModal mymap={mymap} load={load} />
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