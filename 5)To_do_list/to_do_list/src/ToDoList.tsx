import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

// React hook form 사용전 코드
/*
function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDoError("");
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      return setToDoError("To do should be longer.");
    }
    console.log("submit ");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write a to do"
        />
        <button>Add</button>
        {toDoError === "" ? null : toDoError}
      </form>
    </div>
  );
}
*/

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
        {/* register 함수가 반환하는 객체를 props로 준다
			useForm의 register의 사용으로 value, onChange, useState를 대체해준다 */}
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

export default ToDoList;
