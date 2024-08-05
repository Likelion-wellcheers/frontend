import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const AddMyInfo = () => {
    const [nickname, setNickname] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    const cities = [
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
    ];
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const accessToken = localStorage.getItem("access");
          const response = await axios.get('https://wellcheers.p-e.kr/account/mypage/', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUserInfo(response.data);
          setNickname(response.data.nickname);
          setSelectedCity(response.data.city);
          setSelectedDistrict(response.data.gugoon);
        } catch (error) {
          setError(error);
        }
      };
  
      fetchUserData();
    }, []);
  
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
    }, [selectedCity]);
  
    const handleCitySelect = (city) => {
      setSelectedCity(city);
      setShowCityDropdown(false);
    };
  
    const handleDistrictSelect = (district) => {
      setSelectedDistrict(district.name);
      setShowDistrictDropdown(false);
    };
  
    const handleSave = async () => {
      const updatedData = { nickname, city: selectedCity, gugoon: selectedDistrict };
      try {
        const accessToken = localStorage.getItem("access");
        await axios.put('https://wellcheers.p-e.kr/account/information/', updatedData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        alert('내 추가정보가 성공적으로 입력 되었습니다');
        navigate(-1); // 이전 페이지로 이동
      } catch (error) {
        console.error('Error saving user info:', error);
        alert('정보 저장 중 오류가 발생했습니다.');
      }
    };
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  

  return (
    <Container>
    <Form>
      <Title>안녕하세요! 회원님의 정보를 입력해 주세요</Title>
      <Label>닉네임</Label>
      <Input
        type="text"
        placeholder="유노유노후에서 사용하실 이름을 입력해 주세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <Label>현재 거주지</Label>
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
                  {district.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </DropdownContainer>
      </DropdownWrapper>
      <SaveButton onClick={handleSave}>다음</SaveButton>
    </Form>
  </Container>
  )
}



const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f6f3;
  padding-top: 1%;
  padding-bottom: 5%;
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
  max-height: 180px;
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
