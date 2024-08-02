import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import sig from '../../constants/sig.json';

const { kakao } = window;

export const MapModal = ({mymap, load}) => {
    var marker = null;
    var polygon = null;

    const navigate = useNavigate();
    // 0: 지역 선택 단계, 1: 인프라 선택 단계
    const [modalPage, setModalPage] = useState(0);
    // place - 지역 , Center - 시설
    // const [marker, setMarker] = useState(null);
    // const [polygon, setPolygon] = useState(null);
    const [place, setPlace] = useState([{
        name: '서울특별시 동작구',
        long: '37.5064393',
        lat: '126.963687',
        key: ['중앙대', '대학가', '한강'],
        imageURL: '/images/filterbanner.png',
    },
    {
        name: '경상남도 통영시',
        long: '37.5064393',
        lat: '126.963687',
        key: ['섬도시', '나폴리', '바다'],
        imageURL: '/images/filterbanner.png',
    },
    {
        name: '경기도 화성시',
        long: '37.5064393',
        lat: '126.963687',
        key: ['섬도시', '나폴리', '바다'],
        imageURL: '/images/filterbanner.png',
    }
    ])
    const [centerList, setCenterList] = useState([{
        imageURL : '/images/filterbanner.png',
        title: '까망돌 도서관',
        subtitle: '서울 동작구 서달로 129'
    },{
        imageURL : '/images/filterbanner.png',
        title: '초원떡볶이',
        subtitle: '서울 동작구 서달로 129'
    },{
        imageURL : '/images/filterbanner.png',
        title: '준호떡볶이',
        subtitle: '서울 동작구 서달로 129'
    },{
        imageURL : '/images/filterbanner.png',
        title: '은희떡볶이',
        subtitle: '서울 동작구 서달로 129'
    }])

    // 사용자가 선택한 지역의 id값
    const [selectedPlace, setSelectedPlace] = useState();

    // 사용자가 선택한 인프라 리스트
    // CenterList에서 해당하는 객체값이 추가로 들어감
    const [selectedCenter, setSelectedCenter] = useState([]);


    const temp_sigCD = "11590" // 임시 지역코드. 동작구 꺼
    const temp_sigCD2 = "48220" // 통영
    const temp_sigCD3 = "41590" // 화성시


    //경도 위도 넘겨주면 마커 찍어주는 함수
    const drawMarker = (lat, lng) => {
        var imageSrc = '/images/marker.png', // 마커이미지의 주소입니다    
        imageSize = new kakao.maps.Size(31, 42), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(18, 30)};

        // 지역 마커 찍기
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
        markerPosition = new kakao.maps.LatLng(lat, lng);  //임시 좌표

        marker = new kakao.maps.Marker({
            position: markerPosition, 
            image: markerImage // 마커이미지 설정 
        });
        marker.setMap(mymap);
    }

    // 시군구 코드 넘겨주면 폴리곤 그려주는 함수
    const drawPolygon = (data, sigCD) => {
        var polygonList = getPolygon(data, sigCD);
    
        var polygonPath = [];

        polygonList.forEach(element => {
            polygonPath.push(new kakao.maps.LatLng(element[1], element[0]))
        });

            polygon = new kakao.maps.Polygon({
            path: polygonPath, // 그려질 다각형의 좌표 배열입니다
            strokeWeight: 1, // 선의 두께입니다
            strokeColor: '#b62c91', // 선의 색깔입니다
            strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'longdash', // 선의 스타일입니다
            fillColor: '#f89ef8', // 채우기 색깔입니다
            fillOpacity: 0.3 // 채우기 불투명도 입니다
        });
        polygon.setMap(mymap);
    }   

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
        if(load && mymap && modalPage == 0){
            // 지역 추천에서 폴리곤과 마커 그리기
            drawMarker(37.5064393, 126.963687);
            drawPolygon(sig, temp_sigCD);
        }
      }, [load, mymap, modalPage]);

    
    //인프라 페이지로 이동
    const handleClick = (idx) => {
        // 지도 확대하기 + 이동하기 (포커스)
        // map : 지도창에서 가져온 지도 객체
        setSelectedPlace(idx);
        var level = mymap.getLevel();
        mymap.setLevel(4); 
        setModalPage(1);

        moveFocus(place[idx].long, place[idx].lat)

        marker.setMap(null);
        polygon.setMap(null);

        // 시설 마커들 그리기!
        drawMarker(37.50415, 126.9570);
    }


    // 지역 페이지 이동 (뒤로가기)
    const handleBack = () => {
        if(mymap){
            setModalPage(0);
            moveFocus(36.3504119, 127.3845475)
            mymap.setLevel(12);
        }
    }

    // 담기 버튼 클릭 시
    const handlePut = (idx) => {
        const selected = centerList[idx];
        const isAlreadySelected = selectedCenter.find(center => center.title === selected.title);
        // 이미 담겨있을 경우 취소
        if (isAlreadySelected) {
            setSelectedCenter(prevState => 
                prevState.filter(center => center.title !== selected.title)
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
    const handleDelete = (title) => {
        setSelectedCenter(prevState => 
            prevState.filter(center => center.title !== title)
    )};

    const handleCal = () => {
        navigate('/searchhome/searchmap/CalCost');
    }

    const handleDetail = () =>{
        var centerId = 1; // 임시 시설 아이디
        navigate(`/searchhome/searchmap/centerdetail/${centerId}`);
    }

// 모달 페이지 2개 중 상태에 따라 보여주기
if(!modalPage){
  return (
    <MapContainer>
         <MapContent>
            <MapContentTitle>이런 지역을 추천드려요!</MapContentTitle>
            <MapContentCards>
                {place.map((location, idx)=> (
                    <MapContentCard onClick={()=> handleClick(idx)}>
                        <MapContentCardImg src={location.imageURL}></MapContentCardImg>
                        <MapContentCardDesc>
                            <MapContentCardTitle>{location.name}</MapContentCardTitle>
                            <MapContentCardKeys>
                                <MapContentCardKey>#{location.key[0]}</MapContentCardKey>
                                <MapContentCardKey>#{location.key[1]}</MapContentCardKey>
                                <MapContentCardKey>#{location.key[2]}</MapContentCardKey>
                            </MapContentCardKeys>
                        </MapContentCardDesc>
                    </MapContentCard>
                ))}
            </MapContentCards>
        </MapContent>
    </MapContainer>
   
  )}
  else{
    return(
        <CenterContainer>
            <CenterContent>
                <CenterContentDesc>
                    <CenterBackBtn onClick={handleBack}>&lt; &nbsp; 다른지역 보기</CenterBackBtn>
                    <CenterContentTitle>
                        윤경님이 원하는<br/>
                            <CenterContentPlace>{place[0].name}</CenterContentPlace> 이에요!
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
                                key={index} onClick={()=> handleDelete(center.title)}>
                                {center.title} &nbsp;X
                            </CenterListContent>
                            ))}
                        </CenterListContents>
                    </CenterListDesc>
                </CenterList>
                <GoCalPageBtn onClick={handleCal}>담기 완료! 여가비용 계산하기</GoCalPageBtn>
                <CenterCards>
                {centerList &&
                    centerList.map((card, i)=>{
                        // isSelected는 각 카드에 대해, selectedCenter 안에 들어있는지 여부
                        // 이름으로 비교하기. 인덱스로 비교하면 오류
                        const isSelected = selectedCenter.some(selectedCenter => selectedCenter.title === card.title);
                        return(
                        <CenterCard>
                            <CenterCardImg onClick={handleDetail}
                            src={card.imageURL} alt="시설사진"></CenterCardImg>
                            <CenterCardDesc>
                                <CenterCardDescCon>
                                    <CenterCardTitle>{card.title}</CenterCardTitle>
                                    <CenterCardSubTitle>{card.subtitle}</CenterCardSubTitle>
                                </CenterCardDescCon>
                                <CenterCardPutBtn key={i} onClick={()=>handlePut(i)}
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
  margin-bottom: 38px;
  margin-left: 45px;
`

const MapContentCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
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
  width: 60px;
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
    width: 100%;
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
    width: 100%;
    border-radius: 4px;
    cursor: pointer;
`
const CenterCardDescCon = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const CenterCardDesc = styled.div`
    margin-top: 4px;
    display: flex;
    flex-direction: row;
    margin-left: 10px;
`
const CenterCardTitle= styled.div`
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
`
const CenterCardSubTitle = styled.div`
    color: var(--Gray-01, #615D67);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    width: 100%;
    white-space: nowrap;
`

const CenterCardPutBtn = styled.button`
    justify-self: flex-end;
    margin-left: 210px;
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
