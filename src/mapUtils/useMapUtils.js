import sig from '../constants/sig.json'
const { kakao } = window;

function useMapUtils() {
    // 시군구 코드를 넘겨주면 해당하는 폴리곤 리스트 반환
    const getPolygon = (sig_cd) => {
      // sig의 features 배열에서 조건에 맞는 객체를 찾음
      const feature = sig.features.find(
        (feature) => feature.properties.SIG_CD === sig_cd
      );
      // 조건에 맞는 객체가 없으면 null 반환
      if (!feature) {
        return null;
      }
      // 객체가 존재할 경우 coordinates 반환
      return feature.geometry.coordinates[0][0];
    }

      const clearMarkers = (markerRefs) => {
        if (markerRefs.current) {
            markerRefs.current.forEach(marker => marker.setMap(null));
            markerRefs.current = []; 
        }
    };

    const clearPolygons = (polygonRefs) => {
        if (polygonRefs.current) {
            polygonRefs.current.forEach(polygon => polygon.setMap(null));
            polygonRefs.current = []; 
        }
    };
    
    //경도 위도 넘겨주면 마커 찍어주는 함수
    const drawMarker = (markerRefs, mymap, lat, lng) => {
      var imageSrc = '/images/marker.png', // 마커이미지의 주소입니다    
      imageSize = new kakao.maps.Size(31, 42), // 마커이미지의 크기입니다
      imageOption = {offset: new kakao.maps.Point(15, 28)};

      // 지역 마커 찍기
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
      markerPosition = new kakao.maps.LatLng(lat, lng);  //임시 좌표

      const marker = new kakao.maps.Marker({
          position: markerPosition, 
          image: markerImage // 마커이미지 설정 
      });
      marker.setMap(mymap);
      markerRefs.current.push(marker);
    }

// 시군구 코드 넘겨주면 폴리곤 그려주는 함수
const drawPolygon = (polygonRefs, mymap, sigCD) => {
    var polygonList = getPolygon(sigCD);

    var polygonPath = [];

    polygonList.forEach(element => {
        polygonPath.push(new kakao.maps.LatLng(element[1], element[0]))
    });

  const polygon = new kakao.maps.Polygon({
        path: polygonPath, // 그려질 다각형의 좌표 배열입니다
        strokeWeight: 1, // 선의 두께입니다
        strokeColor: '#b62c91', // 선의 색깔입니다
        strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'longdash', // 선의 스타일입니다
        fillColor: '#f89ef8', // 채우기 색깔입니다
        fillOpacity: 0.3 // 채우기 불투명도 입니다
    });
    polygon.setMap(mymap);
    polygonRefs.current.push(polygon);
  }   

  // 지도에서 focus 이동시키는 함수
  const moveFocus = (mymap, lat, lng) => {
    var moveLatLon = new kakao.maps.LatLng(lat, lng);
    mymap.setCenter(moveLatLon);
  }

  return {
    clearMarkers,
    clearPolygons,
    drawMarker,
    drawPolygon,
    moveFocus
  };

}

export default useMapUtils;





