import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const Editinfo = () => {
  const [nickname, setNickname] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districts, setDistricts] = useState([]);

  const cityDistricts = {
    '서울특별시': ['강남구', '강동구', '강북구', '강서구'],
    '부산광역시': ['해운대구', '수영구', '연제구'],
    '전라남도 여수시': ['여서동', '문수동', '미평동'],
    '제주특별자치도 서귀포시': ['서귀동', '송산동', '정방동']
  };

  useEffect(() => {
    // Simulate fetching user data from backend
    const fetchUserData = async () => {
      const userData = {
        nickname: '야채윤경', 
        city: '서울특별시',  
        district: '강남구' 
      };
      setNickname(userData.nickname);
      setSelectedCity(userData.city);
      setSelectedDistrict(userData.district);
      setDistricts(cityDistricts[userData.city] || []);
    };
    fetchUserData();
  }, []);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setDistricts(cityDistricts[city] || []);
    setSelectedDistrict('');
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
  };

  const handleSave = () => {
    const updatedData = { nickname, city: selectedCity, district: selectedDistrict };
    console.log('Saved data:', updatedData);
    // Here you would send a request to your backend to save the updated data
  };

  return (
    <Container>
      <Form>
        <Title>내 정보 수정</Title>
        <Label>닉네임</Label>
        <Input
          type="text"
          placeholder="수정할 닉네임을 입력해 주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Label>현재 거주지</Label>
        <DropdownWrapper>
          <DropdownContainer>
            <DropdownButton>
              {selectedCity || '시'}
            </DropdownButton>
            <DropdownMenu>
              {Object.keys(cityDistricts).map((city, index) => (
                <DropdownItem key={index} onClick={() => handleCitySelect(city)}>
                  {city}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </DropdownContainer>
          <DropdownContainer>
            <DropdownButton
              disabled={!selectedCity}
            >
              {selectedDistrict || '구'}
            </DropdownButton>
            <DropdownMenu>
              {districts.map((district, index) => (
                <DropdownItem key={index} onClick={() => handleDistrictSelect(district)}>
                  {district}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </DropdownContainer>
        </DropdownWrapper>
        <SaveButton onClick={handleSave}>저장</SaveButton>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f6f3;
`;

const Form = styled.div`
  padding: 40px;
  margin: 5%;
  width: 600px;
  height: 500px;
  border-radius: 12px;
  border: 1px solid rgba(187, 184, 184, 1);
  background: rgba(255, 255, 255, 1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 2px solid #ddd;
  font-size: 14px;
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 35%;
  background: linear-gradient(247.34deg, #BCBDFF 7.5%, #5D5FEF 62.93%);
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background: linear-gradient(90deg, rgba(155, 81, 224, 1) 0%, rgba(93, 95, 239, 1) 100%);
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  margin-top: 10px;
`;

const DropdownButton = styled.button`
  width: 250px;
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
  width: 250px;
  max-height: 500px;
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

const DropdownWrapper = styled.div`
  display: flex;
  gap: 5%;
`;
