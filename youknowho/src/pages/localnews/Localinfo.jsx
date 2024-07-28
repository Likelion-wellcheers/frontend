import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeColorContext } from '../../context/context';

export const Localinfo = () => {
    const location = useLocation();
    const { city, district } = location.state;

    // 임시 데이터, 나중에 패치해야 됨
    const localData = {
        "서울특별시": {
            "강남구": {
                requests: [
                    { id: 1, writer: '야채윤경', date: '2023-07-26', content: '흑석동 안 시끄럽나요?' },
                    { id: 2, writer: '야채윤경', date: '2023-07-26', content: '어디어디 사진 좀 올려주세요~' }
                ],
                welfare: [
                    { id: 1, title: '서울특별시 강남구 복지정책' },
                    { id: 2, title: '서울특별시 강남구 복지정책' }
                ],
                magazines: [
                    { id: 1, title: '카드뉴스 제목1', img: '/images/magazineDefault.png' },
                    { id: 2, title: '카드뉴스 제목2', img: '/images/magazineDefault.png' }
                ],
                reviews: [
                    { id: 1, user: 'user1', content: '동네가 아주 깨끗하고 좋아요!' },
                    { id: 2, user: 'user2', content: '교통이 편리해요.' }
                ]
            }
        }
    };

    const themeColor = useContext(ThemeColorContext);
    const data = localData[city]?.[district] || {};

    return (
        <Container>
            <Title>
                <Buttonbox><LocalButton themeColor={themeColor}>{city} {district}</LocalButton></Buttonbox>
                <h3>의 소식을 알아보세요!</h3>
            </Title>

            <SectionTitle>
                    <img src="/images/icon.png" alt="Icon" />
                    <Subtitle>궁금증 해소하기</Subtitle>
            </SectionTitle>

            <Section>
            <Wrapper>
                <BlueBox themeColor={themeColor}>
                    <img src="/images/megaphone.png" alt="Megaphone" />
                    <div>요청하기</div>
                    <Content>동네 주민들에게 요청사항을 부탁해 보세요!</Content>
                </BlueBox>
                <RequestWrapper>
                    <RequestTitle>의뢰인의 요청사항</RequestTitle>
                    <Request>
                        {data.requests?.map(request => (
                            <RequestBox key={request.id}>
                                <h3>{request.writer}</h3>
                                <p>{request.date}</p>
                                <p>{request.content}</p>
                                <RequestButton>미해결</RequestButton>
                            </RequestBox>
                        ))}
                    </Request>
                </RequestWrapper>
            </Wrapper>
            </Section>

            <SectionTitle>
                    <img src="/images/icon2.png" alt="Icon" />
                    <Subtitle>놓치면 안 될 복지정책</Subtitle>
            </SectionTitle>

            <Section>
                <WelfareWrapper>
                    {data.welfare?.map(welfare => (
                        <WelfareBox key={welfare.id}>
                            <h3>{welfare.title}</h3>
                        </WelfareBox>
                    ))}
                </WelfareWrapper>
            </Section>

            <SectionTitle>
                    <img src="/images/icon3.png" alt="Icon" />
                    <Subtitle>놓치면 안 될 매거진</Subtitle>
                    <MoreButton>더보기 +</MoreButton>
            </SectionTitle>
            <Section>
                <MagazineWrapper>
                    {data.magazines?.map(magazine => (
                        <MagazineItem key={magazine.id}>
                            <MagazineImg src={magazine.img} alt="Magazine" />
                            <p>{magazine.title}</p>
                            <button>상세보기</button>
                        </MagazineItem>
                    ))}
                </MagazineWrapper>
            </Section>
    
            <ReviewWrapper themeColor={themeColor}>
            <SectionTitle>
                    <img src="/images/icon4.png" alt="Icon" />
                    <DifferentSubtitle>우리 동네 후기</DifferentSubtitle>
            </SectionTitle>

            <ReviewSection>
                {data.reviews?.map(review => (
                    <ReviewBox key={review.id}>
                        <p><strong>{review.user}</strong></p>
                        <p>{review.content}</p>
                    </ReviewBox>
                ))}
            </ReviewSection>
            </ReviewWrapper>

        </Container>
    );
};



const Container = styled.div`
    background-color: white;
`;

const Title = styled.div`
    display: flex;
    margin-left: 10%;
    text-align: center;
    margin-bottom: 20px;
`;

const LocalButton = styled.button`
    background-color: ${({themeColor})=>themeColor.main};
    color: white;
    padding: 10px 10px;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 900;
    width: 200px;
`;

const Buttonbox = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1%;
`

const Section = styled.section`
    display: flex;
    margin-bottom: 40px;
    align-items: center;
    justify-content: center;
`;

const SectionTitle = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-left: 10%;

    img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }
`;

const Subtitle = styled.h2`
    font-size: 18px;
    font-weight: 600;
`;

const DifferentSubtitle = styled.h2`
    font-size: 18px;
    font-weight: 600;
    color: white;
`;

const Wrapper = styled.div`
    display: flex;
    width: 80%;
    height: auto;
    gap: 2%;
    align-items: center;
    justify-content: center;
`

const BlueBox = styled.div`
    background-color: ${({themeColor})=>themeColor.main};
    width: 10%;
    color: white;
    padding: 9%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;

    img {
        width: 100px;
        height: 100px;
        margin-right: 10px;
    }

    div {
        font-size: 18px;
        font-weight: bold;
    }
`;

const Content = styled.p`
    //margin-left: 50px;
`;

const RequestWrapper = styled.div`
    width: 70%;
    background-color: white;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 10px;
`;

const RequestTitle = styled.h3`
    font-size: 18px;
    margin-bottom: 20px;
`;

const Request = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const RequestBox = styled.div`
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;

    h3 {
        font-size: 16px;
        margin: 0;
    }

    p {
        margin: 5px 0;
    }
`;

const RequestButton = styled.button`
    background-color: #ff6f61;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
`;

const WelfareWrapper = styled.div`
    display: flex;
    gap: 10px;
`;

const WelfareBox = styled.div`
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;

    h3 {
        font-size: 16px;
        margin: 0;
    }
`;

const MagazineWrapper = styled.div`
    display: flex;
    gap: 10px;
`;

const MagazineItem = styled.div`
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    text-align: center;

    p {
        margin: 10px 0;
    }

    button {
        background-color: #5d5fef;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 5px;
        font-size: 14px;
    }
`;

const MagazineImg = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
`;

const ReviewSection = styled.section`
    display: flex;
    margin-top: 40px;
`;

const ReviewBox = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #ddd;
    margin-bottom: 10px;

    p {
        margin: 5px 0;
    }
`;

const MoreButton = styled.button`
    background-color: #5d5fef;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
    align-self: flex-end;
`;

const ReviewWrapper = styled.div`
    background-color: ${({themeColor})=>themeColor.main};
`;

export default Localinfo;
