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
  margin: 5% 5%;
  width: 1200px;
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
  padding: 16px;
`;

const CardTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 1.2rem;
`;

const DetailButton = styled.button`
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;