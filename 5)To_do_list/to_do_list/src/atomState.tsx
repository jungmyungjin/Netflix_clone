import { atom, selector, useRecoilState } from "recoil";

// type categories = "TO_DO" | "DOING" | "DONE"; // types 대신 enum을 사용

export enum categories {
  // "TO_DO", //  = 0
  // "DOING", // = 1
  // "DONE", // = 2
  "TO_DO" = "TO_DO", // 이런식으로 하면 위의 설정과는 다르게 실제값도 string이 된다
  "DOING" = "DOING", // 이 두 방식중 서비스 혹은 환경에 다루기 편한것으로 사용하면된다.
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: categories;
}

export const categoryState = atom<categories>({
  key: "category",
  default: categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  // selector는 key와 get을 갖는다.
  // key : unique 한 key 값
  // get : method, options 라는 인자를 받으면서 호출된다
  //			options는 객체이며, get functions가 들어있다.
  //			get functions를 이용하면 select의 내부로 atom을 가져올 수 있다.
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
