import { Todo } from "../models/todo.models.js";

export async function showTodo(req, res) {
  try {
    const userId = req.user.id;

    const userTodos = await Todo.find({
      userId,
    }).limit(10);
    if (userTodos.length === 0) {
      userTodos = [];
      return res.status(200).json({
        message: "you do not have any todo!",
        todos: userTodos,
      });
    }
    res.status(200).json({
      message: "all todo fetched",
      todos: userTodos,
    });
  } catch (err) {
    console.log("error while fetching todo from db", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching todos.",
    });
  }
}

export async function createTodo(req,res) {
    
}
