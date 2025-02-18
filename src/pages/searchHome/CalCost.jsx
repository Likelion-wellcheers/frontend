import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { ThemeColorContext } from '../../context/context';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { fetchCartId, fetchCartUpdate, fetchCompCost, fetchPlan } from '../../apis/recommend';
import { useChartUtils } from '../../hooks/useChartUtils';
import { usePath } from '../../hooks/usePath';
import { PlanTemplate } from '../../component/PlanTemplate';
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const CalCost = () => {
    const themeColor = useContext(ThemeColorContext);
    const location = useLocation();
    const { selected_center, city_code } = location.state || {};
    const dataLabel = ['center1_id', 'center2_id', 'center3_id', 'center4_id', 'center5_id'];
    const [cart, setCart] = useState({}); // 해당 카트 아이디의 카트, 계속해서 수정시킬 것임
    const [firstLoad, setFirstLoad] = useState(true);
    const [compare, setCompare] = useState({});
    const [addPage, setAddPage] = useState(false);
    const [inputBudget, onChangeBudget] = useForm(""); // 받아온 예산
    const [isExtra, setisExtra] = useState(false);
    const [myBudget, setMyBudget] = useState();
    const [prepare, setPrepare] = useState();
    const chartRef = useRef(null); // 차트 인스턴스 저장할 ref
    const chartUtils = useChartUtils();
    const movePath = usePath();
    
    const datalabel1 = "나의 적정여가비용";
    const datalabel2 = "내가 담은 여가비용";

    // 카트 수정
    const handleDelete = (idx) => {
        var deleteId = idx.substr(6,6);

        const updatedData = {
            "delete_center" : parseInt(deleteId)
        }
        const getCartUpdate = async(id, updated) =>{
            const result = await fetchCartUpdate(id, updatedData);
            setCart(result);
        }
        getCartUpdate(cart.id, updatedData);

    };

    // 여가비용 계산 버튼 클릭 시
    const showAddPage = () => {
        // 예외 처리
        if(inputBudget === ""){
            alert("생활비를 입력하세요!");
            onChangeBudget({target : {value: ""}}); // 빈값으로
            return;
        }
        else if(isNaN(Number(inputBudget))){
            alert("숫자 값으로 입력하세요!");
            onChangeBudget({target : {value: ""}}); // 빈값으로
            return;
        }

        const compareData = {"mybudget" : Number(inputBudget)};

        const getCompCost = async(id, budget) => {
            const result = await fetchCompCost(id, budget);
            setCompare(result);
            setMyBudget(Math.ceil(result[datalabel1]));
            setPrepare(Math.ceil(result[datalabel2]));
            setisExtra(result.message);
        }
        getCompCost(cart.id, compareData);

        const chartEI = document.getElementById('bar-chart')?.getContext('2d');
        chartUtils.drawChart(chartRef, chartEI, compare, prepare, myBudget);
        setAddPage(true);
    }

    useEffect(()=>{
        const centerData = {}
        // 백엔드에 카트 생성 위해 보낼 데이터 만들기
        if(selected_center){
            selected_center.map((center, idx)=>(
                centerData[dataLabel[idx]] = parseInt(center.id)
            ))
        }
        // 첫 로드 시에만 cart id 불러오도록
        if(firstLoad){
                const getCartId = async(selected) => {
                    const result = await fetchCartId(selected);
                    setCart(result);
                }
                getCartId(centerData);
                setFirstLoad(false);
            }
    },[firstLoad])

    // 카트 수정 시
    useEffect(()=>{
        if (addPage && compare[datalabel1] !== undefined && compare[datalabel2] !== undefined) {
            const chartEI = document.getElementById('bar-chart')?.getContext('2d');
            chartUtils.drawChart(chartRef, chartEI, compare, prepare, myBudget);
        }
    },[compare, addPage])

   

    const handleGotoQna = () => {
        movePath('/mainwonder', 1)
    }

    if(cart) {
  return (
    <>
        <Container>
            <Background>
                <SubTitle themeColor={themeColor}>여가비용 계산 <SubTitle_2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z" fill="black"/>
                    </svg></SubTitle_2></SubTitle>
                <Titles>한 달 여가활동 예상 비용</Titles>
                <TitleDesc>회원님이 선택하신 시설을 이용할 때 드는 평균 비용을 계산해 보았어요!</TitleDesc>
                <CostContainer>
                <InfraList>
                    {Object.keys(cart).filter(key => key.startsWith('center')).map(centerKey => (
                                    cart[centerKey] && (
                                    <Infra key={cart[centerKey]?.id} onClick={() => handleDelete(centerKey)}>
                                        {cart[centerKey]?.name} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M15.8346 5.34199L14.6596 4.16699L10.0013 8.82533L5.34297 4.16699L4.16797 5.34199L8.8263 10.0003L4.16797 14.6587L5.34297 15.8337L10.0013 11.1753L14.6596 15.8337L15.8346 14.6587L11.1763 10.0003L15.8346 5.34199Z" fill="#BBB8B8"/>
                                            </svg>
                                    </Infra>)
                                ))}
                    </InfraList>
                    <CostResult>
                        <CostResultDesc>예상비용</CostResultDesc>
                            <Cost>{cart.total_cost}</Cost>
                            <Won> 원</Won>
                        </CostResult>
                </CostContainer>
                <BudgetContainer>
                <BudgetTitleContainer>
                    <BudgetTitle>나의 은퇴 후 한 달 생활비는?</BudgetTitle>
                    <BudgetSubTitle>은퇴 후 예상되는 한 달 생활비를 입력해 주세요</BudgetSubTitle>
                </BudgetTitleContainer>
                <BudgetInputContainer>
                    <BudgetInput id="inputBudget" value={inputBudget} onChange={onChangeBudget}></BudgetInput>
                    <BudgetWon>원</BudgetWon>
                </BudgetInputContainer>
                <BudgetBtn onClick={()=>showAddPage()}>적정 여가비용<br/>
                확인하기</BudgetBtn>
            </BudgetContainer>

            {addPage && compare && (
                
                <AddContainer>
                    <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74" fill="none">
                        <path d="M34.5424 37.0434L14.8861 17.3871C13.5275 16.0285 13.5275 13.8316 14.8861 12.4875L18.1525 9.22109C19.5111 7.8625 21.708 7.8625 23.0521 9.22109L36.985 23.1539L50.9178 9.22109C52.2764 7.8625 54.4732 7.8625 55.8174 9.22109L59.1127 12.473C60.4713 13.8316 60.4713 16.0285 59.1127 17.3727L39.4564 37.0289C38.0979 38.402 35.901 38.402 34.5424 37.0434ZM39.4564 64.7934L59.1127 45.1371C60.4713 43.7785 60.4713 41.5816 59.1127 40.2375L55.8463 36.9711C54.4877 35.6125 52.2908 35.6125 50.9467 36.9711L36.9994 50.8895L23.0666 36.9566C21.708 35.598 19.5111 35.598 18.167 36.9566L14.8861 40.223C13.5275 41.5816 13.5275 43.7785 14.8861 45.1227L34.5424 64.7789C35.901 66.152 38.0979 66.152 39.4564 64.7934Z" fill="#C1BEFF"/>
                    </svg>
                    <AddDescContainer>
                    <AddTitleContainer>
                        <AddTitle>평균적으로 사용하는 여가비용을 적용해 보았어요!</AddTitle>
                        <AddSubTitle>*생활비의 5.27% (국가발전지표)</AddSubTitle>
                    </AddTitleContainer>
                    <AddDesc>적정 여가비용</AddDesc>
                    <AddDescCost>{Math.ceil(compare[datalabel1])}
                        <AddWon>원</AddWon>
                    </AddDescCost>
                </AddDescContainer>
                <AddGraphContainer>
                        {compare.message ==="true" ? (<AddGraphDesc>예상되는 여가비용이  <Point isExtra={isExtra}>평균 이상</Point>으로 많아요! <br />우선순위를 고려해서 다시 생각해 보는 건 어떨까요?</AddGraphDesc>) : 
                        (<AddGraphDesc><Point isExtraCost={isExtra}>적정수준</Point> 의 여가비용이 나왔어요 <br />이를 바탕으로 구체적인 계획을 세워보세요!</AddGraphDesc>)}
                
                <AddGraph><canvas id="bar-chart"></canvas>
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                </AddGraph>
                </AddGraphContainer>
                <AddBackground>
                    <PlanTemplate put={false} city_code={city_code}/>
                    <GotoQnaContainer>
                        <QnaDesc>계획을 세우며 생긴 궁금증을 주민들에게 직접 물어보세요!</QnaDesc>
                        <QnaBtn onClick={handleGotoQna}>지역 Q&A로 이동하기<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 5.79289C8.68342 5.40237 9.31658 5.40237 9.70711 5.79289L15.7071 11.7929C16.0976 12.1834 16.0976 12.8166 15.7071 13.2071L9.70711 19.2071C9.31658 19.5976 8.68342 19.5976 8.29289 19.2071C7.90237 18.8166 7.90237 18.1834 8.29289 17.7929L13.5858 12.5L8.29289 7.20711C7.90237 6.81658 7.90237 6.18342 8.29289 5.79289Z" fill="#5D5FEF"/>
                        </svg></QnaBtn>
                    </GotoQnaContainer>
                </AddBackground>
                </AddContainer>
            )}
            </Background>
        </Container>
    </>
  )    }
}

const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Background = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    height: 170px;
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
    margin-left: 120px;
`
const SubTitle_2 = styled.div`
    align-self: flex-start;
    display: inline-flex;
    margin-bottom: 1px;
`
const Titles = styled.div`
    align-self: flex-start;
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    margin-bottom: 8px;
    margin-left: 120px;
`

const TitleDesc = styled.div`
    align-self: flex-start;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    margin-left: 120px;
`
const CostContainer = styled.div`
    display: flex;
    width: 80%;
    height: 180px;
    margin-top: 70px;
    padding: 9px 32px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 21px;
    flex-shrink: 0;
    border-radius: 12px;
    border: 1px solid var(--Sub1, #C1BEFF);
    background: var(--White, #FFF);
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
`
const InfraList = styled.div`
    display: flex;
    padding: 23px 10px;
    justify-content: center;
    align-items: center;
    gap: 16px;
    align-self: stretch;
    border-bottom: 1px solid var(--Gray-02, #BBB8B8);
`
const Infra = styled.div`
    color: var(--Main, #5D5FEF);
    display: flex;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 4px;
    border: 1px solid var(--Sub1, #C1BEFF);
    background: var(--Sub2, #F4F3FF);
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
`
const CostResult = styled.div`
    display: flex;
    flex-direction: row;
    width: 590px;
    justify-content: space-between;
    align-items: center;
`
const CostResultDesc = styled.div`
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
    text-align: center;
`
const Cost = styled.div`
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    color: var(--Point, #FF5972);
`
const Won = styled.div`
    color: var(--Black, var(--kakao-logo, #000));
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    text-align: center;
`
const BudgetContainer = styled.div`
    display: flex;
    width: 90%;
    justify-content: center;
    align-items: center;
    gap: 40px;
    margin-top: 70px;
    margin-bottom: 80px;
`
const BudgetTitleContainer = styled.div`
    margin-right: 100px;
`
const BudgetTitle= styled.div`
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
`
const BudgetSubTitle = styled.div`
    color: var(--Gray-01, #615D67);
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
`
const BudgetInputContainer = styled.div`
    text-align: center;
    display: flex;
    padding: 12px 19px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-bottom: 4px solid var(--Main, #5D5FEF);
    background: #f4f4ff;
    margin-left: 100px;
`
const BudgetInput = styled.input`
    background: #f4f4ff;
    color: var(--Black, var(--kakao-logo, #000));
    text-align: center;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    &:focus {
    outline:none;
    }
    border: none;
`
const BudgetWon = styled.div`
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
`
const BudgetBtn = styled.div`
    color: var(--White, #FFF);
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    display: flex;
    height: 71px;
    padding: 4px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    background: linear-gradient(247deg, #BCBDFF 7.5%, #5D5FEF 62.93%);
    cursor: pointer;
    white-space: nowrap;
`


// 아래부턴 Add 대한 내용
const AddContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    width: 100%;
`

const AddDescContainer = styled.div`
    display: flex;
    width: 75%;
    height: 90px;
    padding: 28px 75px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 30px;
    flex-shrink: 0;
    border-radius: 100px;
    background: var(--Main, #5D5FEF);
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
    margin-top: 15px;
`
const AddTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
`
const AddTitle = styled.div`
    color: var(--White, #FFF);
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
    white-space: nowrap;
`
const AddSubTitle = styled.div`
    color: var(--White, #FFF);
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 27px */
    white-space: nowrap;
`
const AddDesc = styled.div`
    color: var(--White, #FFF);
    font-size: 23px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
    white-space: nowrap;
    margin-left: 15%;
`
const AddDescCost = styled.div`
    justify-self: flex-end;
    display: flex;
    padding: 12px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-bottom: 4px solid var(--Point, #FF5972);
    background: rgba(255, 255, 255, 0.88);
    color: var(--Point, #FF5972);
    text-align: center;
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; 
`
const AddWon = styled.div`
    display: inline-flex;
`
const AddGraphContainer = styled.div`
    width: 80%;
    max-width: 1400px;
    height: 500px;
    flex-shrink: 0;
    filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.12));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 30px;
    border-radius: 12px;
    border: 1px solid var(--Sub1, rgba(0, 0, 0, 0.12));
    background: var(--White, #FFF);
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
    margin-bottom: 50px;
`
const AddGraphDesc = styled.div`
    display: inline;
    flex-direction: column;
    justify-content: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    fill: var(--White, #FFF);
    padding: 28px;
`
const Point = styled.span`
    color: ${({isExtra}) => (isExtra ? '#EA3C3C' : '#6394F8')};
`

const AddGraph = styled.div`
    width: 668px;
    height: 300px;
    margin: 20px;
`
const AddBackground = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-bottom: 1px solid var(--Gray-03, #EEEBE8);
    background: var(--Sub2, #F4F3FF);
    width: 100%;
    height: 1560px;
    padding-top: 25px;
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
const AddPlanAnswer = styled.textarea`
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

const GotoQnaContainer = styled.div`
    margin-top: 30px;
    display: flex;
    width: 80%;
    height: 40px;
    padding: 24px 32px;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 100px;
    border: 1px solid var(--Gray-02, #BBB8B8);
    background: var(--White, #FFF);
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
    gap: 37%;
    justify-content: center;
    margin-bottom: 60px;
`
const QnaDesc = styled.div`
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    white-space: nowrap;
`
const QnaBtn = styled.div`
    color: var(--Main, #5D5FEF);
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    cursor: pointer;
    display: flex;
    white-space: nowrap;
`