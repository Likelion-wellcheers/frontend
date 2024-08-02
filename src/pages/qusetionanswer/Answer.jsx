import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export const Answer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { question } = location.state || {};
  const [newComment, onChangeNewComment] = useForm("");


  // 임시 댓글 데이터
  const [comments, setComments] = useState([
    { author: '야채윤', date: '2024-07-26', content: '이런이런이런이런이런이런', authorProfilePic: 'url_to_profile_image' },
    { author: '김철수', date: '2024-07-27', content: '좋은 질문이에요!', authorProfilePic: 'url_to_profile_image' },
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
              <ProfileImage src={question.authorProfilePic} alt="Profile" />
              <div>
                <Author><strong>{question.author}</strong></Author>
                <Date>{question.date}</Date>
              </div>
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
        <p>No question data available.</p>
      )}

      <h3>댓글</h3>
      <CommentSection>
        <CommentImage src="url_to_comment_image" alt="Comment" />
        <CommentBox>
          {comments.map((comment, index) => (
            <CommentContainer key={index}>
              <ProfileImage src={comment.authorProfilePic} alt="Profile" style={{ width: '30px' }} />
              <CommentContent>
                <div>
                  <Author><strong>{question.author}</strong></Author>
                  <Date>{question.date}</Date>
                </div>
                <Content>{comment.content}</Content>
              </CommentContent>
            </CommentContainer>
          ))}
        </CommentBox>
      </CommentSection>

      <CommentInputContainer>
        <input
          type="file"
          style={{ marginRight: '10px' }}
        />
        <TextArea
          value={newComment}
          onChange={onChangeNewComment}
          placeholder="댓글을 남겨주세요..."
        />
        <button onClick={handleCommentSubmit}>등록</button>
      </CommentInputContainer>
      </ContentWrapper>
    </Container>
  );
};

const ContentWrapper = styled.div`
  width: 80%;
  margin-left: 10%;
`

const Author = styled.div`

`;

const Date = styled.div`

`;

const Content = styled.div`

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
`;

const ProfileImage = styled.img`
  width: 40px;
  border-radius: 50%;
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
`;

const Button = styled.button`
  margin-bottom: 20px;
  font-size: 18px;
  background: rgba(93, 95, 239, 1);
  border-radius: 4px;
  padding: 12px;
  color:rgba(255, 255, 255, 1);
  font-weight: 600;
  margin-left: -68%;
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
  margin: 5px 0;
  display: flex;
  align-items: flex-start;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
`;

const TextArea = styled.textarea`
  flex: 1;
  height: 50px;
  margin-right: 10px;
`;
