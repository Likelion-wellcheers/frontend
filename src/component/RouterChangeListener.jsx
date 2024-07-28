import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { curPageRecoil } from '../recoil/atom';

//경로 바뀔때 실행할 로직
const RouteChangeListener = () => {
  const router = useLocation();
  const [curPage, setCurPage] = useRecoilState(curPageRecoil);

  //페이지 변경 시
  useEffect(() => {
    setCurPage(router.pathname);
  }, [router]);

  return null; 
};

export default RouteChangeListener;