import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from '../../hooks/useForm';

export const Wonderwrite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city, district } = location.state || {};
  const [newTitle, setNewTitle] = useForm("");
  const [newComment, setNewComment] = useForm("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      //return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleUpload = async () => {
      const formData = new FormData();
      if(selectedImage !== null) {
        formData.append('image', selectedImage);
      }
      formData.append('city', city);
      formData.append('gugoon', district);
      formData.append('title', newTitle);
      formData.append('content', newComment);
  
    const accessToken = localStorage.getItem("access");

    try {
      const response = await fetch('https://wellcheers.p-e.kr/qna/', { 
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });

      if (!response.ok) {
        throw new Error('서버 응답이 없습니다.');
      }
        const result = await response.json();
        console.log('업로드 성공:', result);
        alert('성공적으로 업로드 되었습니다');
        navigate(-1);

    } catch (error) {
      console.error('업로드 실패:', error);
      alert('업로드에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <Container>
      <MaintitleWrapper>
        <SubTitle>
          지역 Q&A
          <SubTitle_2>
            <svg xmlns="" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z" fill="black"/>
            </svg>
          </SubTitle_2>
        </SubTitle>
        <Title>동네 주민들과 궁금한 점을 물어보세요</Title>
      </MaintitleWrapper>
      <Icongroup>

      </Icongroup>

      <ContentWrapper>
        <TitleWrapper>
          <Titlemini>제목</Titlemini>
        </TitleWrapper>
        <CommentInputContainer>
          <TextArea
            onChange={setNewTitle}
            placeholder="제목을 입력해 주세요"
          />
        </CommentInputContainer>
      </ContentWrapper>

      <ContentWrapper>
        <TitleWrapper>
          <Titlemini>내용</Titlemini>
        </TitleWrapper>
        <CommentInputContainer>
          <ContentArea
            onChange={setNewComment}
            placeholder="동네에 대해 궁금한 점을 물어보세요"
          />
        </CommentInputContainer>
      </ContentWrapper>

      <Addfile>
        <Registerbutton onClick={handleUpload}>업로드</Registerbutton>
      </Addfile>
    </Container>
  );
};

const Addfile = styled.div`
  border-bottom: 1px black;
  display: flex;
  margin-bottom: 1%;
  width: 80%;
  justify-content: space-between;
`

const ContentWrapper=styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
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
  cursor: pointer;
`


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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

/*

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

*/

const TitleWrapper = styled.div`
    display: flex;
    gap: 1%;
    align-items: center;
    margin-bottom: 1%; 
`


const Divider = styled.hr`
  width: 100%;
  margin: 20px 0;
`;


