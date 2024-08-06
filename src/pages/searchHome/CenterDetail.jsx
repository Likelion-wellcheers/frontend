import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { fetchCenterInfo, fetchCenterReview, fetchLikeCenter } from '../../apis/recommend';

export const CenterDetail = () => {
    //InfoSecondTitle 은 없을 수도 있음!!! (군/구가 없을 수도 있음)
    const navigate = useNavigate();
    const [centerInfo, setCenterInfo] = useState({});
    const [centerReview, setCenterReview] = useState({});
    const [like, setLike] = useState(0);
    const [likeInfo, setLikeInfo] = useState({});

    const { centerId } = useParams();

    const handlePost = () => {
        navigate('reviewcenter', {state: {center_name : centerInfo.name}});
    }

    const parseDate = (date) => {
        return (date.substr(0, 10));
    }

    const handleLike = () => {
        var likeData = null;
        if(like === 0){
            likeData = {
                "like" : 1
            }
        }
        else{
            likeData = {
                "like" : 0
            }
        }
        setLike(!like);
        const getCenterLike = async(centerId, likeData) =>{
            const result = await fetchLikeCenter(centerId, likeData);
            setLikeInfo(result);
        } 
        getCenterLike(parseInt(centerId), likeData);
    }

    useEffect(()=>{
        var center_id = parseInt(centerId);
        const getCenterDetail = async() => {
            const result = await fetchCenterInfo(center_id);
            setCenterInfo(result);
        }
        const getCenterReview = async() => {
            const result = await fetchCenterReview(center_id);
            setCenterReview(result);
        }
        getCenterDetail();
        getCenterReview();
    },[])

if(centerInfo){
  return (
    <>
        <Container>
            <InfoContainer>
                <InfoContent>
                    <InfoTitle>
                        <InfoTitleImg src="/images/mainlogo.png"></InfoTitleImg>
                        <InfoFirstTitle>&nbsp;&nbsp;{centerInfo.city}</InfoFirstTitle>
                        
                        {centerInfo.gugoon && (
                            <><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.67374 6.17472C10.1294 5.7191 10.868 5.7191 11.3237 6.17472L18.3237 13.1747C18.7793 13.6303 18.7793 14.369 18.3237 14.8246L11.3237 21.8246C10.868 22.2802 10.1294 22.2802 9.67374 21.8246C9.21813 21.369 9.21813 20.6303 9.67374 20.1747L15.8488 13.9997L9.67374 7.82463C9.21813 7.36902 9.21813 6.63033 9.67374 6.17472Z" fill="#BBB8B8"/>
                                </svg>
                                <InfoSecondTitle>{centerInfo.name}</InfoSecondTitle></>)}
                    </InfoTitle>
                    <InfoPart>
                        <InfoImgList>
                            <InfoImgRepres src={centerInfo.thumnail?.[0] || "/images/centerDefault.jpg"}></InfoImgRepres>
                            <InfoImgRems>
                                <InfoImg src={centerInfo.thumnail?.[1] || "/images/centerDefault.jpg"}></InfoImg>
                                <InfoImg src={centerInfo.thumnail?.[2] || "/images/centerDefault.jpg"}></InfoImg>
                                <InfoImg src={centerInfo.thumnail?.[3] || "/images/centerDefault.jpg"}></InfoImg>
                            </InfoImgRems>
                        </InfoImgList>
                        <InfoTextContainer>
                            <InfoTextTitle>{centerInfo.name}</InfoTextTitle>
                            <InfoTextLine></InfoTextLine>
                            <InfoTextAdd>{centerInfo.address}</InfoTextAdd>
                            <InfotextPhoneLabel><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M19.4293 14.1325L15.0543 12.2575C14.8674 12.1778 14.6597 12.161 14.4624 12.2096C14.2652 12.2582 14.089 12.3696 13.9605 12.527L12.023 14.8942C8.98232 13.4605 6.53524 11.0134 5.10156 7.97269L7.46875 6.03519C7.62644 5.90694 7.73804 5.73081 7.78668 5.53345C7.83531 5.3361 7.81832 5.12828 7.73828 4.94144L5.86328 0.566443C5.77543 0.36504 5.62007 0.200601 5.42397 0.101481C5.22787 0.00236139 5.00332 -0.0252267 4.78906 0.0234739L0.726562 0.960974C0.519988 1.00868 0.335682 1.12499 0.203725 1.29093C0.0717677 1.45687 -4.75863e-05 1.66264 2.36571e-08 1.87465C2.36571e-08 11.8942 8.12109 19.9996 18.125 19.9996C18.3371 19.9998 18.5429 19.928 18.709 19.796C18.875 19.6641 18.9913 19.4797 19.0391 19.2731L19.9766 15.2106C20.025 14.9953 19.9968 14.7698 19.8969 14.5731C19.797 14.3763 19.6317 14.2205 19.4293 14.1325Z" fill="#615D67"/>
                            </svg>전화번호</InfotextPhoneLabel>
                            <InfoTextPhone>{centerInfo.phonenum || "000-0000-0000"}</InfoTextPhone>
                            <InfoTextTimeLabel>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M9.99297 1.66699C5.39297 1.66699 1.66797 5.40033 1.66797 10.0003C1.66797 14.6003 5.39297 18.3337 9.99297 18.3337C14.6013 18.3337 18.3346 14.6003 18.3346 10.0003C18.3346 5.40033 14.6013 1.66699 9.99297 1.66699ZM12.743 13.9253L9.16797 10.342V5.83366H10.8346V9.65866L13.9263 12.7503L12.743 13.9253Z" fill="#615D67"/>
                            </svg>운영시간</InfoTextTimeLabel>
                            <InfoTextTimeContent>
                                {['일', '월', '화', '수', '목', '금', '토'].map((day)=>(
                                    <InfoTextTime>{day} {centerInfo.time}</InfoTextTime>
                                ))}
                            </InfoTextTimeContent>
                            <InfoTextCostLabel>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10.0013 1.66699C5.4013 1.66699 1.66797 5.40033 1.66797 10.0003C1.66797 14.6003 5.4013 18.3337 10.0013 18.3337C14.6013 18.3337 18.3346 14.6003 18.3346 10.0003C18.3346 5.40033 14.6013 1.66699 10.0013 1.66699ZM11.1763 15.0753V16.667H8.9513V15.0587C7.5263 14.7587 6.31797 13.842 6.2263 12.2253H7.85964C7.94297 13.1003 8.54297 13.7837 10.068 13.7837C11.7013 13.7837 12.068 12.967 12.068 12.4587C12.068 11.767 11.7013 11.117 9.84297 10.6753C7.7763 10.1753 6.35964 9.32533 6.35964 7.61699C6.35964 6.18366 7.51797 5.25033 8.9513 4.94199V3.33366H11.1763V4.95866C12.7263 5.33366 13.5013 6.50866 13.5513 7.78366H11.918C11.8763 6.85866 11.3846 6.22533 10.068 6.22533C8.81797 6.22533 8.06797 6.79199 8.06797 7.59199C8.06797 8.29199 8.60964 8.75033 10.293 9.18366C11.9763 9.61699 13.7763 10.342 13.7763 12.442C13.768 13.967 12.6263 14.8003 11.1763 15.0753Z" fill="#615D67"/>
                            </svg>이용료</InfoTextCostLabel>
                            <InfoTextCost>{centerInfo.cost}</InfoTextCost>
                            <InfoTextSaveBtn onClick={handleLike}>
                                {like ? (<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                        <path d="M12.5 21.35L11.05 20.03C5.9 15.36 2.5 12.28 2.5 8.5C2.5 5.42 4.92 3 8 3C9.74 3 11.41 3.81 12.5 5.09C13.59 3.81 15.26 3 17 3C20.08 3 22.5 5.42 22.5 8.5C22.5 12.28 19.1 15.36 13.95 20.04L12.5 21.35Z" fill="#5D5FEF"/>
                                        </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                        <path d="M17 3C15.26 3 13.59 3.81 12.5 5.09C11.41 3.81 9.74 3 8 3C4.92 3 2.5 5.42 2.5 8.5C2.5 12.28 5.9 15.36 11.05 20.04L12.5 21.35L13.95 20.03C19.1 15.36 22.5 12.28 22.5 8.5C22.5 5.42 20.08 3 17 3ZM12.6 18.55L12.5 18.65L12.4 18.55C7.64 14.24 4.5 11.39 4.5 8.5C4.5 6.5 6 5 8 5C9.54 5 11.04 5.99 11.57 7.36H13.44C13.96 5.99 15.46 5 17 5C19 5 20.5 6.5 20.5 8.5C20.5 11.39 17.36 14.24 12.6 18.55Z" 
                                        fill="#5D5FEF"/>
                                        </svg>)}
                                &nbsp;저장하기</InfoTextSaveBtn>
                        </InfoTextContainer>
                    </InfoPart>
                </InfoContent>
            </InfoContainer>
            <ReviewContainer>
                <ReviewContent>
                    <ReviewDesc>
                        <ReviewIcon><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21.6635 7.93127C21.1376 6.67625 20.3727 5.53553 19.4111 4.57268C18.4525 3.60815 17.3138 2.84129 16.0596 2.31565C14.7748 1.77455 13.3943 1.49718 12.0002 1.50002H11.9533C10.5354 1.50705 9.16427 1.7883 7.87286 2.34143C6.62944 2.87246 5.50139 3.64068 4.55177 4.60315C3.59958 5.56384 2.84335 6.70057 2.32521 7.95002C1.78735 9.24931 1.51482 10.6431 1.52365 12.0492C1.53068 13.6758 1.91974 15.2906 2.6463 16.7344V20.2969C2.6463 20.8922 3.12911 21.375 3.72208 21.375H7.2799C8.73038 22.1069 10.331 22.4921 11.9557 22.5H12.0049C13.4065 22.5 14.7635 22.2281 16.0432 21.6961C17.291 21.1767 18.4255 20.4188 19.383 19.4649C20.3486 18.5063 21.108 17.386 21.6401 16.1367C22.1908 14.843 22.4721 13.4672 22.4791 12.0469C22.4838 10.6196 22.2072 9.2344 21.6635 7.93127ZM7.32208 13.125C6.70333 13.125 6.19943 12.6211 6.19943 12C6.19943 11.3789 6.70333 10.875 7.32208 10.875C7.94083 10.875 8.44474 11.3789 8.44474 12C8.44474 12.6211 7.94318 13.125 7.32208 13.125ZM12.0002 13.125C11.3815 13.125 10.8776 12.6211 10.8776 12C10.8776 11.3789 11.3815 10.875 12.0002 10.875C12.619 10.875 13.1229 11.3789 13.1229 12C13.1229 12.6211 12.619 13.125 12.0002 13.125ZM16.6783 13.125C16.0596 13.125 15.5557 12.6211 15.5557 12C15.5557 11.3789 16.0596 10.875 16.6783 10.875C17.2971 10.875 17.801 11.3789 17.801 12C17.801 12.6211 17.2971 13.125 16.6783 13.125Z" fill="#5D5FEF"/>
                            </svg></ReviewIcon>
                        <ReviewPostBtn onClick={handlePost}>작성하기</ReviewPostBtn>
                    </ReviewDesc>
                    <ReviewPostList>
                    {centerReview.length ? centerReview.map((review)=>(
                        <ReviewPost>
                        <ReviewWriterImg src={review?.profileimage || "/images/mainlogo.png"}></ReviewWriterImg>
                        <ReviewText>
                            <ReviewProfile>
                                <ReviewWriter>{review?.nickname}</ReviewWriter>
                                <ReviewDate>{parseDate(review?.created_at)}</ReviewDate>
                            </ReviewProfile>
                            <ReviewRating>
                                <ReviewRatingIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                                    <path d="M2.70799 12.0826C2.41849 12.2311 2.08999 11.9709 2.14849 11.6386L2.77099 8.09113L0.12874 5.57413C-0.11801 5.33862 0.0102401 4.90813 0.34099 4.86163L4.01449 4.33963L5.65249 1.09437C5.80024 0.801875 6.19999 0.801875 6.34774 1.09437L7.98574 4.33963L11.6592 4.86163C11.99 4.90813 12.1182 5.33862 11.8707 5.57413L9.22924 8.09113L9.85174 11.6386C9.91024 11.9709 9.58174 12.2311 9.29224 12.0826L5.99899 10.3906L2.70799 12.0826Z" fill="#5D5FEF"/>
                                    </svg>
                                </ReviewRatingIcon>
                                <ReviewRatingNum>{review?.score}</ReviewRatingNum>
                            </ReviewRating>
                            <ReviewTextContent>{review?.content}</ReviewTextContent>
                            <ReviewTextImgs>
                    
                            </ReviewTextImgs> 
                        </ReviewText>
                    </ReviewPost>
                     )) : <NoReview>첫 후기를 달아주세요!</NoReview>}
                        
                    </ReviewPostList>
                </ReviewContent>
            </ReviewContainer>
        </Container>
    </>
  )}
  else{
    <>
       <NoCenterInfo>
            준비중입니다...
        </NoCenterInfo>
    </>
    
  }
}

const Container = styled.div`
    height: 100%;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const InfoContainer = styled.div`
    width: 100%;
    height: 92vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0px 0px 24px 24px;
    background: var(--White, #FFF);
    padding-top: 1.2%;
`
const InfoContent = styled.div`
    width: 84%;
    height: 80vh;

`
const InfoTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const InfoTitleImg = styled.img`
    display: flex;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
`
const InfoFirstTitle = styled.div`
    color: var(--Gray-02, #BBB8B8);
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
`
const InfoSecondTitle = styled.div`
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
`

const InfoPart = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2%;
    margin-top: 2%;
`

const InfoImgList = styled.div`
    width: 900px;
    height: 560px;
    margin-bottom: 2%;
`
const InfoImgRepres = styled.img`
    display: flex;
    width: 890px;
    height: 400px;
    flex-shrink: 0;
    border-radius: 8px;
    background: url(<path-to-image>) lightgray 50% / cover no-repeat, #D9D9D9;
    overflow: hidden;
    object-fit: cover;
`
const InfoImgRems = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    gap: 20px;
    overflow: hidden;
    object-fit: cover;
`
const InfoImg = styled.img`
    width: 284px;
    height: 160px;
    flex-shrink: 0;
    border-radius: 8px;
    background: url(<path-to-image>) lightgray 50% / cover no-repeat, #D9D9D9;
    object-fit: cover;
`

const InfoTextContainer = styled.div`
    padding: 28px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 292px;
    height: 523px;
    border-radius: 8px;
    border: 1px solid var(--Gray-01, #615D67);
    background: var(--White, #FFF);
    gap: 5px;
    align-items: center;
`
const InfoTextTitle = styled.div`
    align-self: flex-start;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 36px */
`
const InfoTextLine = styled.div`
    align-self: flex-start;
    background: var(--Gray-01, #615D67);
    height: 1px;
    flex-shrink: 0;
    align-self: stretch;
    width: 75%;
`

const InfoTextAdd = styled.div`
    color: var(--Gray-01, #615D67);
    align-self: flex-start;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    margin-bottom: 10%;
`
const InfotextPhoneLabel = styled.div`
    align-self: flex-start;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
    color: var(--Gray-01, #615D67);
    gap: 5px;
    margin-bottom: 1%;
`
const InfoTextPhone = styled.div`
    align-self: flex-start;
    margin-bottom: 4%;
    padding-left: 26px;
`
const InfoTextTimeLabel = styled.div`
    align-self: flex-start;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
    color: var(--Gray-01, #615D67);
    gap: 5px;
    margin-bottom: 1%;
`
const InfoTextTimeContent = styled.div`
    align-self: flex-start;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    margin-bottom: 4%;
`
const InfoTextTime = styled.div`
    align-self: flex-start;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    padding-left: 26px;
`
const InfoTextCostLabel = styled.div`
    align-self: flex-start;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
    color: var(--Gray-01, #615D67);
    gap: 5px;
`
const InfoTextCost = styled.div`
    align-self: flex-start;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    margin-bottom: 17%;
    padding-left: 26px;
`
const InfoTextSaveBtn = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    text-align: center;
    justify-content: center;
    display: flex;
    width: 130px;
    height: 44px;
    padding: 8px 50px;
    flex-shrink: 0;
    border-radius: 4px;
    border: 1px solid var(--Main, #5D5FEF);
    background: #FFF;
    cursor: pointer;
`
const ReviewContainer = styled.div`
    background: var(--Sub2, #F4F3FF);
    width: 100%;
    //height: 1734px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 5%;
`

//아래부터 리뷰 내용
const ReviewContent = styled.div`
    width: 80%;
    border-radius: 8px;
    border: 1px solid var(--Gray-03, #EEEBE8);
    background: var(--White, #FFF);
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
    height: 705px;
    align-items: center;
    justify-content: center;
    margin-bottom: 5%;
    padding: 2%;
`
const ReviewDesc = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5%;
`
const ReviewIcon = styled.div`
    
`
const NoReview = styled.div`
    color: var(--Gray-01, #615D67);
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25%;
`

const ReviewPostBtn = styled.div`
    display: flex;
    width: 64px;
    height: 25px;
    padding: 4px 12px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    border-radius: 4px;
    background: linear-gradient(247deg, #BCBDFF 7.5%, #5D5FEF 62.93%);
    color: var(--White, #FFF);
    /* Caption */
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; 
    cursor: pointer;
    justify-self: flex-end;
    margin-left: auto;
`
const ReviewPostList = styled.div`
    display: flex;
    flex-direction: column;
    height: 651px;
    border-top: 1px solid var(--Gray-01, #615D67);
    overflow: auto;
    max-height: 651px;
`
const ReviewPost = styled.div`
    display: flex;
    flex-direction: row;
    padding: 12px;
    gap: 12px;
    background-color: #F8F6F3;
    height: 217px;
    border-bottom: 1px solid var(--Gray-03, #EEEBE8);
    overflow: auto;
    max-height: 217px;
    min-height: 217px;
`
const ReviewWriterImg = styled.img`
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 4px;
    background: url(<path-to-image>) lightgray 50% / cover no-repeat;
    object-fit: cover;
`
const ReviewText = styled.div`
`
const ReviewProfile = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    
`
const ReviewWriter = styled.div`
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
`
const ReviewDate = styled.div`
    color: var(--Gray-02, #BBB8B8);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
`

const ReviewRating = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    margin-top: 3px;
`
const ReviewRatingIcon = styled.div`
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
`
const ReviewRatingNum = styled.div`
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
`
const ReviewTextContent = styled.div`
    margin-top: 5px;
    max-width: 1050px;
`
const ReviewTextImgs = styled.div` 
    display: flex;
    flex-direction: row;
    gap: 7px;
    margin-top: 6px;
    margin-bottom: 5px;
`

const ReviewTextImg = styled.img`
    width: 88px;
    height: 88px;
    object-fit: cover;
`

const NoCenterInfo = styled.div`
    color: var(--Gray-01, #615D67);
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25%;
`