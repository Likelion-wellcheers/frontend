import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StatusButton from '../../apis/StatusButton';

export const Mainwonder = () => {
    const [cities] = useState([
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
    ]);
    const [districts, setDistricts] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [myQuestions, setMyQuestions] = useState([]);
    const [myAnswers, setMyAnswers] = useState([]);
    const [error, setError] = useState(null);

    //도시에 따른 시, 구 패치
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
    }, [selectedCity, navigate]);


    //주민 궁금증 리스트 패치
    useEffect(() => {
        const fetchQuestions = async () => {
          try {
            const accessToken = localStorage.getItem("access"); 
            const response = await axios.get('https://wellcheers.p-e.kr/qna/question/', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            setQuestions(response.data);
          } catch (error) {
            setError(error);
          }
        };
    
        fetchQuestions();
      }, []);

      useEffect(() => {
        const fetchMyQuestions = async () => {
          try {
            const accessToken = localStorage.getItem("access");
            const response = await axios.get('https://wellcheers.p-e.kr/qna/myquestion/', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            setMyQuestions(response.data);
          } catch (error) {
            setError(error);
          }
        };
    
        fetchMyQuestions();
      }, []);

      useEffect(() => {
        const fetchMyAnswers = async () => {
          try {
            const accessToken = localStorage.getItem("access");
            const response = await axios.get('https://wellcheers.p-e.kr/qna/myanswer/', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            setMyAnswers(response.data);
          } catch (error) {
            setError(error);
          }
        };
    
        fetchMyAnswers();
      }, []);

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setShowCityDropdown(false);
    };

    const handleDistrictSelect = (district) => {
        setSelectedDistrict(district);
        setShowDistrictDropdown(false);

        if (selectedCity && district) {
            const selectedCityCode = districts.find(d => d.name === district)?.city_code;
            if (district === '전체보기') {
                navigate('/wonderwrite', { state: { city_codes: [selectedCityCode] } });
            } else {
                console.log('Selected district:', district);
                console.log('Selected city_code:', selectedCityCode); // 선택된 district와 city_code 확인
                navigate('/wonderwrite', { state: { city: selectedCity, district: district } });
            } 
        }
    };
  
    const handleAnswerClick = (question) => {
        const { id, nickname, profileimage_url, title, content, finish, created_at } = question;
        navigate('/answer', { 
            state: { 
                id, 
                nickname, 
                profileimage_url, 
                title, 
                content, 
                finish, 
                created_at 
            } 
        });
    };

    const handleQuestionClick = (question) => {
        const { id, nickname, profileimage_url, title, content, finish, created_at } = question;
        navigate('/question', { 
            state: { 
                id, 
                nickname, 
                profileimage_url, 
                title, 
                content, 
                finish, 
                created_at 
            } 
        });
    };

    const handleSearchClick = () => {
        if (selectedCity && selectedDistrict) {
            navigate('/wonderwrite', { state: { city: selectedCity, district: selectedDistrict} });
        }
    };

    return (
        <Container>
            <MaintitleWrapper>
                <SubTitle> 지역 Q&A <SubTitle_2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z" fill="black"/>
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
                    <Bigbutton onClick={handleSearchClick}>
                        <div>궁금한 지역을 선택하고, 동네 주민들에게 궁금한 점을 물어보세요!</div>
                        <SearchWrapper>

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
                                                <DropdownItem key={index} onClick={() => handleDistrictSelect(district.name)}>
                                                    {district.name}
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
                                <Content>회원님의 지역에 대한 질문들에 답해보세요!</Content>
                            </BlueBox>
                            
                            <RequestWrapper>
                                <Answerpartitle>주민들의 궁금증</Answerpartitle>
                                {questions.map((q, index) => (
                                    <Cardwrapper key={index}>
                                        <RequestBox>
                                            <Oneline>
                                                <Profile src={q.profileimage_url || '/images/profile.png'} alt="Profile" />
                                                <Name>{q.nickname || 'Unknown User'}</Name>
                                                <Date>{q.created_at.substr(0,10) || 'Unknown Date'}</Date>
                                                <Status>
                                                    <StatusButton finish={q.finish} />
                                                </Status>
                                            </Oneline>
                                            <RequestContent>
                                                <div>{q.title}</div>
                                                <div>{q.content}</div>
                                            </RequestContent>
                                            <Doanswer onClick={() => handleAnswerClick(q)}>
                                                <Lineimg src='/images/worm.png' alt="Answer" />
                                                <Doanswertext>
                                                    <div>답변하기</div>
                                                </Doanswertext>
                                            </Doanswer>
                                        </RequestBox>
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
                                                <Name>{q.nickname}</Name>
                                                <Date>{q.created_at.substr(0,10)}</Date>
                                            </Loda>
                                            <div>{q.title}</div>
                                            <div>{q.content}</div>
                                        </LeftContent>
                                        <RightContent>
                                            <State>
                                                <StatusButton finish={q.finish} />
                                            </State>
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
                                    {myAnswers.slice(0, 6).map((a, index) => (
                                        <QuestionItem onClick={() => handleAnswerClick(a)} key={index}>
                                            <LeftContent>
                                                <Loda>
                                                    <Name>{a.nickname}</Name>
                                                    <Date>{a.created_at.substr(0,10)}</Date>
                                                </Loda>
                                                <div>{a.title}</div>
                                                <div>{a.content}</div>
                                            </LeftContent>
                                            <RightContent>
                                                <State>
                                                    <StatusButton finish={a.finish} />
                                                </State>
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

const Status = styled.div`
    margin-left: 53%;
`

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
  width: 100%;
  gap: 5%;
  margin-left: 4%;
  margin-top: 7%;
`;

const Boxcontainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1%;
  width: 500px;
  height: 450px;
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
  margin-top: -27px;
  margin-right: 300px;
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
  width: 95%;
  gap: 5px;
  //styleName: Body;

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
    white-space: nowrap;
`
const Date = styled.div`
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    color: rgba(187, 184, 184, 1);
`
const State = styled.div`
    margin-left: 3%;
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
    margin-bottom: 10%;
`

const Container = styled.div`
    width: 80%;
`

const MaintitleWrapper = styled.div`
    //width: 100vw;
    width: 125%;
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