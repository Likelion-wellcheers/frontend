import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Mainwonder = () => {
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

    const mockQuestions = [
        { author: '사용자1', date: '2023-07-26', question: '혹석은 몇 시에 끝나나요?', status: '미답변', profile: '/images/profile.png'},
        { author: '사용자2', date: '2023-07-25', question: '주차장은 어디에 있나요?', status: '답변완료', profile: '/images/profile.png'},
        { author: '사용자2', date: '2023-07-25', question: '주차장은 어디에 있나요?', status: '답변완료', profile: '/images/profile.png'},
        { author: '사용자2', date: '2023-07-25', question: '주차장은 어디에 있나요?', status: '답변완료', profile: '/images/profile.png'},
        { author: '사용자2', date: '2023-07-25', question: '주차장은 어디에 있나요?', status: '답변완료', profile: '/images/profile.png'},
        { author: '사용자2', date: '2023-07-25', question: '주차장은 어디에 있나요?', status: '답변완료', profile: '/images/profile.png'}
      ];
    
      const mockMyQuestions = [
        { location: '서울시 홍대구', date: '2023-07-26', question: '어린이 놀이터는 어디에 있나요?', status: '답변완료' },
        { location: '서울시 강남구', date: '2023-07-27', question: '주차장은 어디에 있나요?', status: '답변완료' },
        { location: '서울시 마포구', date: '2023-07-28', question: '병원은 어디에 있나요?', status: '답변완료' },
        { location: '서울시 서대문구', date: '2023-07-29', question: '식당은 어디에 있나요?', status: '답변완료' },
        { location: '서울시 동작구', date: '2023-07-30', question: '공원은 어디에 있나요?', status: '답변완료' },
        { location: '서울시 성북구', date: '2023-07-31', question: '지하철역은 어디에 있나요?', status: '답변완료' },
        { location: '서울시 은평구', date: '2023-08-01', question: '도서관은 어디에 있나요?', status: '답변완료' },
      ];
    
      const mockMyAnswers = [
        { location: '서울시 홍대구', date: '2023-07-26', question: '어린이 놀이터는 어디에 있나요?', status: '답변완료' },
        { location: '서울시 강남구', date: '2023-07-27', question: '주차장은 어디에 있나요?', status: '답변완료' },
        { location: '서울시 마포구', date: '2023-07-28', question: '병원은 어디에 있나요?', status: '답변완료' },
        { location: '서울시 서대문구', date: '2023-07-29', question: '식당은 어디에 있나요?', status: '답변완료' },
        { location: '서울시 동작구', date: '2023-07-30', question: '공원은 어디에 있나요?', status: '답변완료' },
        { location: '서울시 성북구', date: '2023-07-31', question: '지하철역은 어디에 있나요?', status: '답변완료' },
        { location: '서울시 은평구', date: '2023-08-01', question: '도서관은 어디에 있나요?', status: '답변완료' },
      ];

      const [questions, setQuestions] = useState(mockQuestions);
      const [myQuestions, setMyQuestions] = useState(mockMyQuestions);
      const [myAnswers, setMyAnswers] = useState(mockMyAnswers);

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setShowCityDropdown(false);
    };

    const handleDistrictSelect = (district) => {
        setSelectedDistrict(district);
        setShowDistrictDropdown(false);
    };

    const handleSearchClick = () => {
        if (selectedCity && selectedDistrict) {
            navigate('/wonderwrite', { state: { city: selectedCity, district: selectedDistrict} });
        }
    };
  
    const handleAnswerClick = (question) => {
        navigate('/answer', { state: { question } });
    };

    const handleQuestionClick = (question) => {
        navigate('/question', { state: { question } });
    };
  return (
    <Container>
    <MaintitleWrapper>
        <SubTitle> 지역 Q&A <SubTitle_2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z" fill="black"/>
            </svg></SubTitle_2></SubTitle>
        <Title>동네 주민들과 궁금한 점을 묻고 답해보세요</Title>
    </MaintitleWrapper>
    <Icongroup>
        <Button1 /><Button2 />
        <Icon1 src='/images/wonder_icon.png' alt='궁금 아이콘' />
        <Icon2 src='/images/search_icon.png' alt='돋보기 아이콘' />
    </Icongroup>
    <ContentWrapper>
        <AskWrapper>
            <TitleWrapper>
                <TitleIcon src='/images/twinkle.png' alt='반짝 아이콘'/>
                <Titlemini>물어보세요</Titlemini>
            </TitleWrapper>
            <Bigbutton onClick={handleSearchClick()}>
                <div>궁금한 지역을 선택하고, 동네 주민들에게 궁금한 점을 물어보세요!</div>
                <SearchWrapper>
                <DropdownWrapper>
                <DropdownContainer>
                    <DropdownButton onClick={() => setShowCityDropdown(!showCityDropdown)}>
                        {selectedCity}
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
                        {selectedDistrict}
                    </DropdownButton>
                    {showDistrictDropdown && (
                        <DropdownMenu>
                            {districts.map((district, index) =>  (
                                <DropdownItem key={index}  onClick={() => handleDistrictSelect(district)}>
                                    {district}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    )}
                </DropdownContainer>
                </DropdownWrapper>
                    <SearchIcon src='/images/dotbogi.png' alt='흰색 돋보기' />
                </SearchWrapper>
            </Bigbutton>
        </AskWrapper>
        <AnswerWrapper>
            <TitleWrapper>
                <TitleIcon src='/images/bulb.png' alt='전구 아이콘'/>
                <Titlemini>답해보세요</Titlemini>
            </TitleWrapper>

            <Section>
            <Wrapper>
            
                <BlueBox>
                    <img src="/images/megaphone.png" alt="Megaphone" />
                    <RequestTitle>답변하기</RequestTitle>
                    <Content>윤경님의 지역에 대한 질문들에 답해보세요!</Content>
                </BlueBox>
                
                <RequestWrapper>
                    <Answerpartitle>주민들의 궁금증</Answerpartitle>
                    {questions.map((q, index) => (
                        <Cardwrapper>
                        <RequestBox key={index}>
                            <Oneline>
                                <Profile src={q.profile} /><Name>{q.author}</Name><Date>{q.date}</Date>
                            </Oneline>
                        <RequestContent><div>{q.question}</div></RequestContent>
                        <Doanswer onClick={() => handleAnswerClick(q)}><Lineimg src='/images/worm.png' /><Doanswertext><div>답변하기</div></Doanswertext></Doanswer>
                        </RequestBox>
                        <State><StateImg src='/images/loading.png'></StateImg><div>{q.status}</div></State>
                        </Cardwrapper>
                    ))}
                </RequestWrapper>
                    </Wrapper>
                    </Section>
        </AnswerWrapper>
        <MyAnsQues>
      <TitleWrapper>
        <TitleIcon src='/images/like.png' alt='좋아요 아이콘'/>
        <Titlemini>나의 질문 및 답변</Titlemini>
      </TitleWrapper>
      <Boxwrapper>
        <Otherwrapper>
        <Boxbutton>나의 질문</Boxbutton>
        <Boxcontainer>
          <QuestionList>
            {myQuestions.slice(0, 6).map((q, index) => (
              <QuestionItem onClick={() => handleQuestionClick(q)} key={index}>
                <LeftContent>
                    <Loda>
                    <Name>{q.location}</Name>
                    <Date>{q.date}</Date>
                    </Loda>
                  <div>{q.question}</div>
                </LeftContent>
                <RightContent>
                  <StateImg src='/images/loading.png' alt="status icon" />
                  <div>{q.status}</div>
                </RightContent>
              </QuestionItem>
            ))}
          </QuestionList>
        </Boxcontainer>

        </Otherwrapper>
        <Otherwrapper>
        <Boxbutton>나의 답변</Boxbutton>
        <Boxcontainer>
          <QuestionList>
            {myAnswers.slice(0, 6).map((q, index) => (
              <QuestionItem onClick={() => handleAnswerClick(q)} key={index}>
                <LeftContent>
                    <Loda>
                    <Name>{q.location}</Name>
                    <Date>{q.date}</Date>
                    </Loda>
                  <div>{q.question}</div>
                </LeftContent>
                <RightContent>
                  <StateImg src='/images/loading.png' alt="status icon" />
                  <div>{q.status}</div>
                </RightContent>
              </QuestionItem>
            ))}
          </QuestionList>
        </Boxcontainer>
        </Otherwrapper>
      </Boxwrapper>
    </MyAnsQues>
    </ContentWrapper>
    </Container>
  )
}

const Loda = styled.div`
    display: flex;
    gap: 5%;
    width: 130%;
`

const Otherwrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Boxwrapper = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 15%;
  margin-left: 6%;
  margin-top: 7%;
`;

const Boxcontainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 130%;
  max-height: 500px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(187, 184, 184, 1);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
  padding: 17px, 46px, 17px, 46px;
  border-radius: 8px;
`;

const Boxbutton = styled.button`
  color: white;
  padding: 8px, 24px, 8px, 24px;
  border: none;
  cursor: pointer;
  background: rgba(93, 95, 239, 1);
  border-radius: 4px;
  width: 130px;
  height: 50px;
  margin-top: -30px;
  margin-right: 250px;
  position: absolute;
  font-weight: 600;
  font-size: 16px;
`;

const QuestionList = styled.div`
  margin-top: 20px;
`;

const QuestionItem = styled.div`
  border-bottom: 1px solid black;
  background: white;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 40px;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const RightContent = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5%;
  gap: 5px;
    width: 100px;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    color: rgba(97, 93, 103, 1);
`;

const StatusImage = styled.img`
  width: 20px;
  height: 20px;
`;

const Cardwrapper = styled.div`
    padding-left: 3%;
    padding-bottom: 1%;
    border-radius: 5px;
    margin-top: 2%;
    display: flex;
    align-items: self-end;

    background: rgba(244, 243, 255, 1);
    border: 1px solid rgba(93, 95, 239, 1);

    h3 {
        font-size: 16px;
        margin: 0;
    }

    p {
        margin: 5px 0;
    }
;`

const RequestBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    margin-top: 4%;
    margin-bottom: 2%;
`

const RequestContent = styled.div`
    margin-left: 9%;
    margin-bottom: 3%;
`
const Oneline = styled.div`
    display: flex;
    gap: 2%;
`
const Profile = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 4px;
`
const Name = styled.div`
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 600;
    text-align: left;
`
const Date = styled.div`
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    color: rgba(187, 184, 184, 1);
`
const State = styled.div`
    gap: 5px;
    width: 100px;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    color: rgba(97, 93, 103, 1);
    display: flex;
    margin-bottom: 90px;
    //margin-top: 1%;
    //margin-right: 2px;
`
const StateImg = styled.img`
    height:10px;
    margin-top: 5%;
`
const Doanswer = styled.div`
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    color: rgba(97, 93, 103, 1);
    display: flex;
    gap: 1%;
    margin-left: 10%;
`
const Doanswertext = styled.p`
    border-bottom: 1px solid rgba(97, 93, 103, 1);
    //styleName: Body;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
`
const Lineimg = styled.img`
    width: 20px;
    height: 20px;
`
const Answerpartitle = styled.h2`
  margin-bottom: 1%;
  padding: 10px;
  font-size: 18px;
  border-bottom: 1px solid #ccc;
  border-radius: 10px 10px 0 0;
`;

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    gap: 2%;
    align-items: center;
    justify-content: center;
`

const BlueBox = styled.div`
    background-color: rgba(93, 95, 239, 1);
    width: 15%;
    height: 100%;
    color: white;
    padding: 7%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 100px;
        height: 100px;
        margin-top: 12px;
        margin-right: 10px;
        margin-bottom: 40%;
    }

    div {
        font-size: 24px;
        font-weight: 700;
        line-height: 36px;
        text-align: center;
        color: rgba(255, 255, 255, 1);
    }
;`

const Content = styled.p`
    //margin-left: 50px;
    width: 165px;
    height: 48px;
    //styleName: Body;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
        line-height: 24px;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    margin-top: -5%;
`;

const RequestWrapper = styled.div`
    width: 85%;
    height: 100%;
    background-color: white;
    border: 1px solid #ddd;
    padding-right: 5%;
    padding-left: 5%;
    padding-bottom: 3%;
    border-radius: 10px;
    max-height: 420px;
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


const RequestTitle = styled.h3`
    font-size: 18px;
    margin-bottom: 20px;
`

const Request = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const RequestButton = styled.button`
    background-color: #ff6f61;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
;`

const Section = styled.div`
    display: flex;
    margin-bottom: 40px;
    align-items: center;
    justify-content: center;
    width: 113%;
`

const SearchWrapper = styled.div`
    display: flex;
    gap: 10%;
    align-items: center;
`

const Bigbutton = styled.button`
    width: 113%;
    height: 30%;
    padding: 3%;
    gap: 10px;
    border-radius: 100px;
    border: 1px;
    background: rgba(93, 95, 239, 1);
    border: 1px solid rgba(93, 95, 239, 1);
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 5%;

    //styleName: Main_sb;
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 600;
    line-height: 27px;
    text-align: center;
    color: white;
`
const MyAnsQues = styled.div`
    height: fit-content;
    //display: flex;
    align-items: center;
    margin-bottom: 20px;
`

const AnswerWrapper = styled.div`
    height: fit-content;
`

const TitleWrapper = styled.div`
    display: flex;
    gap: 1%;
    align-items: center;
    margin-bottom: 2%; 
`

const TitleIcon = styled.img`
    width: 2%;
    height: 2%;
`
const SearchIcon = styled.img`
    width: 30px;
    height: 30px;
    margin-top: 10px;
`

const Titlemini = styled.div`
    font-weight: 600;
    //styleName: Head_sb;
    font-family: Pretendard;
    font-size: 20px;
    line-height: 30px;
    text-align: left;
`

const AskWrapper = styled.div`
    height: fit-content;
`

const ContentWrapper = styled.div`
    margin-left: 13%;
`

const Container = styled.div`
    width: 80%;
`

const MaintitleWrapper = styled.div`
    width: 100vw;
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
const Title = styled.div`
    align-self: flex-start;
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    margin-left: 10%;
`
    
const SubTitle_2 = styled.div`
    align-self: flex-start;
    display: inline-flex;
    margin-top: 1%;
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
    left: 80%; 
;`

const Button2 = styled(FloatingButton)`
    top: -100%; 
    left: 104%;  
;`

const FloatingIcon = styled.img`
  width: 120px;
  height: auto;
  position: absolute;
  z-index: 1000;
  transform: translate(-50%, -50%); 
;`

const Icon1 = styled(FloatingIcon)`
  top: -130%; 
  left: 104%; 
;
`
const Icon2 = styled(FloatingIcon)`
  top: -180%;  
  left: 80%;  
;`


const DropdownContainer = styled.div`
    position: relative;
    margin-top: 10px;
;`

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
;
`
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
;`

const DropdownItem = styled.div`
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    color: #333;

    &:hover {
        background-color: rgba(193, 190, 255, 0.2);
    }
;`

const DropdownWrapper = styled.div`
    display: flex;
    gap: 5%; 

`