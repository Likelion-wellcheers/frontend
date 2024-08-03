import axios from "axios";

const baseURL = 'https://wellcheers.p-e.kr'

export const fetchFilterList = async () => {
    try{
        const response = await axios.get(`${baseURL}/recommend/`);
        return response.data;
    }
    catch(e){
        console.log(e);
    }
};

export const fetchSelectedFilter = async (body) => {
    try{
        const response = await axios.post(`${baseURL}/recommend/`, body);
        console.log('데이터',response.data);
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}