import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Savelist = () => {

  const navigate = useNavigate();

  const profile = {
    name: '야채윤경',
    image: '/images/profile.png',
    age: 21,
    location: '서울특별시 강남구'
  };

  const savedItems = [
    { location: '서울특별시 동작구', image1: '/images/cat1.png', image2: '/images/cat2.png', count: 3 },
    { location: '서울특별시 강남구', image1: '/images/cat1.png', image2: '/images/cat2.png', count: 5 },
    { location: '서울특별시 마포구', image1: '/images/cat1.png', image2: '/images/cat2.png', count: 4 },
    { location: '서울특별시 마포구', image1: '/images/cat1.png', image2: '/images/cat2.png', count: 4 },
    { location: '서울특별시 마포구', image1: '/images/cat1.png', image2: '/images/cat2.png', count: 4 },
    { location: '서울특별시 마포구', image1: '/images/cat1.png', image2: '/images/cat2.png', count: 4 },
    { location: '서울특별시 마포구', image1: '/images/cat1.png', image2: '/images/cat2.png', count: 4 },
  ];

  const handleItemClick = (location) => {
    navigate(`/detailsavelist`, { state: {location}});
  };

  return (
    <Container>
      <LeftCard>
        <ProfileImage src={profile.image} alt="Profile" />
        <Name>{profile.name}님</Name>
        <ProfileDetail>
          <div>{profile.age}세</div>
          <div>{profile.location}</div>
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
            {savedItems.map((item, index) => (
              <SaveListItem key={index} onClick={() => handleItemClick(item.location)}>
                <SaveListImageContainer>
                  <SaveListImage src={item.image1} alt={item.location} />
                  <SaveListImage src={item.image2} alt={item.location} />
                </SaveListImageContainer>
                <div>
                  <div>{item.location}</div>
                  <div>{item.count}개</div>
                </div>
              </SaveListItem>
            ))}
          </SaveList>
        </Section>
      </Rightcard>
    </Container>
  )
}

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
