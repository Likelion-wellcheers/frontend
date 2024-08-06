import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { fetchMyInfo, fetchSaveCenter } from '../../apis/account';

export const Detailsavelist = () => {
  const navigate = useNavigate();
  const locationState = useLocation();
  const index = locationState.state?.idx || '';
  const [profile, setProfile] = useState();
  const [savedCenters, setSavedCenters] = useState();
  const [idx, setIdx] = useState();


  useEffect(()=>{
    const getMyProfile = async() => {
      const result = await fetchMyInfo();
      setProfile(result);
    }
    const getMySaveCenter = async() => {
      const result = await fetchSaveCenter();
      var lis = Object.keys(result).map(regionKey => {
        return result[regionKey].map(item => {
            return item; // 이 값을 새로운 배열에 넣을 수 있음
          });
      });
      setSavedCenters(lis);
    }  
    getMyProfile();
    getMySaveCenter();
    setIdx(parseInt(index));
    
  },[])


if(profile){
  return (
    <Container>
      <LeftCard>
        <ProfileImage src={profile.profileimage_url} alt="Profile" />
        <Name>{profile.nickname}님</Name>
        <ProfileDetail>
          <div>{profile.city} {profile.gugoon}</div>
        </ProfileDetail>
        <Button onClick={() => navigate('/editinfo')}>
          <SettingIcon src='/images/setting.png' alt='설정 아이콘' />
          내 정보 수정
        </Button>
      </LeftCard>
      <RightCard>
        <Section>
          <SectionTitle>
            <Icon src='/images/heart.png' alt='하트 아이콘' />
            <TextWrapper>저장 목록</TextWrapper>
          </SectionTitle>
          <LocationTitle>{savedCenters?.[idx][0]?.city} {savedCenters?.[idx][0]?.gugoon}</LocationTitle>
          <SaveList>
            {savedCenters?.[idx]?.map((item, index) => (
              <SaveListItem key={index}>
                <SaveListImageContainer>
                  <SaveListImage src={item.thumbnail || "images/default.png"} onerror="this.style.display='none'" />
                </SaveListImageContainer>
                <SaveDesc>
                  <SaveTitle>{item.name}</SaveTitle>
                  <SaveSubtitle>{item.address}</SaveSubtitle>
                </SaveDesc>
              </SaveListItem>
            ))}
          </SaveList>
        </Section>
      </RightCard>
    </Container>
  )
}}

const LocationTitle = styled.div`
  background-color: blue;
  height: 5%;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 10px;
  margin: 10px 0;
`;

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
  width: 116px;
  height: 29px;
  padding: 4px 12px;
  gap: 5px;
  display: flex;
  align-items: center;
  white-space: nowrap;

  &:hover {
    background-color: rgba(244, 243, 255, 1);
  }
`;

const SettingIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const RightCard = styled.div`
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
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SaveListImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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

const SaveListImage = styled.img`
  width: 100%;
  height: 128px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 4px;
`;
