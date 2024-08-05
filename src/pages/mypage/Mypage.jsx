import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchMyInfo, fetchMyPlan, fetchSaveCenter } from '../../apis/account';

export const Mypage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('지역후기');
  const [profile, setProfile] = useState({}); // 사용자 프로필 정보
  const [myPlan, setMyPlan] = useState([]); // 사용자가 쓴 계획 정보
  const [savedItems, setSavedItems] = useState({});

  const reviews = [
    { location: '서울시 동작구', date: '2024-07-26', rating: 4.0, content: '어린이랑이런내용의리뷰글달았어요', image: '/images/cat3.png', type: '지역후기' },
    { location: '서울시 동작구', date: '2024-07-26', rating: 4.0, content: '어린이랑이런내용의리뷰글달았어요', image: '/images/cat3.png', type: '지역후기' },
    { location: '서울시 동작구', date: '2024-07-26', rating: 4.0, content: '어린이랑이런내용의리뷰글달았어요', image: '/images/cat3.png', type: '지역후기' },
    { location: '서울시 강남구', date: '2024-07-25', rating: 5.0, content: '이런내용의리뷰글달았어요', image: '/images/cat3.png', type: '시설후기' },
    { location: '서울시 강남구', date: '2024-07-25', rating: 5.0, content: '이런내용의리뷰글달았어요', image: '/images/cat3.png', type: '시설후기' },
    { location: '서울시 강서구', date: '2024-07-24', rating: 3.0, content: '이런내용의리뷰글달았어요', image: '/images/cat3.png', type: '시설후기' },
  ];

  useEffect(()=>{
    const getMyProfile = async() => {
      const result = await fetchMyInfo();
      setProfile(result);
    }
    const getMyPlan = async() => {
      const result = await fetchMyPlan();
      setMyPlan(result);
    }
    const getMySaveCenter = async() => {
      const result = await fetchSaveCenter();
      setSavedItems(result);
      console.log(savedItems);
      Object.keys(savedItems).forEach((regionKey) => {
        const regionItems = savedItems[regionKey];
        const indexItems = regionItems.slice(0, 3);
        console.log('아이템',indexItems);
      })
    getMyProfile();
    getMyPlan();
    getMySaveCenter();
}},[]);

  if(profile){
  return (
    <Container>
      <LeftCard>
        <ProfileImage src={profile.profileimage_url} alt="Profile" />
        <Name>{profile.nickname || "user"}</Name>
        <ProfileDetail>
          <div>{profile.city} {profile.gugoon}</div>
        </ProfileDetail>
        <Button onClick={() => navigate('/editinfo')}>
          <SettingIcon src='/images/setting.png' alt='설정 아이콘' />내 정보 수정
        </Button>
      </LeftCard>
      <RightCard>
        <Section>
          <SectionTitle>
            <Icon src='/images/pencil.png' alt='연필 아이콘' />
            <TextWrapper>나의 계획</TextWrapper>
          </SectionTitle>
          <Scrollable>
            {myPlan.map((plan, index) => (
              <ReviewItem key={index}>
                <ContentWrapper>
                  <Locdate>
                    <Locationname>{plan.city} {plan.gugoon}</Locationname>
                    <Date>{plan.created_at.substr(0,10)}</Date>
                  </Locdate>
                  <Content>{plan.plan1}</Content>
                </ContentWrapper>
              </ReviewItem>
            ))}
          </Scrollable>
        </Section>

        <Section>
          <SectionTitle>
            <Icon src='/images/heart.png' alt='하트 아이콘' />
            <TextWrapper>저장 목록</TextWrapper>
          </SectionTitle>
          <SaveList>
            {/* {Object.keys(savedItems).forEach((regionKey) => {
              const regionItems = savedItems[regionKey];
              const indexItems = regionItems.slice(0, 3);
              indexItems.map(item, index => {
                <SaveListItem key={index}>
                <SaveListImageContainer>
                  <SaveListImage src={item[0]?.thumbnail || "/images/centerDefault.jpg"} alt={item.name} />
                  <SaveListImage src={item[1]?.thumbnail || "/images/centerDefault.jpg"} alt={item.name} />
                </SaveListImageContainer>
                <div>
                  <div>{item[0]?.city} {item[0]?.gugoon}</div>
                  <div>{item?.length}개</div>
                </div>
              </SaveListItem>
            })})} */}
          </SaveList>
          <MoreButton onClick={() => navigate('/savelist')}>더보기</MoreButton>
        </Section>
        <Section>
          <SectionTitle>
            <Icon src='/images/talk.png' alt='말풍선 아이콘' />
            <TextWrapper>나의 후기</TextWrapper>
          </SectionTitle>
          <Tabs>
            <TabButton active={activeTab === '지역후기'} onClick={() => setActiveTab('지역후기')}>
              지역후기
            </TabButton>
            <TabButton active={activeTab === '시설후기'} onClick={() => setActiveTab('시설후기')}>
              시설후기
            </TabButton>
          </Tabs>
          <Scrollable>
            {reviews.filter(review => review.type === activeTab).slice(0, 3).map((review, index) => (
              <ReviewItem key={index}>
                <ContentWrapper>
                  <Locdate>
                    <Locationname>{review.location}</Locationname>
                    <Date>{review.date}</Date>
                  </Locdate>
                  <Rating>{review.rating}★</Rating>
                  <Content>{review.content}</Content>
                </ContentWrapper>
                <ReviewImage src={review.image} alt="Review" />
              </ReviewItem>
            ))}
          </Scrollable>
        </Section>
      </RightCard>
    </Container>
  );
};}

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

const SettingIcon = styled.img`
  width: 20px;
  height: 20px;
  white-space: nowrap;
`;

const RightCard = styled.div`
  width: 916px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(238, 235, 232, 1);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
  margin-top: 33px;
  margin-left: 23%;
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

const Scrollable = styled.div`
  height: 240px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(97, 93, 103, 1) rgba(238, 235, 232, 1);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(97, 93, 103, 1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(238, 235, 232, 1);
  }
`;

const TextWrapper = styled.div`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  color: rgba(0, 0, 0, 1);
`;

const SaveList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const SaveListItem = styled.div`
  width: 30%;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  background: rgba(238, 235, 232, 1);
  border-radius: 4px;
  padding: 5px;
  gap: 5%;
`;

const TabButton = styled.button`
  background: ${({ active }) => (active ? 'rgba(255, 255, 255, 1)' : 'rgba(238, 235, 232, 1)')};
  color: ${({ active }) => (active ? 'rgba(93, 95, 239, 1)' : 'rgba(97, 93, 103, 1)')};
  border: none;
  padding: 10px 20px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;

  &:hover {
    background: ${({ active }) => (active ? '#ccc' : '#ccc')};
  }
`;

const MoreButton = styled.button`
  margin: 20px auto;
  font-size: 16px;
  padding: 6px 20px;
  width: fit-content;
  background-color: white;
  color: black;
  border: solid black 1px;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  font-weight: 500;
line-height: 150%;

  &:hover {
    background-color: '#ccc';
  }
`;

const ReviewItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-right: 10px;
`;

const Locdate = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Locationname = styled.div`
  font-weight: bold;
`;

const Date = styled.div`
  margin-left: 10px;
  font-size: 12px;
  color: #777;
`;

const Rating = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  margin-bottom: 5px;
`;

const Content = styled.div`
  margin-bottom: 5px;
`;

const ReviewImage = styled.img`
  width: auto;
  height: auto;
  object-fit: cover;
`;