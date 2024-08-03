import axios from "axios";

const baseURL = 'https://wellcheers.p-e.kr'

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
        console.log(response.data);
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

export const fetchCartId = async (selection) => {
    try{
        const response = await axios.post(`${baseURL}/recommend/mycart/`, selection);
        console.log(response.data);
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}