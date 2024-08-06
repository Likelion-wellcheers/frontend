import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Magazinepart = ({ city_codes }) => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const [randint, setRandint] = useState();
  const [isDefault, setIsDefault] = useState(false);
  const defaultTitle = ["매력적인 동네탐방", "노후생활에 적합한 지역", "주민들의 이야기"];

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomSubset(arr, size) {
    const result = [];
    const usedIndices = new Set();
    while (result.length < size) {
        const index = getRandomInt(0, arr.length - 1);
        if (!usedIndices.has(index)) {
            result.push(arr[index]);
            usedIndices.add(index);
        }
    }
    return result;
}

  useEffect(() => {
    const numbers = [1, 2, 3, 4, 5];
    const selectedNumbers = getRandomSubset(numbers, 3);
    setRandint(selectedNumbers);

    if (city_codes) {
      fetch(`https://wellcheers.p-e.kr/issue/${city_codes}/getmagazine/`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setCards(data);
            console.log(data);
            if(data.length <= 2 ) {
              setIsDefault(true);
            } 
          } else {
            setCards([data]); // 데이터를 배열로 변환
          }
        })
        .catch((error) => {
          console.error('Error fetching magazine data:', error);
        });
        console.log('r',randint);
    }
  }, [city_codes]);

  if (!cards) {
    return <div>Loading...</div>;
  }

  if(isDefault && randint){
    return(
      <CardWrapper>
      {[0,1,2].map((idx) => (
        <Card key={idx}>
          <CardImage src={`images/defMag${idx}.png`} alt="매거진 이미지"/>
          <CardContent>
            <CardTitle>{defaultTitle[idx]}</CardTitle>
            <DetailButton onClick={() => navigate('/eachmagazine', { state: { is_default: isDefault} })}>상세보기</DetailButton>
          </CardContent>
        </Card>
      ))}
    </CardWrapper>
    )
  }

  return (
    <CardWrapper>
      {cards.slice(0, 3).map((card, index) => (
        <Card key={index}>
          <CardImage src={card ? card.image : `/images/defMag${randint[index]}.png`} alt={card.content} />
          <CardContent>
            <CardTitle>{card.content}</CardTitle>
            <DetailButton onClick={() => navigate('/eachmagazine', { state: { id: card.id, region_id: card.region_id , is_default: isDefault} })}>상세보기</DetailButton>
          </CardContent>
        </Card>
      ))}
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2% 6%;
  width: 1240px;
`;

const Card = styled.div`
  width: 30%;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
`;

const CardContent = styled.div`
  padding: 10px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;
  margin-left: 5px;
`;

const CardTitle = styled.h3`
  margin: 3px 0 10px;
  font-size: 1.2rem;
`;

const DetailButton = styled.button`
  padding: 10px;
  border: none;
  background: linear-gradient(247.34deg, #BCBDFF 7.5%, #5D5FEF 62.93%);
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  height: fit-content;
  //float: right;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;