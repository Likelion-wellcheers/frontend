import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Reviewpart = ({ city_codes , city, district}) => {
    const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [title, setTitle] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        var tempTitle = city+ " " + district
        setTitle(tempTitle);
        if (city_codes) {
            fetch(`https://wellcheers.p-e.kr/issue/${city_codes}/review`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setReviews(data);
                })
                .catch((error) => {
                    console.error('Error fetching reviews:', error);
                });
        }
    }, [city_codes]);

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
                <Button onClick={() => navigate(`${city_codes}/reviewing`, { state: { title } })}>작성하기</Button>
            </SubTitle>
            <HorizontalRule />
            <ArrowButton left onClick={handlePrev}>
                <ArrowImage src='/images/leftarrow.png' alt='Previous' />
            </ArrowButton>
            <ReviewList style={{ transform: `translateX(-${(currentIndex - 2) * (100 / 5)}%)` }}>
                {reviews.map((review, index) => (
                    <ReviewCard 
                        onClick={() => navigate('/locreview', { 
                            state: { 
                                review, 
                                city: review.city, 
                                gugoon: review.gugoon, 
                                nickname: review.nickname, 
                                profileimage_url: review.profileimage_url 
                            } 
                        })} 
                        key={index} 
                        className={index === currentIndex - 2 || index === currentIndex + 2 ? 'hidden' : ''}
                    >
                        <ReviewHeader>
                            <ProfileImage src={review.profileimage_url ? review.profileimage_url : '/images/profile.png'} alt={review.user_id} />
                            <ReviewInfo>
                                <Username>{review.nickname}</Username>
                                <Location>{review.city} {review.gugoon}</Location>
                                <Rating>{'★'.repeat(review.score)}{'☆'.repeat(5 - review.score)}</Rating>
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

const Button = styled.button`
    margin-left: 83%;
    padding: 7px 18px;
    border: none;
    background: white;
    color: black;
    border-radius: 4px;
    display: flex;
    align-items: center;
    height: fit-content;
    font-size: 18px;
    font-weight: 500;
    line-height: 150%;
    //float: right;
    cursor: pointer;
`

const ReviewWrapper = styled.div`
    margin-top: 4.5%;
    position: relative;
    overflow: hidden;
    padding: 10px;
    padding-bottom: 5%;
`;

const ReviewList = styled.div`
    display: flex;
    transition: transform 0.3s ease-in-out;
    width: calc(100% + 100px);
    margin-left: -50px;
    justify-content: center;
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
    white-space: nowrap;
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
