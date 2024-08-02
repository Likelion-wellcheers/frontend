import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from '../../hooks/useForm';

export const Wonderwrite = () => {
  //const { city, district } = location.state;
  const handleCommentSubmit = () => {};

  const location = useLocation();
  const navigate = useNavigate();
  const { question } = location.state || {};
  const [newComment, onChangeNewComment] = useForm("");


  // 임시 댓글 데이터
  const [comments, setComments] = useState([
    { author: '야채윤', date: '2024-07-26', content: '이런이런이런이런이런이런', authorProfilePic: '/images/profile.png' },
    { author: '김철수', date: '2024-07-27', content: '좋은 질문이에요!', authorProfilePic: '/images/profile.png' },
  ]);

  return (
    <Container>
      <MaintitleWrapper>
        <SubTitle> 지역 Q&A <SubTitle_2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z" fill="black"/>
            </svg></SubTitle_2></SubTitle>
        <Title>동네 주민들과 궁금한 점을 물어보세요</Title>
      </MaintitleWrapper>
  <Icongroup>
    <Button1 /><Button2 />
    <Icon1 src='/images/wonder_icon.png' alt='궁금 아이콘' />
    <Icon2 src='/images/search_icon.png' alt='돋보기 아이콘' />
  </Icongroup>

      <ContentWrapper>
      <TitleWrapper>
                <Titlemini>제목</Titlemini>
       </TitleWrapper>
      <CommentInputContainer>
      <TextArea
          value={newComment}
          onChange={onChangeNewComment}
          placeholder="댓글을 남겨주세요..."
        />
      </CommentInputContainer>
      </ContentWrapper>

      <ContentWrapper>
      <TitleWrapper>
                <Titlemini>내용</Titlemini>
       </TitleWrapper>
      <CommentInputContainer>
      <ContentArea
          value={newComment}
          onChange={onChangeNewComment}
          placeholder="댓글을 남겨주세요..."
        />
      </CommentInputContainer>
      </ContentWrapper>
      

      <Addfile>
      <input
          type="file"
          style={{ marginRight: '10px' }}
      />
              <Registerbutton onClick={handleCommentSubmit}>등록</Registerbutton>
      </Addfile>


      <Divider />
  </Container>
  )
}

const Addfile = styled.div`
  border-bottom: 1px black;
  display: flex;
  margin-bottom: 1%;
  width: 100%;
  margin-left: 10%;
`

const ContentWrapper=styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin-left: 10%;
`

const Registerbutton = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100px;
  font-size: 15px;
  border-radius: 4px;
  padding: 12px;
  color:rgba(255, 255, 255, 1);
  font-weight: 600;
  height: 30px;
  border: 0cap;
  background: linear-gradient(247.34deg, #BCBDFF 7.5%, #5D5FEF 62.93%);
  margin-bottom: 5%;
  margin-left: 54%;
`
const ContentBox = styled.div`
  margin-bottom: 20px;
  height: fit-content;
  padding: 3%;
  background: rgba(244, 243, 255, 1);
  border: 1px solid rgba(187, 184, 184, 1);
  border-radius: 4px;
  text-align: left;
  justify-content: left;
  color: black;
  margin-top: 1%;
`;


const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  border: 1px solid rgba(187, 184, 184, 1);
  background: rgba(244, 243, 255, 1);
  border-radius: 4px;
  margin-bottom: 5%;
`;

const TextArea = styled.textarea`
  flex: 1;
  height: 30px;
  margin-right: 10px;
  background: rgba(244, 243, 255, 1);
  border: 0cap;
`;

const ContentArea = styled.textarea`
  flex: 1;
  height: 100px;
  margin-right: 10px;
  background: rgba(244, 243, 255, 1);
  border: 0cap;
`;

const Titlemini = styled.div`
    font-weight: 600;
    //styleName: Head_sb;
    font-family: Pretendard;
    font-size: 20px;
    line-height: 30px;
    text-align: left;
`

const Container = styled.div`
    //width: 80%;
`

const MaintitleWrapper = styled.div`
    width: 100%;
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
    left: 65%; 
;`

const Button2 = styled(FloatingButton)`
    top: -100%; 
    left: 84%;  
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
  left: 84%; 
;
`
const Icon2 = styled(FloatingIcon)`
  top: -180%;  
  left: 65%;  
;`

const AuDa = styled.div`
  display: flex;
  gap: 1%;
  margin-bottom: 2%;
`

const TitleWrapper = styled.div`
    display: flex;
    gap: 1%;
    align-items: center;
    margin-bottom: 1%; 
`

const TitleIcon = styled.img`
    width: 2%;
    height: 2%;
`
/*
const Titlemini = styled.div`
    font-weight: 600;
    //styleName: Head_sb;
    font-family: Pretendard;
    font-size: 20px;
    line-height: 30px;
    text-align: left;
`


const ContentWrapper = styled.div`
  width: 80%;
  margin-left: 10%;
`
*/
const Author = styled.div`
  color: rgba(97, 93, 103, 1);
  font-size: 16px;
  font-weight: 600;
`;

const Date = styled.div`
  color: rgba(187, 184, 184, 1);
  font-size: 14px;
`;

const Content = styled.div`
color: rgba(97, 93, 103, 1);
font-size: 16px;
font-weight: 600;

`;

const Status = styled.div`

`;


const Divider = styled.hr`
  width: 100%;
  margin: 20px 0;
`;

const QuestionTitle = styled.h2`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap:1%;
  width: 90%;
`;

const ProfileImage = styled.img`
  width: 40px;
  border-radius: 4px;
  margin-right: 10px;
`;

const StatusContainer = styled.button`
  text-align: right;
  background: rgba(238, 235, 232, 1);
  border: 1px solid rgba(238, 235, 232, 1);
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.12);
`;

const Button = styled.button`
  font-size: 18px;
  background: rgba(93, 95, 239, 1);
  border-radius: 4px;
  padding: 12px;
  color:rgba(255, 255, 255, 1);
  font-weight: 600;
  border: 0cap;
`

const CommentSection = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const CommentImage = styled.img`
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const CommentBox = styled.div`
  width: 100%;
`;

const CommentContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  align-items: flex-start;
  padding-top: 2%;
  padding-bottom: 2%;
  background: rgba(248, 246, 243, 1);
`;

const CommentContent = styled.div`
  flex: 1;
`;