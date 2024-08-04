import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseURL = 'https://wellcheers.p-e.kr'; // 백엔드 URL

const Test = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = localStorage.getItem('access');

      if (!accessToken) {
        setError('Access token is missing');
        return;
      }

      try {
        const response = await axios({
          method: 'get',
          url: `${baseURL}/account/mypage/`,
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setUserInfo(response.data);
      } catch (error) {
        console.error('유저 정보 가져오기 중 에러 발생', error);
        setError('Failed to fetch user info');
        if (error.response) {
          console.error('Error response:', error.response);
        }
      }
    };

    fetchUserInfo();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userInfo) {
    return <div>유저 정보 로딩 중...</div>;
  }

  return (
    <div>
      <h1>유저 정보</h1>
      <p>이름: {userInfo.username}</p>
      <p>닉네임: {userInfo.nickname}</p>
      <p>도시: {userInfo.city}</p>
      <p>구/군: {userInfo.gugoon}</p>
      <p>지역 ID: {userInfo.region_id}</p>
      <img src={userInfo.profileimage_url} alt="프로필 이미지" />
    </div>
  );
};

export default Test;
