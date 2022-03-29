import { atom } from "recoil";

/*
atom은 다음과 같은 두가지를 요구한다
	1. key : 반드시 유니크 해야한다
	2. default : 기본값 설정

	이 부분이, 약간 setState 를 선언하는것과 비슷하다고 생각된다.
*/
export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});
