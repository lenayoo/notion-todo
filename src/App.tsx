import "./App.css";

const App = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="header">
        <h1>Lena's Todo</h1>
      </div>
      <div className="w-[350px] h-[500px] bg-indigo-400 rounded opacity-[75%] mt-10">
        <form action="submit" className="mt-4">
          <input type="text" className="w-48 rounded mr-4" />
          <button type="submit" className="">
            submit
          </button>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default App;
