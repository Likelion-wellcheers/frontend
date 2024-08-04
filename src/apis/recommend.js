import axios from "axios";

const baseURL = 'https://wellcheers.p-e.kr'

export const fetchHome = async () => {
    try{
        const response = await axios.get(`${baseURL}/recommend/home/`);
        console.log(response.data);
        return response.data;
    }
    catch(e){
        console.log(e);
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
    try{
        const response = await axios.get(`${baseURL}/recommend/${city_code}/center/`);
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}

export const fetchCenterInfo = async (center_id) => {
    try{
        const response = await axios.get(`${baseURL}/recommend/center/${center_id}/`);
        console.log(response.data);
        return response.data;
    }
    catch(e){
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

export const fetchCartId = async (selection) => {
    try{
        const accessToken = localStorage.getItem("access");
        const response = await axios.post(`${baseURL}/recommend/mycart/`, 
            {body: selection}, 
            {headers : {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }});
        console.log(response.data);
        console.log('액세스', accessToken);
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}