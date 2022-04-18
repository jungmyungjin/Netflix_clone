import { categories, IToDo, toDoState } from "../atomState";
import { useSetRecoilState } from "recoil";

function ToDo({ text, category, id }: IToDo) {
  const setTodos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setTodos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== categories.DOING && (
        <button name={categories.DOING} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== categories.TO_DO && (
        <button name={categories.TO_DO} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== categories.DONE && (
        <button name={categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
