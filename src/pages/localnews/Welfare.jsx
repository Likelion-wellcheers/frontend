import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export const Welfare = ({ city_codes }) => {
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // 기본 이미지들
    const defaultImages = [
        '/images/default_wal1.png',
        '/images/default_wal2.png',
        '/images/default_wal3.png'
    ];

    useEffect(() => {
        if (city_codes) {
            fetch(`https://wellcheers.p-e.kr/issue/${city_codes}/welfare/`, {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((data) => {
                    // 데이터가 배열인지 확인
                    const welfareData = Array.isArray(data) ? data : [data];
                    
                    // 기본 이미지를 채우기 위한 배열
                    let images = [];

                    // 데이터에서 이미지가 있는 경우, 이미지 배열에 추가
                    welfareData.forEach((item, index) => {
                        images.push(item.image || defaultImages[index % defaultImages.length]);
                    });

                    // 데이터가 부족한 경우, 기본 이미지를 추가하여 배너 수를 맞춤
                    while (images.length < 3) {
                        images.push(defaultImages[images.length % defaultImages.length]);
                    }

                    setBanners(images);
                })
                .catch((error) => {
                    console.error('Error fetching welfare data:', error);
                });
        }
    }, [city_codes]);

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % banners.length);
    };

    const handlePrev = () => {
        setCurrentIndex((currentIndex - 1 + banners.length) % banners.length);
    };

    return (
        <Wrapper>
            <ArrowButton>
            </ArrowButton>
            <Banner style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {banners.map((banner, index) => (
                    <BannerImage key={index} src={banner} alt={`Banner ${index + 1}`} />
                ))}
            </Banner>
            <ArrowButton>
            </ArrowButton>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const Banner = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  width: 100%;
  justify-content: center;
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

const BannerImage = styled.img`
  width: 33.33%;
  height: auto;
`;