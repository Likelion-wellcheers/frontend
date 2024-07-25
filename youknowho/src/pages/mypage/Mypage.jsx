import React from 'react'
import styled from 'styled-components';

export const Mypage = () => {

  //임시 데이터
  const reviews = [
    {
      id: 1,
      reviewer: '야채윤경',
      text: '학교에서 근로 중인데 너무 배가 고파요 이럴 땐 어떻게 해야 하나요? 내공냠냠 금지',
      rating: '★★★★★',
      image: '/path/to/reviewer1.jpg',
    },
    {
      id: 2,
      reviewer: '자동다',
      text: '원래 아침 참새형 인간이었는데 요즘은 올빼미형 인간까지 접수했어요.. 피드백 남겨주시면 언제든지 볼 수 있을 것 같네요.. 열심히',
      rating: '★★★★★',
      image: '/path/to/reviewer2.jpg',
    },
    {
      id: 3,
      reviewer: '눈물이',
      text: ' 저 내일 붓가케우동 먹으러 가요!!',
      rating: '★★★★★',
      image: '/path/to/reviewer3.jpg',
    },
  ];

  const savedLists = [
    { id: 1, location: '서울특별시 동작구' },
    { id: 2, location: '경상남도 통영시' },
    { id: 3, location: '부산광역시 수영구' },
  ];

  return (
    <MypageWrapper>
      <Header>
        <ProfileImage src="/path/to/profile-image.jpg" alt="Profile" />
        <ProfileName>야채윤경님</ProfileName>
      </Header>

      <SectionWrapper>

      <Section>
        <SectionTitleWrapper>
          <SectionTitle>나의 후기</SectionTitle>
          <MoreButton>더보기+</MoreButton>
        </SectionTitleWrapper>
        <Reviews>
          {reviews.map((review) => (
            <Review key={review.id}>
              <ReviewerImage src={review.image} alt={`Reviewer ${review.reviewer}`} />
              <ReviewContent>
                <ReviewerName>{review.reviewer}</ReviewerName>
                <ReviewText>{review.text}</ReviewText>
                <ReviewRating>{review.rating}</ReviewRating>
              </ReviewContent>
            </Review>
          ))}
        </Reviews>
      </Section>

      <Section>
        <SectionTitleWrapper>
          <SectionTitle>저장 목록</SectionTitle>
          <MoreButton>더보기+</MoreButton>
        </SectionTitleWrapper>
        <SavedLists>
          {savedLists.map((list) => (
            <SavedList key={list.id}>
              <ListImagePlaceholder></ListImagePlaceholder>
              <ListLocation>{list.location}</ListLocation>
              <ListItemCount>{list.count}개</ListItemCount>
            </SavedList>
          ))}
        </SavedLists>
      </Section>

      </SectionWrapper>
    </MypageWrapper>
  )
}

const MypageWrapper = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f3f4f6;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  text-align: center;
  background-color: #ffffff;
  padding: 10%;
  border-radius: 20px;
  margin: 5%;
  margin-top: 8%;
  color: black;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const ProfileName = styled.h1`
  margin-top: 10px;
  font-size: 24px;
  font-weight: 900;
`;

const Section = styled.section`
  background-color: white;
  width: 50%;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
`;

const MoreButton = styled.button`
  background-color: #5865f2;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
`;

const Reviews = styled.div`
  display: flex;
  flex-direction: column;
`;

const Review = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
`;

const ReviewerImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ReviewContent = styled.div`
  flex-grow: 1;
`;

const ReviewerName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
`;

const ReviewText = styled.p`
  margin: 5px 0;
  font-size: 14px;
`;

const ReviewRating = styled.span`
  color: #f5a623;
  font-size: 14px;
`;

const SavedLists = styled.div`
  //width:100%;
  //display: flex;
  //justify-content: space-between;
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 10px;
`;

const SavedList = styled.div`
  flex-grow: 1;
  text-align: center;
  margin: 0 10px;
`;

const ListImagePlaceholder = styled.div`
  width: 100%;
  padding-top: 100%;
  background-color: #eee;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ListLocation = styled.p`
  margin: 5px 0;
  font-size: 14px;
`;

const ListItemCount = styled.span`
  color: #5865f2;
  font-size: 12px;
`;

const SectionWrapper = styled.div`
  display: flex;
  gap: 2%;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 5%;
`;