import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

export const Locreview = () => {

    const location = useLocation();
    const { review, city, gugoon, nickname, profileimage_url } = location.state;
    const { centerId } = useParams();
    const [rate, setRate] = useState(5);

    const handleRate = (idx) => {
        setRate(idx);
    }

  return (
<>
    <Container>
        <NavContainer>지역 후기</NavContainer>
        <PostContainer>
            <PostTitle>
                <PostTitleContent>{`${city} ${gugoon}`}
                    <PostTitleRating>
                        <svg xmlns="http://www.w3.org/2000/svg" width="222" height="104" viewBox="0 0 222 104" fill="none">
                            <g filter="url(#filter0_d_789_9185)">
                                <path d="M2.03864 48.7318C2.3073 52.5666 3.43702 56.2915 5.34381 59.6294C9.36242 66.687 16.2539 71.7967 23.6761 74.8339C32.9491 78.6285 43.2859 78.7454 53.127 77.8993C62.2674 77.1135 71.3148 75.2918 80.4888 74.9164C87.5836 74.6894 94.6854 74.8588 101.761 75.4238C115.489 76.3982 129.16 78.2061 142.743 80.3978C146.422 80.984 150.093 81.614 153.756 82.2875C154.102 82.3181 154.444 82.3817 154.778 82.4775C154.845 82.5048 154.952 82.4835 155.013 82.5218C155.123 82.5915 154.566 82.3453 154.904 82.6248C155.375 83.1192 155.795 83.6599 156.158 84.2387L161.174 90.6944C162.613 92.5458 163.948 94.795 165.807 96.2542C167.118 97.267 168.7 97.8689 170.352 97.9841C172.005 98.0993 173.655 97.7226 175.094 96.9014C176.597 95.9517 177.795 94.5902 178.547 92.9788C179.701 90.8625 181.077 88.8754 182.653 87.0515C188.621 80.0892 196.916 75.8068 203.854 69.9487C207.214 67.2273 210.082 63.9489 212.332 60.2565C214.252 56.9152 215.446 53.2066 215.836 49.3728C216.666 41.587 214.277 33.6471 210.259 27.0236C205.888 19.9078 199.609 14.1605 192.135 10.4348C183.739 6.15727 174.448 4.07367 165.135 3.03537C155.247 1.93297 145.244 1.93641 135.308 2.04771C124.157 2.17183 113.026 2.66221 101.916 3.51883C90.7899 4.37998 79.708 5.60405 68.6699 7.19103C58.0784 8.71381 47.3574 10.301 36.9899 12.9954C27.831 15.3758 18.6979 19.0963 11.8587 25.8375C5.77763 31.8314 1.54815 40.0337 2.03864 48.7318Z" fill="#FFDAE0"/>
                            </g>
            
                            {[1, 2, 3, 4, 5].map((idx)=>(
                                    <svg 
                                        key={idx}
                                        onClick={() => handleRate(idx)}
                                        xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none"
                                        x={17 + idx * 27}
                                        y={31}
                                        style={{ cursor: 'pointer' }}>
                                            <path 
                                            fill={idx <= rate ? "#FF5972" : "#615D67"}
                                            d="M6.90004 20.3332C6.44725 20.3128 6.0036 20.1989 5.59699 19.9986C5.19038 19.7984 4.82962 19.5161 4.53744 19.1696C4.24526 18.8231 4.02795 18.4199 3.89924 17.9853C3.77053 17.5507 3.73319 17.0942 3.78956 16.6445L4.0249 14.7918C4.06983 14.4364 4.02777 14.0755 3.90236 13.74C3.77696 13.4044 3.57195 13.1044 3.30496 12.8656L1.91336 11.6221C1.45765 11.215 1.12493 10.6886 0.952845 10.1022C0.780761 9.51592 0.776163 8.89313 0.939595 8.30434C1.10303 7.71554 1.42798 7.18423 1.87765 6.77049C2.32733 6.35675 2.8838 6.07709 3.48413 5.96315L5.3187 5.61469C5.6704 5.54796 6.00059 5.39675 6.28086 5.17406C6.56113 4.95137 6.78306 4.66387 6.92754 4.33636L7.68054 2.6263C7.9271 2.06729 8.32512 1.58839 8.8296 1.24373C9.33408 0.899069 9.92491 0.702391 10.5353 0.675926C11.1457 0.649462 11.7514 0.794253 12.2838 1.09396C12.8162 1.39366 13.2541 1.83633 13.5482 2.37191L14.4458 4.00891C14.618 4.32322 14.8641 4.5909 15.1628 4.78887C15.4615 4.98685 15.804 5.10914 16.1605 5.14524L18.0178 5.33288C18.6258 5.39438 19.2044 5.62476 19.6882 5.99798C20.1721 6.37119 20.5418 6.87236 20.7557 7.44478C20.9695 8.01719 21.0189 8.63802 20.8983 9.23705C20.7777 9.83609 20.4919 10.3894 20.0732 10.8345L18.7941 12.1944C18.5485 12.455 18.3701 12.7714 18.2743 13.1164C18.1785 13.4613 18.1681 13.8245 18.2441 14.1743L18.6388 16.0005C18.7679 16.5975 18.7275 17.2189 18.522 17.7942C18.3165 18.3695 17.9542 18.8758 17.476 19.2559C16.9978 19.6361 16.4228 19.8749 15.816 19.9454C15.2092 20.0158 14.5947 19.9151 14.0422 19.6546L12.3532 18.8588C12.0294 18.7054 11.6731 18.6333 11.3151 18.6487C10.9572 18.664 10.6084 18.7665 10.2989 18.9471L8.68513 19.8868C8.14491 20.203 7.52548 20.3579 6.90004 20.3332Z" />
                                    </svg>))}
                </svg>
                </PostTitleRating></PostTitleContent>
            </PostTitle>
            <Profile>
                <Img src={profileimage_url ? profileimage_url : '/images/profile.png'} alt={nickname} />
                <Name>{nickname}</Name>
                
            </Profile>
            <PostTextArea>
            <ReviewTextImgs>
                {review?.image && (<ReviewTextImg src={review?.image}></ReviewTextImg>)}
            </ReviewTextImgs> 
                {review?.content}
            

            </PostTextArea>
            
        </PostContainer>
    </Container>
</>
  )
}

const Name = styled.div`
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 600;
`
const Date = styled.div`
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    color: rgba(187, 184, 184, 1);
`
const Img = styled.img`
    width: 50px;
    height: 50px;
`

const Profile = styled.div`
    display: flex;
    text-align: left;
    align-self: flex-start;
    margin-left: 5%;
    align-items: center;
    gap: 10%;
    width: 300px;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 75px;
    margin-bottom: 12vh;
`
const NavContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 12vh;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    color: var(--Main, #5D5FEF);
    border-bottom: 1px solid var(--Gray-02, #BBB8B8);
    margin-bottom: 1vh;
`
const PostContainer = styled.div`
    width: 85%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
`
const PostTitle = styled.div`
    width: 95%;
`
const PostTitleContent = styled.div`
    position: relative;
    display: flex;
    height: 60px;
    padding: 22px 40px;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 65px;
    background: var(--Main, #5D5FEF);
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.12);
    color: #FFF;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    padding-left: 6%;
`
const PostTitleRating = styled.div`
    position: absolute;
    left: 78%;
    top: -7vh;
`

const PostTextArea = styled.div`
    display: flex;
    flex-direction: column;
    width: 85%;
    height: 254px;
    padding: 20px 40px;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 4px;
    border: 1px solid var(--Gray-02, #BBB8B8);
    background: var(--Sub2, #F4F3FF);
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; 
    margin-top: 2vh;
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
