import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { MapModal } from '../../component/modal/MapModal';

const { kakao } = window;


export const SearchMap = () => {
  //현재 포커스할 위도 경도
  const [coord, setCoord] = useState(('36.0904119', '128.03488'))
  // 현재 포커드 단계
  const [focusLevel, setFocusLevel] = useState('13');

  //map 객체를 담기
  const [mapIns, setMapIns] = useState({});

  useEffect(()=>{
      var container = document.getElementById('map');
      var mapOptions = {
        center: new kakao.maps.LatLng(36.3504119, 127.3845475),
        level: 13
      }
      var mapInstance =  new kakao.maps.Map(container, mapOptions);
      setMapIns(mapInstance);   
}, []);


  return (
    <>
        <Container>
          <MapModal mapIns={mapIns} coord={coord} setCoord={setCoord} focusLevel={focusLevel} setFocusLevel={setFocusLevel}/>
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