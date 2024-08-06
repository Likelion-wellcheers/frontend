import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isLoginState } from '../../recoil/isLoginState';
import { useRecoilState } from 'recoil';

const baseURL = 'https://wellcheers.p-e.kr'; // 백엔드 URL

const KakaoLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log('인가 코드:', code); // 인가 코드 확인

    if (code) {
      const postCode = async (code) => {
        try {
          const response = await axios({
            method: 'post',
            url: `${baseURL}/account/kakao/callback/`,
            headers: {
              'Content-Type': 'application/json', // JSON 형식으로 데이터 전송
            },
            data: {
              'code': code // 요청 본문에 인가 코드 포함
            }
          });

          // 응답에서 internal_access_token과 internal_refresh_token 추출
          const { internal_access_token, internal_refresh_token } = response.data;

          // localStorage에 토큰 저장
          localStorage.setItem('access', internal_access_token);
          localStorage.setItem('refresh', internal_refresh_token);

          // Fetch user info after saving tokens
          const fetchUserInfo = async () => {
            try {
              const accessToken = localStorage.getItem("access");
              const userInfoResponse = await axios.get(`${baseURL}/account/mypage/`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });
              setUserInfo(userInfoResponse.data);
              setIsLogin(true); // Set login state to true
              // Check if city is set and navigate accordingly
              if (userInfoResponse.data.city) {
                navigate('/logincomplete');
              } else {
                navigate('/addmyinfo');
              }
            } catch (fetchError) {
              console.error('사용자 정보 가져오기 중 에러 발생', fetchError);
              setError(fetchError);
            }
          };

          fetchUserInfo();
        } catch (error) {
          console.error('인가 코드 전송 중 에러 발생', error);
          if (error.response) {
            console.error('Error response:', error.response);
          }
          setError(error);
        }
      };
      postCode(code);
    }
  }, [navigate, setIsLogin]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>카카오 로그인 중...</div>;
};

export default KakaoLogin;
