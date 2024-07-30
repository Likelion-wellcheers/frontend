import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Mypage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('지역후기');

  // 임시 데이터
  const profile = {
    name: '야채윤경',
    image: '/images/profile.png',
    age: 21,
    location: '서울특별시 강남구'
  };

  const plans = [
    { location: '서울시 동작구', date: '2024-07-26', content: '계획 한 줄만 보이게' },
    { location: '서울시 동작구', date: '2024-07-26', content: '계획 한 줄만 보이게' },
    { location: '서울시 동작구', date: '2024-07-26', content: '계획 한 줄만 보이게' },
  ];

  const savedItems = [
    { location: '서울특별시 동작구', image: '/images/cat1.png', count: 3 },
    { location: '서울특별시 동작구', image: '/images/cat2.png', count: 3 },
    { location: '서울특별시 동작구', image: '/images/cat1.png', count: 3 },
  ];

  const reviews = [
    { location: '서울시 동작구', date: '2024-07-26', rating: 4.0, content: '어린이랑이런내용의리뷰글달았어요', image: '/images/cat3.png', type: '지역후기' },
    { location: '서울시 동작구', date: '2024-07-26', rating: 4.0, content: '어린이랑이런내용의리뷰글달았어요', image: '/images/cat3.png', type: '지역후기' },
    { location: '서울시 동작구', date: '2024-07-26', rating: 4.0, content: '어린이랑이런내용의리뷰글달았어요', image: '/images/cat3.png', type: '지역후기' },
  ];

  return (
    <Container>
      <LeftCard>
        <ProfileImage src={profile.image} alt="Profile" />
        <Name>{profile.name}님</Name>
        <ProfileDetail>
          <div>{profile.age}세 |</div>
          <div>{profile.location}</div>
        </ProfileDetail>
        <Button onClick={() => navigate('/editinfo')}>내 정보 수정</Button>
      </LeftCard>
      <RightCard>
        <Section>
          <SectionTitle>
            <Icon src='/images/pencil.png' alt='연필 아이콘' />
            <Textwrapper>나의 계획</Textwrapper>
          </SectionTitle>
          <Scrollable>
            {plans.map((plan, index) => (
              <PlanItem key={index}>
                <div>{plan.location}</div>
                <div>{plan.date}</div>
                <div>{plan.content}</div>
              </PlanItem>
            ))}
          </Scrollable>
        </Section>
        <Section>
          <SectionTitle>
            <Icon src='/images/heart.png' alt='하트 아이콘' />
            <Textwrapper>저장 목록</Textwrapper>
          </SectionTitle>
          {savedItems.slice(0, 3).map((item, index) => (
            <SaveListItem key={index}>
              <SaveListImage src={item.image} alt={item.location} />
              <div>
                <div>{item.location}</div>
                <div>{item.count}개</div>
              </div>
            </SaveListItem>
          ))}
          <MoreButton onClick={() => navigate('/savelist')}>더보기</MoreButton>
        </Section>
        <Section>
          <SectionTitle>
            <Icon src='/images/talk.png' alt='말풍선 아이콘' />
            <Textwrapper>나의 후기</Textwrapper>
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
            {reviews.filter(review => review.type === activeTab).map((review, index) => (
              <ReviewItem key={index}>
                <div>
                  <div>{review.location}</div>
                  <div>{review.date}</div>
                  <div>{review.rating}★</div>
                  <div>{review.content}</div>
                </div>
                <ReviewImage src={review.image} alt="Review" />
              </ReviewItem>
            ))}
          </Scrollable>
        </Section>
      </RightCard>
    </Container>
  );
};

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
  top: 132px;
  left: 346px;
  gap: 0px;
  border-radius: 12px 12px 12px 12px;
  border: 1px 0px 0px 0px;
  opacity: 0px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(238, 235, 232, 1);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
  text-align: center;
`;

const RightCard = styled.div`
  width: 916px;
  height: 1234px;
  top: 132px;
  left: 658px;
  gap: 0px;
  border-radius: 12px 12px 12px 12px;
  border: 1px 0px 0px 0px;
  opacity: 0px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(238, 235, 232, 1);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  margin-top: 30%;

  border: 4px solid rgba(93, 95, 239, 1)
`;

const Name = styled.div`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  text-align: center;
  color: rgba(0, 0, 0, 1);
`

const ProfileDetail = styled.div`
  display: flex;
  justify-content: center;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  color: rgba(97, 93, 103, 1);
`

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Section = styled.div`
  //margin-bottom: 20px;
  margin: 5%;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  //margin-bottom: 10px;
  //background: rgba(244, 243, 255, 1);
  //border: 1px solid rgba(193, 190, 255, 1);
  width: Fill (900px)px;
  height: Hug (52px)px;
  padding: 8px 0px 8px 0px;
  gap: 8px;
  border-radius: 4px;
  border: 1px 0px 0px 0px;
  opacity: 0px;
  background: rgba(244, 243, 255, 1);
  border: 1px solid rgba(193, 190, 255, 1);
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 1px;
`;

const Textwrapper = styled.div`
  width: auto;
  height: 36px;
  gap: 0px;
  opacity: 0px;
//styleName: Title_2;
font-family: Pretendard;
font-size: 20px;
font-weight: 600;
line-height: 36px;
text-align: center;

`

const Scrollable = styled.div`
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #eee;
  padding: 10px;
`;

const PlanItem = styled.div`
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SaveListItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const SaveListImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
`;

const ReviewItem = styled.div`
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  display: flex;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const ReviewImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-left: 10px;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px;
  cursor: pointer;
  background-color: ${props => props.active ? '#007BFF' : '#fff'};
  color: ${props => props.active ? '#fff' : '#000'};
  border: 1px solid #007BFF;
  border-bottom: ${props => props.active ? 'none' : '1px solid #007BFF'};

  &:hover {
    background-color: ${props => props.active ? '#0056b3' : '#f1f1f1'};
  }
`;

const MoreButton = styled(Button)`
  display: block;
  margin: 0 auto;
`;
