import axios from "axios";

const baseURL = 'https://wellcheers.p-e.kr'

export const fetchMagazines = async (city_codes) => {
    try{
        const response = await axios.get(`${baseURL}/issue/${city_codes}/getmagazine/`);
        console.log(response.data);
        return response.data;
    }
    catch(e){
        console.log(e);
        return[];
    }
}