import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export const Question = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { question } = location.state || {};
  const [newComment, onChangeNewComment] = useForm("");


  // 임시 댓글 데이터
  const [comments, setComments] = useState([
    { author: '야채윤', date: '2024-07-26', content: '이런이런이런이런이런이런', authorProfilePic: '/images/profile.png' },
    { author: '김철수', date: '2024-07-27', content: '좋은 질문이에요!', authorProfilePic: '/images/profile.png' },
  ]);

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newComments = [
        ...comments,
        { author: '야채윤', date: new Date().toISOString().split('T')[0], content: newComment, authorProfilePic: 'url_to_profile_image' },
      ];
    }
  };

  return (
    <Container>
    <Title>지역 Q&A</Title>
    <Divider />
    <ContentWrapper>
    {question ? (
      <div>
        <QuestionTitle>제목제목제목자리</QuestionTitle>
        <InfoRow>
          <AuthorInfo>
            <ProfileImage src={question.profile} alt="Profile" />
              <Author><strong>{question.author}</strong></Author>
              <Date>{question.date}</Date>
          </AuthorInfo>
          <StatusContainer>
            <Content>{question.status}</Content>
            <Status alt="Status" style={{ width: '20px' }} />
          </StatusContainer>
        </InfoRow>
        <Divider />
        <Button>서울특별시 동작구</Button>
        <ContentBox><div>{question.question}</div></ContentBox>
      </div>
    ) : (
      <p>없음</p>
    )}

    <TitleWrapper>
              <TitleIcon src='/images/comment.png' alt='전구 아이콘'/>
              <Titlemini>댓글</Titlemini>
     </TitleWrapper>
    <CommentSection>
      <CommentBox>
        {comments.map((comment, index) => (
          <CommentContainer key={index}>
            <ProfileImage src={comment.authorProfilePic} alt="Profile" style={{ width: '30px' }} />
            <CommentContent>
              <AuDa>
                <Author><strong>{question.author}</strong></Author>
                <Date>{question.date}</Date>
              </AuDa>
              <Content>{comment.content}</Content>
            </CommentContent>
          </CommentContainer>
        ))}
      </CommentBox>
    </CommentSection>

    <CommentInputContainer>
      <TextArea
        value={newComment}
        onChange={onChangeNewComment}
        placeholder="댓글을 남겨주세요..."
      />
      <input
        type="file"
        style={{ marginRight: '10px' }}
      />
      <Registerbutton onClick={handleCommentSubmit}>등록</Registerbutton>
    </CommentInputContainer>
    </ContentWrapper>

    <SolveWrapper>
      <SolveContent>궁금증이 해결되셨나요?</SolveContent>
      <Solvebutton>굼긍증 해결완료!</Solvebutton>
    </SolveWrapper>
  </Container>
  )
}

const SolveWrapper = styled.div`
display: flex;
flex-direction: column;
text-align: center;
align-items: center;
`
const SolveContent = styled.div`
color: rgba(97, 93, 103, 1);
font-size: 14px;
font-weight: 500;
margin-bottom: 1%;
`
const Solvebutton = styled.div`
background: linear-gradient(247.34deg, #BCBDFF 7.5%, #5D5FEF 62.93%);
box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.12);
width: 30%;
padding: 12px;
color: white;
margin-bottom: 5%;
border-radius: 12px;
`

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

const Container = styled.div`
  //text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: rgba(93, 95, 239, 1);
  //styleName: Head_sb;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
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

const Button = styled.button`
  font-size: 18px;
  background: rgba(93, 95, 239, 1);
  border-radius: 4px;
  padding: 12px;
  color:rgba(255, 255, 255, 1);
  font-weight: 600;
  border: 0cap;
`

const Registerbutton = styled.button`
  display: flex;
  align-items: center;
  font-size: 15px;
  border-radius: 4px;
  padding: 12px;
  color:rgba(255, 255, 255, 1);
  font-weight: 600;
  height: 30px;
  border: 0cap;
  background: linear-gradient(247.34deg, #BCBDFF 7.5%, #5D5FEF 62.93%);
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
  height: 50px;
  margin-right: 10px;
  background: rgba(244, 243, 255, 1);
  border: 0cap;
`;
