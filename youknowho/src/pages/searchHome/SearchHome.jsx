import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { ThemeColorContext } from '../../context/context'

export const SearchHome = () => {
  const tempQustion = ['인프라', '라이프스타일'];
  const tempAnswer = ['공원', '교통', '도서관', '마트', '목욕탕', '문화시설'];
  const tempSubQ = ['지역에 어떤 시설이 있으면 좋겠나요?', '나의 라이프스타일은 어떤가요?'];
  
  const themeColor = useContext(ThemeColorContext);
  //선택된 답들 담는 state
  /*형식{
  0: { 0: true, 1: false, 2: true },
  1: { 0: false, 1: true, 2: false, 3: true }
  }*/
  const [selected, setSelected] = useState({});

  const handleClick = (qindex, aindex) => {
    setSelected(prevState => ({
      ...prevState,
      [qindex]: {
        ...prevState[qindex],
        [aindex]: !prevState[qindex]?.[aindex]
      }
    }));
  };

  return (
    <>
      <Banner>
        <BannerDesc>유노유노후와 함께 <br/>맞춤형 주거지를 찾아보세요!</BannerDesc>
      </Banner>
      <FilterContainer>

        {tempQustion.map((q, qindex)=>
          (<FilterItem>
            <FilterItemQuestion key={qindex}>
              <FilterItemQuestionTitle>{q}</FilterItemQuestionTitle>
              <FilterLineImg themeColor={themeColor}></FilterLineImg>
            <FilterItemQuestionSubTitle>{tempSubQ[qindex]}
            </FilterItemQuestionSubTitle>
            </FilterItemQuestion>
              <FilterItemAnswerList>
              {tempAnswer.map((a, aindex)=>
                (<FilterItemAnswerCont key={aindex} 
                  themeColor={themeColor}
                  onClick={()=>handleClick(qindex, aindex)}
                  style={{
                    borderColor: selected[qindex]?.[aindex] ? themeColor.main : "rgb(187, 184, 184)",
                    backgroundColor: selected[qindex]?.[aindex] ? "#F4F3FF" : "white"
                  }}
                >
                  <FilterItemAnswer onClick={handleClick}
                    style={{
                      backgroundColor: selected[qindex]?.[aindex] ? "#F4F3FF" : "white"
                    }}
                  >{a}</FilterItemAnswer>
                    <FilterItemAnswerCheck onClick={handleClick}
                    themeColor={themeColor}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M16.3831 8.27344H15.2839C15.0448 8.27344 14.8175 8.38828 14.6769 8.58516L10.9925 13.6945L9.32373 11.3789C9.18311 11.1844 8.95811 11.0672 8.7167 11.0672H7.61748C7.46514 11.0672 7.37608 11.2406 7.46514 11.3648L10.3855 15.4148C10.4544 15.5111 10.5454 15.5896 10.6508 15.6437C10.7561 15.6978 10.8729 15.7261 10.9913 15.7261C11.1098 15.7261 11.2265 15.6978 11.3319 15.6437C11.4372 15.5896 11.5282 15.5111 11.5972 15.4148L16.5331 8.57109C16.6245 8.44688 16.5355 8.27344 16.3831 8.27344Z" 
                      fill={selected[qindex]?.[aindex] ? "none" : "#BBB8B8"}/>
                      <path d={selected[qindex]?.[aindex] ? "M12 1.5C6.20156 1.5 1.5 6.20156 1.5 12C1.5 17.7984 6.20156 22.5 12 22.5C17.7984 22.5 22.5 17.7984 22.5 12C22.5 6.20156 17.7984 1.5 12 1.5ZM16.5352 8.57109L11.5992 15.4148C11.5302 15.5111 11.4393 15.5896 11.3339 15.6437C11.2286 15.6978 11.1118 15.7261 10.9934 15.7261C10.8749 15.7261 10.7582 15.6978 10.6528 15.6437C10.5474 15.5896 10.4565 15.5111 10.3875 15.4148L7.46484 11.3648C7.37578 11.2406 7.46484 11.0672 7.61719 11.0672H8.71641C8.95547 11.0672 9.18281 11.182 9.32344 11.3789L10.9922 13.6945L14.6766 8.58516C14.8172 8.39062 15.0422 8.27344 15.2836 8.27344H16.3828C16.5352 8.27344 16.6242 8.44688 16.5352 8.57109Z": "M12 1.5C6.20156 1.5 1.5 6.20156 1.5 12C1.5 17.7984 6.20156 22.5 12 22.5C17.7984 22.5 22.5 17.7984 22.5 12C22.5 6.20156 17.7984 1.5 12 1.5ZM12 20.7188C7.18594 20.7188 3.28125 16.8141 3.28125 12C3.28125 7.18594 7.18594 3.28125 12 3.28125C16.8141 3.28125 20.7188 7.18594 20.7188 12C20.7188 16.8141 16.8141 20.7188 12 20.7188Z"}
                      fill={selected[qindex]?.[aindex] ? themeColor.main : "#BBB8B8"}/>
                      </svg>
                    </FilterItemAnswerCheck>
                  </FilterItemAnswerCont>)
            )}</FilterItemAnswerList>
          </FilterItem>)
        )}

        <FilterSubmit themeColor={themeColor}>주거지 추천받기</FilterSubmit>
      </FilterContainer>
    </>
    
  );
};


const Banner = styled.div`
  height: 352px;
  background-image: url('images/filterbanner.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 352px;
  background-size: cover;
`

const BannerDesc = styled.div`
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  padding-top: 193px;
  padding-left: 140px;
  line-height: 150%;
`

const FilterContainer = styled.div`
  margin-top: 92px;
  margin-left: 140px;
  margin-right: 140px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 120px;
`
const FilterItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const FilterItemQuestion = styled.div`
  margin-right: 40px;
`
const FilterItemQuestionTitle = styled.div`
  color: var(--kakao-logo, #000);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  white-space: nowrap;
  padding-left: 2px;
`
const FilterItemQuestionSubTitle = styled.div`
  color: var(--Gray-01, #615D67);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  margin-top: 16px;
`

const FilterLineImg = styled.button`
  width: 125px;
  height: 4px;
  align-self: stretch;
  background: var(--Main, ${({themeColor}) => themeColor.main});
  border: none;
`
const FilterItemAnswerList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 188px);
  row-gap: 16px;
  column-gap: 12px;
`
const FilterItemAnswerCont = styled.div`
  justify-content: space-between;
  display: flex;
  width: 170px;
  height: 56px;
  align-items: center;
  background: none;
  border: 1.4px solid var(--Gray-02, rgb(187, 184, 184));
  border-radius: 8px;
  cursor: pointer;
`

const FilterItemAnswer = styled.button`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  display: flex;
  background-color: white;
  padding: 12px 16px;
  align-items: center;
  border: none;
  cursor: pointer;
`

const FilterItemAnswerCheck = styled.button`
  background: none;
  border: none;
  margin-right: 8.5px;
  cursor: pointer;
`
const FilterSubmit = styled.button`
  margin-left: 31%;
  color: var(--White, #FFF);
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  display: flex;
  width: 396px;
  height: 48px;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border-radius: 12px;
  border: none;
  background: linear-gradient(247deg, ${({themeColor}) => themeColor.sub} 7.5%,${({themeColor}) => themeColor.main} 62.93%);
`