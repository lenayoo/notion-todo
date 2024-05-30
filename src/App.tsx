import { useCallback, useState } from "react";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState<string>("");
  const [list, setList] = useState<string[]>([]);
  const [editing, setEditing] = useState<boolean>(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTodo(value);
  };

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setList([...list, todo]);
      setTodo("");
    },
    [list, todo]
  );

  const editHandler = (todo: string) => {
    console.log("clicked", { todo });
    setEditing(true);
  };

  const saveHandler = () => {};

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
            value={todo}
          />
          <button type="submit" className="">
            submit
          </button>
        </form>
        <ul className="text-left pl-[20px] pt-4 text-lg">
          {list.map((todo, index) =>
            editing ? (
              <li key={index}>
                {index + 1} . {todo}
                <button
                  type="submit"
                  className=""
                  onClick={() => saveHandler(todo)}
                >
                  save
                </button>
              </li>
            ) : (
              <li key={index}>
                {index + 1} . {todo}
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
