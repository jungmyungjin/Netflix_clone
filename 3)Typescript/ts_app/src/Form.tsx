import React from "react";
import { useState } from "react";

function Form() {
  const [value, setValue] = useState("");
  // Typescript에서는 가능한 타입을 명확히 설정해 주어야 한다.
  // event와 같은 타입을 모르는 경우, document를 확인하거나 구글링을 해야한다.
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello " + value);
  };
  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="username"
        />
        <button>login</button>
      </form>
    </div>
  );
}

export default Form;
