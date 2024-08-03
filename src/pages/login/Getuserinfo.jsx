import axios from 'axios';

export const getUserInfo = async () => {
    const accessToken = localStorage.getItem('access');

    const baseURL = 'https://wellcheers.p-e.kr'; // 실제 백엔드 URL로 변경
    try {
        const response = await axios.get(
            `${baseURL}/user`, // 사용자 정보 요청 엔드포인트
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        console.log('사용자 정보 저장 완료');
        return response.data;
    } catch (error) {
        console.error('사용자 정보 요청 중 에러 발생', error);
        throw error;
    }
};
