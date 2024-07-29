import React, { useState } from 'react';
import styled from 'styled-components';

export const Reviewpart = ({ reviews }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % reviews.length);
    };

    const handlePrev = () => {
        setCurrentIndex((currentIndex - 1 + reviews.length) % reviews.length);
    };

    return (
        <ReviewWrapper>
            <SubTitle>
                <Icon src='/images/icon4.png' alt='후기 아이콘' />
                지역 후기
            </SubTitle>
            <HorizontalRule />
            <ArrowButton left onClick={handlePrev}>
                <ArrowImage src='/images/leftarrow.png' alt='Previous' />
            </ArrowButton>
            <ReviewList style={{ transform: `translateX(-${(currentIndex - 2) * (100 / 5)}%)` }}>
                {reviews.map((review, index) => (
                    <ReviewCard key={index} className={index === currentIndex - 2 || index === currentIndex + 2 ? 'hidden' : ''}>
                        <ReviewHeader>
                            <ProfileImage src={review.profile} alt={review.username} />
                            <ReviewInfo>
                                <Username>{review.username}</Username>
                                <Location>{review.location}</Location>
                                <Rating>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</Rating>
                            </ReviewInfo>
                        </ReviewHeader>
                        <Content>{review.content}</Content>
                    </ReviewCard>
                ))}
            </ReviewList>
            <ArrowButton right onClick={handleNext}>
                <ArrowImage src='/images/arrowbtn.png' alt='Next' />
            </ArrowButton>
        </ReviewWrapper>
    );
};

const ReviewWrapper = styled.div`
    position: relative;
    overflow: hidden;
    padding: 10px;
    margin-top: 100px;
    padding-bottom: 5%;
`;

const ReviewList = styled.div`
    display: flex;
    transition: transform 0.3s ease-in-out;
    width: calc(100% + 100px);
    margin-left: -50px;
`;

const ReviewCard = styled.div`
    flex: 0 0 30%;
    box-sizing: border-box;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
    margin: 0 10px;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    font-family: 'Arial, sans-serif';

    &.hidden {
        opacity: 0.5;
    }
`;

const ReviewHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
`;

const ReviewInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const Username = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
`;

const Location = styled.div`
    color: gray;
    margin-bottom: 5px;
`;

const Rating = styled.div`
    margin-bottom: 5px;
`;

const Content = styled.div`
    font-size: 14px;
`;

const ArrowButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1;

    ${({ left }) => left && 'left: 10px;'}
    ${({ right }) => right && 'right: 10px;'}
`;

const ArrowImage = styled.img`
    width: 50px; 
    height: 50px;
    margin-top: 40px;
`;

const SubTitle = styled.h3`
    max-width: 1200px;
    margin: 40px auto;
    display: flex;
    align-items: center;
    margin-bottom: 3px;
    color: white;
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 8px;
`;

const HorizontalRule = styled.hr`
    border: 0;
    border-top: 2px solid #eee;
    width: 1200px;
    margin-bottom: 30px;
`;
