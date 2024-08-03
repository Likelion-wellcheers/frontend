import React, { useEffect, useState } from 'react';
import { getUserInfo } from './Getuserinfo';

const Test = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userGugoon, setUserGugoon] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const data = await getUserInfo();
                console.log(data);
                setUserName(data.username);
                setUserEmail(data.email);
                setUserNickname(data.nickname);
                setUserCity(data.city);
                setUserGugoon(data.gugoon);
            } catch (error) {
                console.error('사용자 정보 가져오기 실패', error);
            }
        };

        if (localStorage.getItem('access') && userName === '') {
            fetchUserProfile();
        }
    }, [userName]);

    return (
        <div>
            {userName ? (
                <div>
                    <h1>{userName}님, 환영합니다!</h1>
                    <p>이메일: {userEmail}</p>
                    <p>닉네임: {userNickname}</p>
                    <p>도시: {userCity}</p>
                    <p>구/군: {userGugoon}</p>
                </div>
            ) : (
                <p>로그인하세요.</p>
            )}
        </div>
    );
};

export default Test;
