import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { curPageRecoil } from '../recoil/atom';
import { isLoginState } from '../recoil/isLoginState';
//경로 바뀔때 실행할 로직
const RouteChangeListener = () => {
  const router = useLocation();
  const [curPage, setCurPage] = useRecoilState(curPageRecoil);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const checkisLogin = () => {
    const accessToken = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");
    if(accessToken && refreshToken){
      setIsLogin(true);
    }
  }
  //recoil로 로그인 상태 저장
  //페이지 변경 시
  useEffect(() => {
    setCurPage(router.pathname);
    checkisLogin();
  }, [router]);
  return null;
};
export default RouteChangeListener;