import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export const MapModal = ({coord, setCoord, focusLevel, setFocusLevel}) => {
    // 0: 지역 선택 단계, 1: 인프라 선택 단계
    const [modalPage, setModalPage] = useState(0)
    const [place, setPlace] = useState({
        name: '경상남도 통영시',
        lat: '128.433182',
        long: '34.8544227',
        key: ['섬도시', '나폴리', '바다']
    })
    const [infraList, setinfraList] = useState({
        imageURL : 'images/bannerImage.png',
        title: '까망돌 도서관',
        subtitle: '서울 동작구 서달로 129'
    },{
        imageURL : 'images/bannerImage.png',
        title: '까망돌 도서관',
        subtitle: '서울 동작구 서달로 129'
    })
    
    const handleClick = () => {
        setModalPage(1)
    }

    useEffect(()=>
        {console.log(infraList);}
        ,[])

if(!modalPage){
  return (
    <MapContainer>
         <MapContent>
            <MapContentTitle>이런 지역을 추천드려요!</MapContentTitle>
            <MapContentCards>
            <MapContentCard onClick={handleClick}>
                <MapContentCardImg src="/images/filterbanner.png"></MapContentCardImg>
                <MapContentCardDesc>
                <MapContentCardTitle>{place.name}</MapContentCardTitle>
                <MapContentCardKeys>
                    <MapContentCardKey>#{place.key[0]}</MapContentCardKey>
                    <MapContentCardKey>#{place.key[1]}</MapContentCardKey>
                    <MapContentCardKey>#{place.key[2]}</MapContentCardKey>
                </MapContentCardKeys>
                </MapContentCardDesc>
            </MapContentCard>
            <MapContentCard>
                <MapContentCardImg src="/images/filterbanner.png"></MapContentCardImg>
                <MapContentCardDesc>
                <MapContentCardTitle>경상남도 통영시</MapContentCardTitle>
                <MapContentCardKeys>
                    <MapContentCardKey>#섬도시</MapContentCardKey>
                    <MapContentCardKey>#나폴리</MapContentCardKey>
                    <MapContentCardKey>#바다</MapContentCardKey>
                </MapContentCardKeys>
                </MapContentCardDesc>
            </MapContentCard>
            <MapContentCard>
                <MapContentCardImg src="images/filterbanner.png"></MapContentCardImg>
                <MapContentCardDesc>
                <MapContentCardTitle></MapContentCardTitle>
                <MapContentCardKeys>
                    <MapContentCardKey></MapContentCardKey>
                </MapContentCardKeys>
                </MapContentCardDesc>
            </MapContentCard>
            </MapContentCards>
        </MapContent>
    </MapContainer>
   
  )}
  else{
    return(
        <InfraContainer>
            <InfraContent>
                <InfraContentDesc>
                    <InfraBackBtn>&lt; &nbsp; 다른지역 보기</InfraBackBtn>
                    <InfraContentTitle>
                        윤경님이 원하는<br/>
                            <InfraContentPlace>{place.name}</InfraContentPlace> 이에요!
                    </InfraContentTitle>
                </InfraContentDesc>
                <InfraList>
                    <InfraListDesc>
                        <InfraListTitle></InfraListTitle>
                        <InfraListMoreBtn></InfraListMoreBtn>
                        <InfraListContents>
                            <InfraListContent>

                            </InfraListContent>
                        </InfraListContents>
                    </InfraListDesc>
                </InfraList>
                <GoCalPageBtn></GoCalPageBtn>
                <InfraCards>
                {infraList &&
                    infraList.map((card)=>(
                        <InfraCard>
                            <InfraCardImg src={card.imageURL}></InfraCardImg>
                            <InfraCardDesc>
                                <InfraCardTitle>{card.name}</InfraCardTitle>
                                <InfraCardSubTitle>{card.subtitle}</InfraCardSubTitle>
                            </InfraCardDesc>
                        </InfraCard>)
                )}
                </InfraCards>
            </InfraContent>
        </InfraContainer>
    )
  }
}

const MapContainer = styled.div`
    width: 100%;
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
    background: #FFF;
    overflow-y: auto;
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
  border-bottom: 4px solid var(--Main, #5D5FEF);
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
  margin-left: 17px;
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
  margin-top: 5px;
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

const InfraContainer = styled.div`
    width: 100%;
    z-index: 999;
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
    background: #FFF;
    overflow-y: auto;
`
const InfraContent = styled.div`
    margin-top: 25px;
`
const InfraContentDesc = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    margin-left: 45px;
`
const InfraBackBtn = styled.button`
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
`

const InfraContentTitle = styled.div`
    gap: 4px;
`
const InfraContentPlace = styled.div`
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
    background: var(--Main, #5D5FEF);
    margin-top: 5px;
`
const InfraList = styled.div`
    
`
const InfraListDesc = styled.div`
    
`
const InfraListTitle = styled.div`
    
`
const InfraListMoreBtn = styled.div`
    
`
const InfraListContents = styled.div`
    
`
const InfraListContent = styled.div`
    
`
const GoCalPageBtn = styled.button`
    
`
const InfraCards = styled.div`
    
`
const InfraCard = styled.div`
    
`
const InfraCardImg = styled.image`
    
`
const InfraCardDesc = styled.div`
    
`
const InfraCardTitle= styled.div`
    
`
const InfraCardSubTitle = styled.div`
    
`
