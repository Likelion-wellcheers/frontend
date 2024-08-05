import axios from "axios";

const baseURL = 'https://wellcheers.p-e.kr'

export const getMagList = async (body) => {
    try{
        const response = await axios.post(`${baseURL}/region/getarticle/`, body);
        console.log(' 받은데이터', response.data);
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}
