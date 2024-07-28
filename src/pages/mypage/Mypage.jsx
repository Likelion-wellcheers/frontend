import React, { useContext } from 'react'
import styled from 'styled-components';
import { ThemeColorContext } from '../../context/context';

export const Mypage = () => {

  // 임시 데이터
  const profile = {
    imageUrl: 'https://via.placeholder.com/80',
    name: '야채윤경님',
    age: 21,
    location: '서울특별시 강남구',
  };

  const reviews = [
    {
      title: '롯데캐슬 에듀포레',
      score: 4.0,
      text: 'dsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss...',
      date: '2024-07-25',
    },
    {
      title: '롯데캐슬 에듀포레',
      score: 4.0,
      text: 'dsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss...',
      date: '2024-07-25',
    },
  ];

  const themeColor = useContext(ThemeColorContext);

  return (
    <MypageWrapper>
      <Container themeColor={themeColor} />
      <ProfileHeaderWrapper>
        <ProfileHeader themeColor={themeColor}>
          <ProfileImage src={profile.imageUrl} alt="Profile" />
          <ProfileInfo>
            <ProfileName>{profile.name}</ProfileName>
            <ProfileDetails>{profile.age}세 | {profile.location}</ProfileDetails>
            <EditButton>내 정보 수정</EditButton>
          </ProfileInfo>
        </ProfileHeader>
      </ProfileHeaderWrapper>
      <ContentWrapper>
        <Content>
          <ReviewsContainer>
            {reviews.map((review, index) => (
              <ReviewCard key={index}>
                <ReviewBox>
                  <ReviewTitle>{review.title}</ReviewTitle>
                  <ReviewDivider />
                  <ReviewScore>★ {review.score}</ReviewScore>
                  <ReviewText>{review.text}</ReviewText>
                  <ReviewDate>{review.date}</ReviewDate>
                </ReviewBox>
              </ReviewCard>
            ))}
          </ReviewsContainer>
        </Content>
        <SideBox />
      </ContentWrapper>
    </MypageWrapper>
  )
}

const MypageWrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  background-color: ${({ themeColor }) => themeColor.sub};
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
`;

const ProfileHeaderWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
`;

const ProfileHeader = styled.div`
  background-color: ${({ themeColor }) => themeColor.main};
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  color: white;
  width: 80%;
  height: 200px;
  margin-top: -5%;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-right: 20px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProfileName = styled.h2`
  margin: 0;
`;

const ProfileDetails = styled.p`
  margin: 5px 0;
`;

const EditButton = styled.button`
  align-self: flex-end;
  padding: 8px 12px;
  background-color: white;
  color: blue;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 80%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const ReviewsContainer = styled.div`
  margin-bottom: 20px;
  max-height: 400px;
  overflow-y: auto;
`;

const ReviewCard = styled.div`
  background-color: white;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ReviewBox = styled.div`
  color: blue;
  border-radius: 10px;
  padding: 10px;
`;

const ReviewTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewDivider = styled.hr`
  border: 0;
  
  margin: 10px 0;
`;

const ReviewScore = styled.span`
  color: #ffc107;
  font-weight: bold;
  display: block;
  margin-top: 10px;
`;

const ReviewText = styled.p`
  margin: 10px 0;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReviewDate = styled.p`
  margin-top: 10px;
  font-size: 12px;
  color: gray;
`;

const SideBox = styled.div`
  background-color: #6363f7;
  width: 40%;
  border-radius: 10px;
  margin-left: 20px;
`;