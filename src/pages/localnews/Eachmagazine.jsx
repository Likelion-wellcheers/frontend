import React from 'react'
import styled from 'styled-components'

export const Eachmagazine = () => {
  return (
    <Container>
      <NavContainer>매거진</NavContainer>



      <PostTitle>
        <PostTitleContent>흑석 주민의 생생한 이야기
        <PostTitleRating src='/images/magazine_icon.png'>
      </PostTitleRating></PostTitleContent>
    </PostTitle>



    </Container>
  )
}

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
const PostTitleRating = styled.img`
    position: absolute;
    left: 78%;
    top: -7vh;
`
