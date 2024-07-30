import React from 'react'
import styled from 'styled-components';

export const Magazinepart = ({ cards }) => {
  return (
    <CardWrapper>
    {cards.map((card, index) => (
      <Card key={index}>
        <CardImage src={card.image} alt={card.title} />
        <CardContent>
          <CardTitle>{card.title}</CardTitle>
          <DetailButton onClick={() => alert('Show details for ' + card.title)}>상세보기</DetailButton>
        </CardContent>
      </Card>
    ))}
  </CardWrapper>
  )
}

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  //justify-content: center;
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