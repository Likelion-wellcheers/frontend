import { atom } from "recoil";
//현재 페이지 경로 담는 전역변수
export const curPageRecoil = atom({
    key:'curPage',
    default: '/',
});