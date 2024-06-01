import { useCallback, useState } from "react";
import "./App.css";

const App = () => {
  type Todo = { id: number | undefined; oneTodo: string };

  const [todo, setTodo] = useState<Todo>({
    id: undefined,
    oneTodo: ""
  });
  const [list, setList] = useState<Todo[]>([]);
  const [isEditing, setIsEditing] = useState<number | undefined>(undefined);
  const [editTodo, setEditTodo] = useState<Todo>({
    id: undefined,
    oneTodo: ""
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTodo({ id: Date.now(), oneTodo: value });
  };

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setList([...list, todo]);
      setTodo({ id: undefined, oneTodo: "" });
    },
    [list, todo]
  );

  const editHandler = (todo: Todo) => {
    setIsEditing(todo.id);
  };

  const editChangeHandler = (
    id: Todo["id"],
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditTodo({ id: id, oneTodo: e.target.value });
  };

  const saveHandler = () => {
    setList([...list, editTodo]);
    setIsEditing(undefined);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="header">
        <h1>Lena's Todo</h1>
      </div>
      <div className="w-[350px] h-[500px] bg-indigo-400 rounded opacity-[85%] mt-10">
        <form action="submit" className="mt-4" onSubmit={submitHandler}>
          <input
            type="text"
            className="w-48 rounded mr-4 py-1 px-3"
            onChange={changeHandler}
            value={todo.oneTodo}
          />
          <button type="submit">submit</button>
        </form>
        <ul className="text-left pl-[20px] pt-4 text-lg">
          {list.map((todo, index) =>
            isEditing === todo.id ? (
              <li>
                <input
                  type="text"
                  className="w-48 rounded mr-4 py-1 px-3"
                  onChange={(e) => editChangeHandler(todo.id, e)}
                  value={editTodo.oneTodo}
                />
                <button onClick={saveHandler}>save</button>
              </li>
            ) : (
              <li key={todo.id}>
                {index + 1} . {todo.oneTodo}
                <button
                  type="submit"
                  className=""
                  onClick={() => editHandler(todo)}
                >
                  edit
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;
