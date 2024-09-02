import React, { useState } from 'react'
import { useForm } from '../hooks/useForm';
import { fetchPlan } from '../apis/recommend';
import styled from 'styled-components';
import { usePath } from '../hooks/usePath';

// put이 true 일 때 이미 작성된 계획 페이지 보여주는 것
export const PlanTemplate = ({put, plans, idx, city_code}) => {
    const [plan_1, setPlan_1] = useForm("");
    const [plan_2, setPlan_2] = useForm("");
    const [plan_3, setPlan_3] = useForm("");
    const movePath = usePath();

    // 계획 쓰는 데에서
    // 계획 저장 버튼 클릭 시
     const handleSave = () => {
        var planData = {
            "plan1" : plan_1,
            "plan2" : plan_2,
            "plan3" : plan_3,
            "city_code" : parseInt(city_code),
        }
        const getPlanSave = async(data) => {
            const result = await fetchPlan(data);
        }
        getPlanSave(planData);
        alert("저장되었습니다!");
        movePath('/mypage', 1);
    }

  return (
    <Container>
        <AddPlanContainer>
            <AddPlanTitle>계획 세우기</AddPlanTitle>
            <AddPlanQuestion>여가비용 금액이 내 노후에 적합한가요? <br />
            아니라면 계획을 다시 세워보세요!</AddPlanQuestion>
            <AddPlanAnswer as={put ? 'div' : 'input'}
                onChange={setPlan_1}
            >{put ? plans[parseInt(idx)]?.plan1 : undefined}</AddPlanAnswer>
            <AddPlanQuestion>추천받은 시설 및 활동들로 <br />
            회원님이 추구하는 노후를 이뤄낼 수 있을지 상상해보세요!</AddPlanQuestion>
            <AddPlanAnswer as={put ? 'div' : 'input'}
                onChange={setPlan_2}
            >{put ? plans[parseInt(idx)]?.plan2 : undefined}</AddPlanAnswer>
            <AddPlanQuestion>내가 원하는 노후 생활을 위해서 <br />
            지금 준비해야할 것은 무엇이 있을지 계획해보세요!</AddPlanQuestion>
            <AddPlanAnswer as={put ? 'div' : 'input'}
                onChange={setPlan_3}
            >{put ? plans[parseInt(idx)]?.plan3 : undefined}</AddPlanAnswer>
            {put ? undefined :
                <AddPlanSaveBtn onClick={handleSave}>저장</AddPlanSaveBtn>}
        </AddPlanContainer>
    </Container>
  )
}

const Container = styled.div`
    background-color: #F4F3FF;
    padding-top: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

const AddPlanContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border-radius: 8px;
    border: 1px solid var(--Gray-02, #BBB8B8);
    background: var(--White, #FFF);
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
    width: 80%;
    padding: 40px;
    margin-bottom: 35px;
`
const AddPlanTitle = styled.div`
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    display: flex;
    width: 396px;
    padding: 8px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 100px;
    border: 1px solid var(--kakao-logo, #000);
    background: var(--White, #FFF);
`
const AddPlanQuestion = styled.div`
    width: 90%;
    display: flex;
    padding: 8px 12px;
    gap: 10px;
    align-self: stretch;
    font-size: 21px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
    justify-content: center;
    align-items: center;
    background: var(--Gray-04, #F8F6F3);
    margin-top: 50px;
    align-self: stretch;
    margin-left: 4%;
    text-align: center;
`
const AddPlanAnswer = styled.div`
    display: flex;
    width: 87.5%;
    height: 126px;
    padding: 16px 24px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 0px 44px 0px 0px;
    border-left: 8px solid var(--Point, #FF5972);
    background: #FFF3F3;
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    border-right: none;
    border-bottom: none;
    border-top: none;
    &:focus {
    outline:none;
    }
    margin-top: 5px;
    resize: none;
`

const AddPlanSaveBtn = styled.button`
    color: var(--White, #FFF);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    display: flex;
    width: 396px;
    height: 48px;
    padding: 4px 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    background: linear-gradient(247deg, #BCBDFF 7.5%, #5D5FEF 62.93%);
    border: none;
    cursor: pointer;
    margin-top: 40px;
    margin-bottom: 20px;
`
