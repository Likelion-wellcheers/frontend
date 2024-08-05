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

export const fetchQna = async (question) => {
    try{
        const accessToken = localStorage.getItem("access");
        const response = await axios.post(`${baseURL}/qna/`, 
            {body: question}, 
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