import { useNavigate } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { curPageRecoil } from '../recoil/atom';
import { isLoginState } from "../recoil/isLoginState";

export const usePath = (router, isLoginRequired) => {
    const navigate = useNavigate();
    const setCurPage = useSetRecoilState(curPageRecoil);
    const isLogin = useRecoilValue(isLoginState);

    // 경로를 바꾸고, 해당 경로로 curPage 변수를 설정하는 함수
    // 로그인 여부를 두번째 변수로 받음
    const handlePath = (router, isLoginRequired) => {
        if(isLoginRequired){
            if(!isLogin){
                alert("로그인 먼저 해주세요!");
                navigate("/login");
                return;
              }
            else{
                navigate(router);
                setCurPage(router);
            }
        }
        else
            navigate(router);
            setCurPage(router);
    }

    return handlePath;
}