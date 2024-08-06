import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Welfare } from './Welfare';
import { Magazinepart } from './Magazinepart';
import { Reviewpart } from './Reviewpart';

export const Localinfo = () => {
    const location = useLocation();
    const { city, district, city_codes } = location.state;
    const navigate = useNavigate();

    return (
      <PageWrapper>
      <Bgimage />
      <Content>
          <SectionTitle>
              <LocalButton>{city} {district}</LocalButton>의 소식을 알아보세요!
          </SectionTitle>
          <SubTitle>
              <Icon src='/images/icon2.png' alt='복지정책 아이콘' />
              놓치면 안 될 복지정책
          </SubTitle>
          <Welfare city_codes={city_codes} />
          <SubTitle>
              <Icon src='/images/icon3.png' alt='매거진 아이콘' />
              놓치면 안 될 매거진
              {/* <MoreButton onClick={() => navigate('/moremagazine', { state: { city_codes } })}>더보기</MoreButton> */}
          </SubTitle>
          <Magazinepart city_codes={city_codes} />
          <Reviewpart city_codes={city_codes} city={city} district={district}/>
      </Content>
      </PageWrapper>
    )
}


const PageWrapper = styled.div`
  position: relative;
  max-width: 100%;
  overflow: hidden; /* 필요에 따라 조정 */
  background-color: rgba(93, 95, 239, 1);
  ;
`;

const Bgimage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 862px; /* 필요에 따라 조정 */
  background: rgba(255, 255, 255, 1);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
  border-radius: 0px 0px 24px 24px;
  z-index: 1;
  padding-bottom: 2%;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled.h2`
  max-width: 1200px;
  margin: 0 auto 20px auto;
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 50px;
  margin-top: 50px;
`;

const SubTitle = styled.h3`
  max-width: 1200px;
  margin: 40px auto;
  display: flex;
  align-items: center;
  margin-bottom: 2%;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const MoreButton = styled.button`
  padding: 10px;
  margin-left: 77%;
  border: none;
  background: linear-gradient(247.34deg, #BCBDFF 7.5%, #5D5FEF 62.93%);

  ;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const LocalButton = styled.button`
  background-color: rgba(93, 95, 239, 1);
  color: white;
  gap: 10px;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  font-weight: 900;
  white-space: nowrap;
  margin-right: 10px;
  padding: 4px 10px;
`;