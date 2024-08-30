import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLoginState } from '../recoil/isLoginState';


export const useLogout = () => {
    const navigate = useNavigate();
    const setIsLogin = useSetRecoilState(isLoginState);

    const handleLogout = () => {
        window.localStorage.removeItem("access");
        window.localStorage.removeItem("refresh");
        setIsLogin(false);
        navigate('/');
    }

    return handleLogout;
}


