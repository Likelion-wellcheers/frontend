import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      const postCode = async () => {
        try {
          const response = await axios.post('<http://localhost:5000/api/auth/kakao>', { code });
          const { accessToken, refreshToken } = response.data;

          localStorage.setItem('access', accessToken);
          localStorage.setItem('refresh', refreshToken);

          navigate('/');
        } catch (error) {
          console.error('Error during Kakao login', error);
        }
      };
      postCode();
    }
  }, [navigate]);

  return <div>카카오 로그인 중...</div>;
};

export default KakaoLogin;
