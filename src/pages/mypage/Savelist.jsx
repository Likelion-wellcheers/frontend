import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchMyInfo, fetchSaveCenter } from '../../apis/account';

export const Savelist = () => {
  const [savedCenters, setSavedCenters] = useState();
  const [profile, setProfile] = useState();
  const navigate = useNavigate();

  const data = {
    "1-서울특별시-동작구": [
        {
            "id": 1,
            "name": "강남초등학교",
            "region_id": 1,
            "address": "우리집뒤",
            "time": "",
            "cost": 0,
            "longtitude": "0.0000000000",
            "latitude": "0.0000000000",
            "thumbnail": null,
            "city": "서울특별시",
            "gugoon": "동작구"
        },
        {
            "id": 2,
            "name": "김영삼도서관",
            "region_id": 1,
            "address": "알잔아요",
            "time": "",
            "cost": 0,
            "longtitude": "0.0000000000",
            "latitude": "0.0000000000",
            "thumbnail": null,
            "city": "서울특별시",
            "gugoon": "동작구"
        }
    ],
    "2-서울특별시-강남구": [
        {
            "id": 3,
            "name": "러쉬",
            "region_id": 2,
            "address": "강남역",
            "time": "",
            "cost": 0,
            "longtitude": "1.0000000000",
            "latitude": "1.0000000000",
            "thumbnail": null,
            "city": "서울특별시",
            "gugoon": "강남구"
        }
    ]
};

// 바깥의 키에 대해 map을 적용하고, 그 내부의 객체에 대해 map을 한번 더 적용하는 방법
// Object.keys(data).map(regionKey => {
//     console.log(`Region: ${regionKey}`);
//     return data[regionKey].map(item => {
//         console.log(`ID: ${item.id}, Name: ${item.name}, Address: ${item.address}`);
//         // 여기서 필요한 다른 작업도 수행 가능
//         return item; // 이 값을 새로운 배열에 넣을 수 있음
//     });
// });


  useEffect(()=>{
    const getMySaveCenter = async() => {
      const result = await fetchSaveCenter();

       var lis = Object.keys(result).map(regionKey => {
        console.log(`Region: ${regionKey}`);
        return result[regionKey].map(item => {
            return item; // 이 값을 새로운 배열에 넣을 수 있음
          });
      });
      setSavedCenters(lis);
    }  
    const getMyProfile = async() => {
      const result = await fetchMyInfo();
      setProfile(result);
    }
    getMyProfile();
    getMySaveCenter();
    
  },[])

  const handleItemClick = (idx) => {
    navigate(`/detailsavelist`, { state: { idx }});
  };

  if(profile){
  return (
    <Container>
      <LeftCard>
        <ProfileImage src={profile.profileimage_url} alt="Profile" />
        <Name>{profile.nicknam}님</Name>
        <ProfileDetail>
          <div>{profile.city} {profile.gugoon}</div>
        </ProfileDetail>
        <Button onClick={() => navigate('/editinfo')}>
          <SettingIcon src='/images/setting.png' alt='설정 아이콘' />
          내 정보 수정
        </Button>
      </LeftCard>
      <Rightcard>
        <Section>
          <SectionTitle>
            <Icon src='/images/heart.png' alt='하트 아이콘' />
            <TextWrapper>저장 목록</TextWrapper>
          </SectionTitle>
          <SaveList>
          {savedCenters?.map((item, idx)=>(
              <SaveListItem onClick={()=> handleItemClick(idx)} key={idx}>
                <SaveListImageContainer>
                  <SaveListImage src={item[0]?.thumbnail || "/images/default.png"} alt={item.name} />
                  <SaveListImage src={item[1]?.thumbnail || "/images/default.png"} alt={item.name} />
                </SaveListImageContainer>
                <SaveDesc>
                  <SaveTitle>{item[0].city} {item[0].gugoon}</SaveTitle>
                  <SaveSubtitle>{item.length || "0 "}개</SaveSubtitle>
                </SaveDesc>
              </SaveListItem>
            ))}
          </SaveList>
        </Section>
      </Rightcard>
    </Container>
  )
}}

const Container = styled.div`
  display: flex;
  padding: 20px;
  background: rgba(248, 246, 243, 1);
  justify-content: center;
  gap: 1%;
`;

const LeftCard = styled.div`
  width: 293px;
  height: 410px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(238, 235, 232, 1);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
  text-align: center;
  position: fixed;
  top: 15%; 
  left: 7%; 
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  margin-top: 20%;
  border: 4px solid rgba(93, 95, 239, 1);
`;

const Name = styled.div`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  color: rgba(0, 0, 0, 1);
`;

const ProfileDetail = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-weight: 540;
  line-height: 27px;
  color: rgba(97, 93, 103, 1);
  margin-top: 2%;
  gap: 8px;
`;

const Button = styled.button`
  border-radius: 4px;
  cursor: pointer;
  margin-top: 25%;
  background:  rgba(248, 246, 243, 1);
  border: 1px solid rgba(97, 93, 103, 1);
  width: Hug (116px)px;
  height: Hug (29px)px;
  top: 461px;
  left: 435px;
  padding: 4px 12px 4px 12px;
  gap: 5px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(244, 243, 255, 1);
  }
`;

const SettingIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Rightcard = styled.div`
  width: 916px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(238, 235, 232, 1);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
  margin-top: 33px;
  margin-left: 23%;
  margin-bottom: 3%;
`;

const Section = styled.div`
  margin: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 52px;
  padding: 8px 0;
  gap: 8px;
  border-radius: 4px;
  background: rgba(244, 243, 255, 1);
  border: 1px solid rgba(193, 190, 255, 1);
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const TextWrapper = styled.div`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  color: rgba(0, 0, 0, 1);
`;

const SaveList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
`;

const SaveListItem = styled.div`
  width: 93%;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const SaveListImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const SaveListImage = styled.img`
  width: 48%;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const SaveDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;

`
const SaveTitle = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`
const SaveSubtitle = styled.div`
  color: var(--Gray-01, #615D67);
`
