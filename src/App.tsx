import { useCallback, useState } from "react";
import "./App.css";
import { Button } from "@mui/joy";

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
      if (todo.oneTodo === "") {
        console.error("please enter the input");
        return;
      }
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
    console.log("clicked");
    const updateList = list.map((item) =>
      item.id === editTodo.id ? { ...item, oneTodo: editTodo.oneTodo } : item
    );
    console.log(updateList);
    setList(updateList);
    setIsEditing(undefined);
    setEditTodo({ id: undefined, oneTodo: "" });
  };

  const deleteHandler = (id: Todo["id"]) => {
    console.log("delete clicked");
    const remainList = list.filter((item) => item.id !== id);
    console.log({ remainList });
    setList(remainList);
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
          <Button type="submit">submit</Button>
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
                <Button onClick={saveHandler}>save</Button>
              </li>
            ) : (
              <li key={todo.id}>
                {index + 1} . {todo.oneTodo}
                <Button
                  type="submit"
                  className=""
                  onClick={() => editHandler(todo)}
                >
                  edit
                </Button>
                <Button
                  type="submit"
                  className=""
                  onClick={() => deleteHandler(todo.id)}
                >
                  delete
                </Button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;
