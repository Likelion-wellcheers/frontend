import axios from "axios";

const baseURL = 'https://wellcheers.p-e.kr'

export const fetchMyInfo = async() => {
    const accessToken = localStorage.getItem("access");
    try{
        const response = await axios.get(`${baseURL}/account/mypage/`,
            {headers : {
            'Authorization': `Bearer ${accessToken}`,
            }});
        console.log(response.data);
        return response.data;
    }catch(e){
        console.log(e);
    }
}

export const fetchMyPlan = async() => {
    const accessToken = localStorage.getItem("access");
    try{
        const response = await axios.get(`${baseURL}/account/mypage/plan/`,
            {headers : {
                'Authorization': `Bearer ${accessToken}`,
            }});
        console.log(response.data);
        return response.data;
    } catch(e){
        console.log(e);
    }
}

export const fetchSaveCenter = async() => {
    const accessToken = localStorage.getItem("access");
    try{
        const response = await axios.get(`${baseURL}/account/mypage/like/`,
            {headers : {
                'Authorization': `Bearer ${accessToken}`,
            }});
        console.log(response.data);
        return response.data;
    } catch(e){
        console.log(e);
    }
}