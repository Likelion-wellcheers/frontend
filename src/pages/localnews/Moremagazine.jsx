import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Moremagazine = () => {
    const location = useLocation();
    const { city } = location.state;
    const navigate = useNavigate();

    const handleCardClick = (city, index) => {
        navigate(`/magazine-detail/${city}/${index}`);
    };

    const magazines = [
        {
            index: 1,
            city: "서울특별시",
            title: "서울특별시 동작구 흑석동 주민의 이야기를 들어봤어요!",
            date: "2024-08-07",
            image: "https://via.placeholder.com/150", // 임시 이미지
        },
        {
            index: 2,
            city: "서울특별시",
            title: "서울특별시 동작구 매력적인 동네 탐방!",
            date: "2024-08-04",
            image: "https://via.placeholder.com/150", // 임시 이미지
        },
        {
            index: 3,
            city: "서울특별시",
            title: "노후 생활에 적합한 지역",
            date: "2024-08-01",
            image: "https://via.placeholder.com/150", // 임시 이미지
        },
        // 추가 매거진 데이터...
    ];

    const filteredMagazines = magazines.filter(magazine => magazine.city === city);

    return (
        <Container>
            <Title>매거진</Title>
            <Subtitle>동네 주민들의 생생한 목소리를 들어보세요</Subtitle>
            <MagazineGrid>
                {filteredMagazines.map((magazine) => (
                    <MagazineCard
                        key={magazine.index}
                        onClick={() => handleCardClick(city, magazine.index)}
                    >
                        <MagazineImage src={magazine.image} alt={magazine.title} />
                        <MagazineTitle>{magazine.title}</MagazineTitle>
                        <MagazineDate>{magazine.date}</MagazineDate>
                    </MagazineCard>
                ))}
            </MagazineGrid>
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 10px;
`;

const Subtitle = styled.p`
    font-size: 16px;
    margin-bottom: 20px;
`;

const MagazineGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
`;

const MagazineCard = styled.div`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }
`;

const MagazineImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
`;

const MagazineTitle = styled.h3`
    font-size: 18px;
    margin: 10px 0;
`;

const MagazineDate = styled.p`
    font-size: 14px;
    color: #666;
`;
