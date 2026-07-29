import { useEffect, useState } from "react";
import { api } from "../store/axios";

function Todolist() {
  const [todos, setTodo] = useState([]);

  useEffect(() => {
    async function TodoFetch() {
      try {
        const res = await api.get("/api/todo/");
        setTodo(res.data.todos);
        console.log(res.data.todos);
      } catch (err) {
        console.log(err, "error while fetching todolist!");
      }
    }
    TodoFetch();
  }, []);
  return (
    <div>
      <h2>todo list</h2>
      <div>
        {todos.map((todo) => {
          return (
            <div key={todo._id}>
              <p>{todo.title}</p>
              <p>{todo.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todolist;
