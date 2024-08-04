import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Moremagazine = () => {
    const location = useLocation();
    const { city_codes } = location.state; // get city_codes from the location state
    const navigate = useNavigate();
    const [magazines, setMagazines] = useState([]);

    useEffect(() => {
    
        if (city_codes) {
          fetch(`https://wellcheers.p-e.kr/issue/${city_codes}/getmagazine/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setMagazines(data);
            })
            .catch((error) => {
              console.error('Error fetching magazine data:', error);
            });
        }
      }, [city_codes]);

    const handleCardClick = (id) => {
        navigate(`/eachmagazine`, { state: { id } });
    };

    return (
        <Container>
            <MaintitleWrapper>
                <SubTitle> 매거진 <SubTitle_2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z" fill="black"/>
                    </svg></SubTitle_2></SubTitle>
                <Title>동네 주민들의 생생한 목소리를 들어보세요</Title>
            </MaintitleWrapper>
            <Icongroup>
                <Button1 /><Button2 />
                <Icon1 src='/images/pink.png' alt='확성기' />
                <Icon2 src='/images/pinkbulb.png' alt='전구' />
            </Icongroup>

            <Titlewrapper>
                <Icon src='/images/message.png' />
                <LittleTitle>놓치면 안 될 매거진</LittleTitle>
            </Titlewrapper>
            <MagazineGrid>
                {magazines.map((magazine) => (
                    <MagazineCard
                        key={magazine.id}
                        onClick={() => handleCardClick(magazine.id)}
                    >
                        <MagazineImage src={magazine.image || '/images/default.png'} alt={magazine.content} />
                        <MagazineTitle>{magazine.content}</MagazineTitle>
                        <MagazineDate>{new Date(magazine.created_at).toLocaleDateString()}</MagazineDate>
                    </MagazineCard>
                ))}
            </MagazineGrid>
        </Container>
    );
};

const Titlewrapper = styled.div`
    //padding: 20px;
    display: flex;
    margin-left: 10%;
    margin-bottom: 2%;
    gap: 1%;
`;

const Icon = styled.img`
    //padding: 20px;
`;

const LittleTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
`;

const Container = styled.div`
    //padding: 20px;
`;

const MagazineGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom: 5%;
`;

const MagazineCard = styled.div`
    margin: 1%;
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
    display: flex;
    align-self: flex-start;
`;

const MagazineDate = styled.p`
    font-size: 14px;
    color: #666;
    display: flex;
    align-self: flex-start;
`;

const MaintitleWrapper = styled.div`
    //width: 100vw;
    display: flex;
    flex-direction: column;
    height: 20%;
    padding: 103px 0px;
    flex-direction: column;
    align-items: flex-start;
    border-bottom: 1px solid var(--Gray-03, #EEEBE8);
    background-color: #C1BEFF;
    align-items: center;
`

const SubTitle = styled.div`
    align-self: flex-start;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
    color: var(--Main, #5D5FEF);
    margin-bottom: 2px;
    margin-left: 10%;
  `  
 
const SubTitle_2 = styled.div`
    align-self: flex-start;
    display: inline-flex;
    margin-top: 1%;
`
const Title = styled.div`
    align-self: flex-start;
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    margin-left: 10%;
`

const Icongroup = styled.div`
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    gap: 20px;
    position: relative;
    margin: 0;
    height: 100px;
`
const FloatingButton = styled.button`
    width: 236px;
    height: 80px;
    top: 199.88px;
    left: 1338px;
    border-radius: 40px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
    border: 0;
    position: absolute;
    z-index: 1000;
    transform: translate(-50%, -50%); 
;`

const Button1 = styled(FloatingButton)`
    top: -150%;  
    left: 67%; 
;`

const Button2 = styled(FloatingButton)`
    top: -100%; 
    left: 86%;  
;`

const FloatingIcon = styled.img`
  width: 110px;
  height: auto;
  position: absolute;
  z-index: 1000;
  transform: translate(-50%, -50%); 
;`

const Icon1 = styled(FloatingIcon)`
  top: -130%; 
  left: 86%; 
;
`
const Icon2 = styled(FloatingIcon)`
  top: -180%;  
  left: 68%;  
;`
