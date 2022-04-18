import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import {
  categories,
  categoryState,
  toDoSelector,
  toDoState,
} from "../atomState";
import ToDo from "./ToDo";

// React hook form 사용전 코드

function ToDoList() {
  // const [toDos] = useRecoilState(toDoState); // value값을 쓰거나 변경할일이 있을때 한번에 사용
  // const toDos = useRecoilValue(toDoState); // value 만 쓰려고 할때
  // const modFn = useSetRecoilState(toDoState); // value 값을 변경하려고 할때

  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any); // as any : type 체크할 필요 없다고 설정
  };
  console.log(category);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form action="">
        <select value={category} onInput={onInput}>
          <option value={categories.TO_DO}>To do</option>
          <option value={categories.DOING}>Doing</option>
          <option value={categories.DONE}>Done</option>
        </select>
      </form>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

/*
// react-hook-form 사용 예제 코드
interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  nickName?: string;
  password: string;
  password1: string;
  extraError?: string;
}
function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@gmail.com",
    },
  }); // 위에서 useState로 처리해줬던 입력 form 처리들이 이곳에서 다 처리해준다.
  // register : form에 속하는 값들을 object로 담고있다
  // watch : form의 입력 값 들의 변화를 관찰 할 수 있도록 해준다.
  // handleSubmit : validation 을 담당한다.

  const onVaild = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "Password are not the  same." },
        { shouldFocus: true }
      );
    }
    if (0) {
      // background 서버 다운
      setError("extraError", { message: "Server down" });
    }
  };

  // console.log(register("toDo"));
  // console.log(watch());
  console.log(errors);
  return (
    <div>
      <form
        onSubmit={handleSubmit(onVaild)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {//register 함수가 반환하는 객체를 props로 준다
			//useForm의 register의 사용으로 value, onChange, useState를 대체해준다}
        <input
          {...register("email", {
            required: "Email is required!",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@gmail.com/,
              message: "Only gmail.com email allowed",
            },
          })} // javascript를 사용한 validation (HTML을 사용한 validation이 아닌!!)
          type="text"
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", {
            required: "First name is required.",
            validate: (value) => true,
          })}
          type="text"
          placeholder="FirstName"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: "Last name is required." })}
          type="text"
          placeholder="LastName"
        />
        <span>{errors?.lastName?.message}</span>

        <input
          {...register("nickName", {
            validate: {
              noAdmin: (value) =>
                value?.includes("admin") ? "no admin allowed" : true,
              noFuck: (value) =>
                value?.includes("fuck") ? "no fuck allowed" : true,
            },
          })}
          type="text"
          placeholder="NickName"
        />
        <span>{errors?.nickName?.message}</span>

        <input
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          type="text"
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "Password is required.",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          type="text"
          placeholder="Password1"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}
*/

export default ToDoList;
