import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Getuserinfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const accessToken = localStorage.getItem("access");
        const response = await axios.get('https://wellcheers.p-e.kr/account/mypage/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchUserInfo();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Info</h1>
      <img src={userInfo.profileimage_url} alt="Profile" />
      <p><strong>Username:</strong> {userInfo.username}</p>
      <p><strong>Nickname:</strong> {userInfo.nickname}</p>
      <p><strong>City:</strong> {userInfo.city}</p>
      <p><strong>Gugoon:</strong> {userInfo.gugoon}</p>
    </div>
  );
};

export default Getuserinfo;
