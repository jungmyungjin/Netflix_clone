import { useForm } from "react-hook-form";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { toDoState } from "../atomState";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  // toDos.push()  // 이렇게 하면 안된다. 렌더링이 다시 발생하지 않는다.
  // [Tip] setToDos(value) 의 value 값을 함수로 준다면, return 되는 값으로 바뀌게 된다.
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]); //
    // setToDos((oldToDos) => [oldToDos]); // Bad Case : oldToDos가 배열 인데, []로 감싸면 배열 안에 배열을 넣은 꼴이 되기 때문이다.
    setValue("toDo", ""); // submit 후 입력 창 에 남아았는 문자열들을 비워준다.
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        type="text"
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
