import axios from "axios";

const baseURL = 'https://wellcheers.p-e.kr'

export const fetchHome = async () => {
    try{
        const response = await axios.get(`${baseURL}/recommend/home/`);
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}

export const fetchMag = async() => {
    try{
        const response = await axios.get(`${baseURL}/recommend/home/`);
        return response.data;
    }
    catch(e){
        console.log(e)
    }
}

// 필터링 리스트 불러오기
export const fetchFilterList = async () => {
    try{
        const response = await axios.get(`${baseURL}/recommend/`);
        return response.data;
    }
    catch(e){
        console.log(e);
    }
};

// 선택된 옵션으로 지역 가져오기
export const fetchSelectedFilter = async (body) => {
    try{
        const response = await axios.post(`${baseURL}/recommend/`, body);
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}

// 시티코드로 지역 정보 가져오기
export const fetchCityInfo = async (city_code) => {
    try{
        const response = await axios.get(`${baseURL}/recommend/${city_code}/`);
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}

// 시티코드로 시설 정보 가져오기
export const fetchCenters = async (city_code) => {
    const accessToken = localStorage.getItem("access");
    try{
        const response = await axios.get(`${baseURL}/recommend/${city_code}/center/`);
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}

export const fetchCenterInfo = async (center_id) => {
    const accessToken = localStorage.getItem("access");
    try{
        const response = await axios.get(`${baseURL}/recommend/center/${center_id}/`,
            {headers : {
            'Authorization': `Bearer ${accessToken}`,
            }});
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}

export const fetchLikeCenter = async (center_id, likeData) => {
    const accessToken = localStorage.getItem("access");
    try{
        const response = await axios.put(`${baseURL}/recommend/center/${center_id}/`,
            {likeData},
            {headers : {
            'Authorization': `Bearer ${accessToken}`,
            }});
        console.log(response.data);
        return response.data;
    }catch(e){
        console.log(e);
    }
}

//시설 후기
export const fetchCenterReview = async (center_id) => {
    try{
        const response = await axios.get(`${baseURL}/recommend/center/${center_id}/review/`);
        console.log('시설리뷰', response.data);
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}

export const fetchPostReview = async (center_id, content) => {
    try{
        const accessToken = localStorage.getItem("access");
        const response = await axios.post(`${baseURL}/recommend/center/${center_id}/review/`,
            {content},
            {headers : {
            'Authorization': `Bearer ${accessToken}`,
            }});
        console.log(response.data);
        return response.data();
    }
    catch(e){ 
        console.log(e);
    }
}

export const fetchCartId = async (selection) => {
    try{
        const response = await axios.post(`${baseURL}/recommend/mycart/`, selection);
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}

export const fetchCartUpdate = async (id, updatedData) => {
    try{
        const response = await axios.put(`${baseURL}/recommend/mycart/${id}/`, updatedData);
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}

export const fetchCompCost = async (id, budget) => {
    try{
        const response = await axios.post(`${baseURL}/recommend/mycart/${parseInt(id)}/budget/`, budget);
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}

export const fetchPlan = async (planData) => {
    try{
        const accessToken = localStorage.getItem("access");
        const response = await axios.post(`${baseURL}/recommend/mycart/report/`, 
            planData,
            {headers : {
                'Authorization': `Bearer ${accessToken}`,
            }});
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}
