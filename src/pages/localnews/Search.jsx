import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Search = () => {
    const [cities] = useState([
        '서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', 
        '울산광역시', '수원시', '성남시', '의정부시', '안양시', '부천시', '광명시', 
        '평택시', '동두천시', '안산시', '고양시', '과천시', '구리시', '남양주시', 
        '오산시', '시흥시', '군포시', '의왕시', '하남시', '용인시', '파주시', 
        '이천시', '안성시', '김포시', '화성시', '광주시', '양주시', '포천시', 
        '여주시', '경기도', '춘천시', '원주시', '강릉시', '동해시', '태백', 
        '속초시', '삼척시', '강원도', '청주시', '충주시', '제천시', '충청북도', 
        '천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', 
        '당진시', '충청남도', '전주시', '군산시', '익산시', '정읍시', '남원시', 
        '김제시', '전라북도', '목포시', '여수시', '순천시', '나주시', '광양시', 
        '전라남도', '포항시', '경주시', '김천시', '안동시', '구미시', '영주시', 
        '영천시', '상주시', '문경시', '경산시', '경상북도', '창원시', '진주시', 
        '통영시', '사천시', '김해시', '밀양시', '거제시', '양산시', '경상남도', 
        '제주시', '서귀포시'
    ]);
    const [districts, setDistricts] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedCity) {
            fetch('https://wellcheers.p-e.kr/account/region/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ city: selectedCity }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.gugoon.length === 0 || (data.gugoon.length === 1 && data.gugoon[0] === '')) {
                        setDistricts([{ name: '전체보기', city_code: data.city_codes[0] }]);
                    } else {
                        const combinedData = data.gugoon.map((gugoon, index) => ({
                            name: gugoon,
                            city_code: data.city_codes[index],
                        }));
                        setDistricts(combinedData);
                    }
                    setSelectedDistrict('');
                })
                .catch((error) => {
                    console.error('Error fetching districts:', error);
                });
        }
    }, [selectedCity, navigate]);

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setShowCityDropdown(false);
    };

    const handleDistrictSelect = (district) => {
        setSelectedDistrict(district);
        setShowDistrictDropdown(false);

        if (selectedCity && district) {
            const selectedCityCode = districts.find(d => d.name === district)?.city_code;
            if (district === '전체보기') {
                navigate('/Localinfo', { state: { city_codes: [selectedCityCode] } });
            } else {
                console.log('Selected district:', district);
                console.log('Selected city_code:', selectedCityCode); // 선택된 district와 city_code 확인
                navigate('/Localinfo', { state: { city_codes: [selectedCityCode] } });
            }
        }
    };

    return (
        <SearchWrapper>
            <ButtonWrapper>
                <Button1>전라남도 여수시</Button1>
                <Button2>제주특별자치도 서귀포시</Button2>
                <Button3>부산광역시 해운대구</Button3>
            </ButtonWrapper>
            <SearchContainer>
                <SearchHeader>
                    <Logo src="/images/mainlogo.png" alt="Logo" />
                    <Title>궁금하신 지역을 검색해 보세요!</Title>
                </SearchHeader>
                <DropdownWrapper>
                    <DropdownContainer>
                        <DropdownButton onClick={() => setShowCityDropdown(!showCityDropdown)}>
                            {selectedCity || '시'}
                        </DropdownButton>
                        {showCityDropdown && (
                            <DropdownMenu>
                                {cities.map((city, index) => (
                                    <DropdownItem key={index} onClick={() => handleCitySelect(city)}>
                                        {city}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        )}
                    </DropdownContainer>
                    <DropdownContainer>
                        <DropdownButton
                            onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
                            disabled={!selectedCity}
                        >
                            {selectedDistrict || '구'}
                        </DropdownButton>
                        {showDistrictDropdown && (
                            <DropdownMenu>
                                {districts.map((district, index) => (
                                    <DropdownItem key={index} onClick={() => handleDistrictSelect(district.name)}>
                                        {district.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        )}
                    </DropdownContainer>
                </DropdownWrapper>
            </SearchContainer>
        </SearchWrapper>
    );
};

const SearchWrapper = styled.div`
    padding-top: 2%;
    padding-bottom: 25%;
    background-color: rgba(244, 243, 255, 1);
    height: auto;
`;

const SearchContainer = styled.div`
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SearchHeader = styled.div`
    margin-bottom: 20px;
`;

const Logo = styled.img`
    width: 100px;
    height: auto;
    margin-bottom: 10px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: #333;
`;

const DropdownContainer = styled.div`
    position: relative;
    margin-top: 10px;
`;

const DropdownButton = styled.button`
    width: 200px;
    height: 40px;
    padding: 5px;
    font-size: 16px;
    border: 1px solid rgba(93, 95, 239, 1);
    border-radius: 5px;
    background: rgba(193, 190, 255, 1);
    color: #333;
    text-align: center;
    cursor: pointer;
    outline: none;
    appearance: none;

    &:focus {
        border-color: #7e68d6;
        background: rgba(193, 190, 255, 1);
    }

    &:disabled {
        background-color: #f0f0f0;
        color: #999;
        cursor: not-allowed;
    }
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 200px;
    max-height: 200px;
    overflow-y: scroll;
    background: white;
    border: 1px solid rgba(93, 95, 239, 1);
    border-radius: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

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

const DropdownItem = styled.div`
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    color: #333;

    &:hover {
        background-color: rgba(193, 190, 255, 0.2);
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    gap: 20px;
    position: relative;
    margin: 0;
    height: 100px;
`;

const FloatingButton = styled.button`
    background: rgba(93, 95, 239, 1);
    opacity: 30%;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 14px;
    position: absolute;
    z-index: 1000;
    transform: translate(-50%, -50%); /* 버튼의 중심을 기준으로 이동 */
`;

const Button1 = styled(FloatingButton)`
    top: 200%;  
    left: 30%; 
`;

const Button2 = styled(FloatingButton)`
    top: 270%; 
    left: 25%;  
`;

const Button3 = styled(FloatingButton)`
    top: 235%;   
    right: 15%;  
`;

const DropdownWrapper = styled.div`
    display: flex;
    gap: 5%; 
`;

export default Search;
