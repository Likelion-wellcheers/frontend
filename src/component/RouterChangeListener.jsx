// components/RouteChangeListener.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoginState } from '../recoil/isLoginState';
import { curPageRecoil } from '../recoil/atom';

const RouteChangeListener = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [curPage, setCurPage] = useRecoilState(curPageRecoil);

  const checkTokenExpiration = () => {
    const token = localStorage.getItem('accessToken'); 
    if (!token || token === 'expired') {
      return false;
    }
    return true;
  };

  useEffect(() => {
    setCurPage(location.pathname);

    if (!checkTokenExpiration()) {
      setIsLogin(false);
      //alert('로그인 페이지로 이동합니다');
      navigate('/login');
    }
  }, [location, navigate, setCurPage, setIsLogin]);

  return null;
};

export default RouteChangeListener;
