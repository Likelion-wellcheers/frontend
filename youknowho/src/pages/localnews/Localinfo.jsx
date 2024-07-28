import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Welfare } from './Welfare';
import { Magazinepart } from './Magazinepart';
import { Reviewpart } from './Reviewpart';

export const Localinfo = () => {
    const location = useLocation();
    const { city, district } = location.state;

    const welfareBannerImages = [
        '/images/welfare.png',
        '/images/welfare2.png',
        '/images/welfare3.png',
    ];
    
    const cardNewsData = [
        {
            image: '/images/magazine1.png',
            title: 'Card News 1',
        },
        {
            image: '/images/magazine2.png',
            title: 'Card News 2',
        },
        {
            image: '/images/magazine3.png',
            title: 'Card News 3',
        },
    ];
    
    const reviewsData = [
        {
            profile: '/images/profile.png',
            username: 'User1',
            location: 'Location1',
            rating: 5,
            content: 'Review content 1',
        },
        {
            profile: '/images/profile.png',
            username: 'User2',
            location: 'Location2',
            rating: 4,
            content: 'Review content 2',
        },
        {
            profile: '/images/profile.png',
            username: 'User3',
            location: 'Location3',
            rating: 3,
            content: 'Review content 3',
        },
    ];

    return (
        <PageWrapper>
            <SectionTitle>
                <LocalButton>{city} {district}</LocalButton>의 소식을 알아보세요!
            </SectionTitle>
            <SubTitle>
                <Icon src='/images/icon2.png' alt='복지정책 아이콘' />
                놓치면 안 될 복지정책
            </SubTitle>
            <Welfare banners={welfareBannerImages} />
            <SubTitle>
                <Icon src='/images/icon3.png' alt='매거진 아이콘' />
                놓치면 안 될 매거진
                <MoreButton onClick={() => alert('Go to Magazine')}>더보기</MoreButton>
            </SubTitle>
            <Magazinepart cards={cardNewsData} />
            <SubTitle>
                <Icon src='/images/icon4.png' alt='후기 아이콘' />
                지역 후기
            </SubTitle>
            <HorizontalRule />
            <Reviewpart reviews={reviewsData} />
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-image: url('/images/background.jpg'); /* 큰 배경 이미지 추가 */
  background-size: cover; /* 배경 이미지 사이즈 조정 */
  background-position: center; /* 배경 위치 조정 */
`;

const SectionTitle = styled.h2`
  max-width: 1200px; /* 너비 1200px 설정 */
  margin: 0 auto 20px auto; /* 가운데 정렬 */
  display: flex;
  align-items: center;
`;

const SubTitle = styled.h3`
  max-width: 1200px; /* 너비 1200px 설정 */
  margin: 20px auto; /* 가운데 정렬 */
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const MoreButton = styled.button`
  padding: 10px;
  margin-left: 75%;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const LocalButton = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 10px;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 900;
  white-space: nowrap;
`;

const HorizontalRule = styled.hr`
  border: 0;
  border-top: 2px solid #eee;
  margin: 20px 0;
`;

