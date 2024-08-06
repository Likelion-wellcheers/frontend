import React, { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import sig from '../../constants/sig.json';
import { fetchCityInfo, fetchCenters } from '../../apis/recommend';

const { kakao } = window;

export const MapModal = ({mymap, load, cityCodes}) => {
    const navigate = useNavigate();
    const [modalPage, setModalPage] = useState(0); // 0: 지역 선택 단계, 1: 인프라 선택 단계
    const [citys, setCitys] = useState({}); // 지역 정보들 모음
    const [cityName, setCityName] = useState([]);
    const [centers, setCenters] = useState({}) // 선택한 지역에 해당하는 시설들
    const [selectedPlace, setSelectedPlace] = useState();  // 사용자가 선택한 지역의 city_code값
    const [selectedCenter, setSelectedCenter] = useState([]); // 사용자가 선택한 인프라 리스트
    const [infrakeys, setInfrakeys] = useState([]);
    const [cityCode, setCityCode] = useState();

    const markerRefs = useRef();
    const polygonRefs = useRef();
    // CenterList에서 해당하는 객체값이 추가로 들어감
    const shuffle = (array) => {
        array.sort(() => Math.random() - 0.5);
      }

    //경도 위도 넘겨주면 마커 찍어주는 함수
    const drawMarker = (lat, lng) => {
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
    const drawPolygon = (data, sigCD) => {
        var polygonList = getPolygon(data, sigCD);
    
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

    const clearMarkers = () => {
        if (markerRefs.current) {
            markerRefs.current.forEach(marker => marker.setMap(null));
            markerRefs.current = []; 
        }
    };

    const clearPolygons = () => {
        if (polygonRefs.current) {
            polygonRefs.current.forEach(polygon => polygon.setMap(null));
            polygonRefs.current = []; 
        }
    };

    const moveFocus = (lat, lng) => {
        var moveLatLon = new kakao.maps.LatLng(lat, lng);
        mymap.setCenter(moveLatLon);
    }


    // 시군구 코드를 넘겨주면 해당하는 폴리곤 리스트 반환
    const getPolygon = (data, sig_cd) => {
        // features 배열에서 조건에 맞는 객체를 찾음
        const feature = data.features.find(
          (feature) => feature.properties.SIG_CD === sig_cd
        );
        // 조건에 맞는 객체가 없으면 null 반환
        if (!feature) {
          return null;
        }
        // 객체가 존재할 경우 coordinates 반환
        return feature.geometry.coordinates[0][0];
      }


      useEffect(()=>{
        if (!markerRefs.current) {
            markerRefs.current = [];
        }
        if (!polygonRefs.current) {
            polygonRefs.current = [];
        }
    
        // 시티코드로 지역 정보를 하나하나 불러오고, 마커와 폴리곤 생성하는 함수
        clearPolygons();
        const getCity = async (city_code) => {
            const result = await fetchCityInfo(city_code); // result 에는 지역코드: {} 형태로 지역정보 들어가있음

            // 키들을 합쳐서 하나의 인프라 키들로, 랜덤으로 섞어서 씀.
            const keyList = result.infraname.concat(result.lifename, result.hobbyname);
            shuffle(keyList);
            result["infrakeys"] = keyList;

            setCitys((prevState)=>({
                ...prevState,
                [city_code]: result
            }));

            drawMarker(result.latitude, result.longtitude);
            drawPolygon(sig, String(city_code));
        }

        // 지도 로드 완료 시 진행하도록
        if(load && mymap && modalPage == 0){
            if (cityCodes && cityCodes.length > 0) {
            // 시티코드 값을 통해 지역 정보 데이터를 불러오고, 지도에 표시하기
            cityCodes.map(element => {
                getCity(element);
            })

        }}
      }, [load, mymap, modalPage]);

    
    //인프라 페이지로 이동
    const handleClick = (city_code, cityName, gugoonName, lat, lng) => {
        setCityName([cityName, gugoonName]);
        // 지도 확대하기 + 이동하기 (포커스)
        // map : 지도창에서 가져온 지도 객체
        setSelectedPlace(city_code);

        const getCenterInfo = async(city_code) => {
            const result = await fetchCenters(city_code);
            setCenters(result);
            if(result.length){
                result.map((center)=>(
                    drawMarker(center.latitude, center.longtitude)
                ));
            }
            setModalPage(1);
        }
        getCenterInfo(city_code);
        mymap.setLevel(4); 
        moveFocus(lat, lng);

        setCityCode(city_code);
        clearMarkers();
        // 시설 마커들 그리기
    }

    // 지역 페이지 이동 (뒤로가기)
    const handleBack = () => {
        if(mymap){
            clearMarkers();
            setModalPage(0);
            moveFocus(36.3504119, 127.3845475)
            mymap.setLevel(12);
        }
    }

    // 담기 버튼 클릭 시
    const handlePut = (id, idx) => {
        // centers 배열의 idx 값을 기준으로 선택됐는지 여부 확인
        const selected = centers[idx];
        const isAlreadySelected = selectedCenter.find(center => center.id === id);
        // 이미 담겨있을 경우 취소
        if (isAlreadySelected) {
            setSelectedCenter(prevState => 
                prevState.filter(center => center.id !== selected.id)
            );
            // 안담겨있을 경우 담기
        } else {
            setSelectedCenter(prevState => [
                ...prevState,
                selected
            ]);
        }
    };

    // 담은 목록 중 클릭 시 해당 title 값에 대해 선택 취소
    // index로 삭제시 오류.. index 가 선택 순서에 따라 바뀌므로
    const handleDelete = (id) => {
        setSelectedCenter(prevState => 
            prevState.filter(center => center.id !== id)
    )};

    const handleCal = () => {
        if (selectedCenter.length > 5) {
            alert("5개 이하로 담아주세요!");
            return;
        }
        navigate('/searchhome/searchmap/CalCost', {state: {selected_center : selectedCenter, city_code: cityCode}});
    }

    const handleDetail = (centerId) =>{
        navigate(`/searchhome/searchmap/centerdetail/${centerId}`);
    }

// 모달 페이지 2개 중 상태에 따라 보여주기
if(!modalPage){
  return (
    <MapContainer>
         <MapContent>
            <MapContentTitle>이런 지역을 추천드려요!</MapContentTitle>
            <MapContentCards>
                {Object.values(citys).map((location)=> (
                    <MapContentCard onClick={()=> handleClick(location.city_code, location.city, location.gugoon, location.latitude, location.longtitude)}>
                        <MapContentCardImg src={location.thumbnail || "/images/default.png"}></MapContentCardImg>
                        <MapContentCardDesc>
                            <MapContentCardTitle>{location.city} {location.gugoon}</MapContentCardTitle>
                            <MapContentCardKeys>
                                {location.infrakeys[0] && <MapContentCardKey>#{location.infrakeys[0]}</MapContentCardKey>}
                                {location.infrakeys[1] &&<MapContentCardKey>#{location.infrakeys[1]}</MapContentCardKey>}
                                {location.infrakeys[2] &&<MapContentCardKey>#{location.infrakeys[2]}</MapContentCardKey>}
                            </MapContentCardKeys>
                        </MapContentCardDesc>
                    </MapContentCard>
                ))}
            </MapContentCards>
        </MapContent>
    </MapContainer>
   
  )}
  else if(modalPage){
    return(
        <CenterContainer>
            <CenterContent>
                <CenterContentDesc>
                    <CenterBackBtn onClick={handleBack}>&lt; &nbsp; 다른지역 보기</CenterBackBtn>
                    <CenterContentTitle>
                        윤경님이 원하는<br/>
                            <CenterContentPlace>{cityName[0]} {cityName[1]}</CenterContentPlace> 이에요!
                    </CenterContentTitle>
                </CenterContentDesc>
                <CenterList>
                    <CenterListDesc>
                        <CenterListDescCon>
                        <CenterListTitle><svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <path d="M10 20.5001C10.663 20.5001 11.2989 20.2367 11.7678 19.7679C12.2366 19.299 12.5 18.6632 12.5 18.0001H7.5C7.5 18.6632 7.76339 19.299 8.23223 19.7679C8.70107 20.2367 9.33696 20.5001 10 20.5001ZM11.2437 1.87387C11.2612 1.70006 11.242 1.52452 11.1875 1.35858C11.1329 1.19264 11.0442 1.03998 10.927 0.91044C10.8098 0.7809 10.6667 0.67736 10.5071 0.606498C10.3474 0.535635 10.1747 0.499023 10 0.499023C9.82532 0.499023 9.65258 0.535635 9.49292 0.606498C9.33325 0.67736 9.19022 0.7809 9.07303 0.91044C8.95584 1.03998 8.8671 1.19264 8.81254 1.35858C8.75798 1.52452 8.7388 1.70006 8.75625 1.87387C7.3434 2.16124 6.07328 2.92807 5.16096 4.04449C4.24863 5.16092 3.75018 6.55833 3.75 8.00012C3.75 9.37262 3.125 15.5001 1.25 16.7501H18.75C16.875 15.5001 16.25 9.37262 16.25 8.00012C16.25 4.97512 14.1 2.45012 11.2437 1.87387Z" fill="black"/>
                        </svg>  &nbsp;원하는 시설을 담아보세요 <CenterListSubTitle> &nbsp;&#40;5개이하&#41;</CenterListSubTitle></CenterListTitle>

                        </CenterListDescCon>
                        
                        <CenterListContents>
                            {selectedCenter&&
                                selectedCenter.map((center, index) => (
                            <CenterListContent
                                key={center.id} onClick={()=> handleDelete(center.id)}>
                                {center.name} &nbsp;X
                            </CenterListContent>
                            ))}
                        </CenterListContents>
                    </CenterListDesc>
                </CenterList>
                <GoCalPageBtn onClick={handleCal}>담기 완료! 여가비용 계산하기</GoCalPageBtn>
                <CenterCards>
                {centers &&
                    centers.map((center, idx)=>{
                        // isSelected는 각 카드에 대해, selectedCenter 안에 들어있는지 여부
                        const isSelected = selectedCenter.some(selectedCenter => selectedCenter.name === center.name);
                        return(
                        <CenterCard>
                            <CenterCardImg onClick={()=>handleDetail(center.id)}
                            src={center.thumbnail || "/images/default.png"} alt="시설사진"></CenterCardImg>
                            <CenterCardDesc>
                                <CenterCardDescCon>
                                    <CenterCardTitle>{center.name}</CenterCardTitle>
                                    <CenterCardSubTitle>{center.address}</CenterCardSubTitle>
                                </CenterCardDescCon>
                                <CenterCardPutBtn key={idx} onClick={()=>handlePut(center.id, idx)}
                                    style={{
                                        background: isSelected ? "linear-gradient(247deg, #BCBDFF 7.5%, #5D5FEF 62.93%)" : "#F4F3FF",
                                        color: isSelected ?  "white" : '#5D5FEF' ,
                                        borderColor: isSelected ? "white" : '#5D5FEF'
                                      }}
                                    >{isSelected ? "취소" : "담기"}</CenterCardPutBtn>
                            </CenterCardDesc>    
                        </CenterCard>)}
                )}
                </CenterCards>
            </CenterContent>
        </CenterContainer>
    )
  }
}

const MapContainer = styled.div`
    width: 100%;
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
    background: #FFF;
    overflow-y: auto;
    z-index: 10;
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    padding: 8%;
`

const MapContent = styled.div`
  margin-top: 38px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
`

const MapContentTitle = styled.div`
  align-self: flex-start;
  display: inline-flex;
  padding: 4px 0px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  border-bottom: 4px solid #5D5FEF;
  margin-bottom: 26px;
  margin-left: 1px;
`

const MapContentCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 35px;
`
const MapContentCard = styled.div`
  border-radius: 8px;
  border: 1px solid var(--Gray-02, #BBB8B8);
  background: #FFF;
  height: 290px;
  width: 430px;
  overflow: hidden;
  cursor: pointer;
`
const MapContentCardImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`
const MapContentCardDesc = styled.div`
  height: 94px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  padding-left: 20px;
`
const MapContentCardTitle = styled.div`
  display: inline-flex;
  padding: 4px 0px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  align-self: flex-start;
`
const MapContentCardKeys = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;  
  margin-top: 5px;
`
const MapContentCardKey = styled.div`
  width: 90px;
  font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  padding: 0px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: rgba(93, 95, 239, 0.12);
  color: #5D5FEF;
  display: flex;
  justify-content: center;
  white-space: nowrap;
  
`

// 아래부터 인프라 페이지 내용
const CenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
    background: #FFF;
    overflow-y: auto;
    z-index: 10;
`
const CenterContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    width: 430px;
    justify-content: center;
    gap: 27px;
    margin-bottom: 30px;
`
const CenterContentDesc = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
`
const CenterBackBtn = styled.button`
    width: 120px;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    border: none;
    background-color: white;
    margin-bottom: 4px;
    color: var(--Gray-01, #615D67);
    cursor: pointer;
    padding-right: 50px;
    white-space: nowrap;
`

const CenterContentTitle = styled.div`
    gap: 4px;
`
const CenterContentPlace = styled.div`
    color: white;
    display: inline-flex;
    padding: 4px 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    border-radius: 4px;
    background: #5D5FEF;
    margin-top: 5px;
`
const CenterList = styled.div`
    border-radius: 4px;
    border: 1px solid var(--Gray-02, #BBB8B8);
    background: #F8F8F8;
    display: flex;
    padding: 12px 24px;
    flex-direction: column;
    gap: 10px;
`

const CenterListDescCon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 5px;
    width: 100%;
    gap: 40px;
    border-bottom: 1px solid var(--Gray-01, #615D67);
    align-self: flex-start;
`

const CenterListDesc = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`
const CenterListTitle = styled.div`
    display: flex;
    align-items: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
`

const CenterListSubTitle = styled.div`
    display: inline-flex;
    color: var(--Gray-01, var(--kakao-logo, #615D67));
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
`

const CenterListContents = styled.div`
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 364px;
    align-items: center;
    align-content: center;
    gap: 12px;
    flex-wrap: wrap;
`
const CenterListContent = styled.div`
    display: flex;
    padding: 4px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 4px;
    border: 1px solid #5D5FEF;
    background: #FFF;
    cursor: pointer;
`
const GoCalPageBtn = styled.button`
    color: var(--White, #FFF);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; 
    display: flex;
    height: 48px;
    width: 430px;
    padding: 4px 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 4px;
    background: linear-gradient(247deg, #BCBDFF 7.5%, #5D5FEF 62.93%);
    border: none;
    cursor: pointer;
`
const CenterCards = styled.div`
    display: flex;
     flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 29px;
`
const CenterCard = styled.div`
    height: 359px;
`
const CenterCardImg = styled.img`
    object-fit: cover;
    height: 280px;
    width: 430px;
    border-radius: 4px;
    cursor: pointer;
`
const CenterCardDescCon = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 340px;
`

const CenterCardDesc = styled.div`
    margin-top: 4px;
    display: flex;
    flex-direction: row;
    margin-left: 10px;
    width: 100%;
`
const CenterCardTitle= styled.div`
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    white-space: nowrap;
`
const CenterCardSubTitle = styled.div`
    color: var(--Gray-01, #615D67);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    width: 100%;
`

const CenterCardPutBtn = styled.button`
    justify-self: flex-end;
    margin-top: 15px;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    display: flex;
    width: 80px;
    height: 33px;
    padding: 4px 12px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 4px;
    color:#5D5FEF;
    background: var(--Sub2, #F4F3FF);
    border: 1px solid #5D5FEF;
    cursor: pointer;
`

