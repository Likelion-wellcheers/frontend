import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Search = () => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // 나중에 패치해야 됨
        setCities(['서울특별시', '부산광역시', '전라남도 여수시', '제주특별자치도 서귀포시', '고양시']);
    }, []);

    useEffect(() => {
        if (selectedCity) {
            // 나중에 패치해야 됨
            const cityDistricts = {
                '서울특별시': ['강남구', '강동구', '강북구', '강서구'],
                '부산광역시': ['해운대구', '수영구', '연제구'],
                '전라남도 여수시': ['여서동', '문수동', '미평동'],
                '제주특별자치도 서귀포시': ['서귀동', '송산동', '정방동']
            };
            setDistricts(cityDistricts[selectedCity] || []);
            setSelectedDistrict('');
        }
    }, [selectedCity]);

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setShowCityDropdown(false);
    };

    const handleDistrictSelect = (district) => {
        setSelectedDistrict(district);
        setShowDistrictDropdown(false);

        if (selectedCity && district) {
            navigate('/Localinfo', { state: { city: selectedCity, district } });
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
                                <DropdownItem key={index} onClick={() => handleDistrictSelect(district)}>
                                    {district}
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
`