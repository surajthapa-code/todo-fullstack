import { Todo } from "../models/todo.models.js";

export async function showTodo(req, res) {
  try {
    const { userId } = req.user;

    const userTodos = await Todo.find({
      user: userId,
    }).limit(10);
    if (userTodos.length === 0) {
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

export async function createTodo(req, res) {
  const { title, content } = req.body;
  const { userId } = req.user;

  if (!title || !content) {
    console.log("empty fields while creating todo!");
    return res.status(404).json({
      message: "empty fields are not allowed!",
    });
  }
  try {
    const todoInstance = await Todo.create({
      title: title,
      content: content,
      completed: false,
      user: userId,
    });

    res.status(201).json({
      message: "todo created",
      todo: todoInstance,
    });
  } catch (err) {
    (console.log("error while creating todo", err),
      res.status(500).json({
        message: "could not create todo might need to try again ",
        err,
      }));
  }
}
export async function deleteTodo(req, res) {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const Deletedtodo = await Todo.findOneAndDelete({
      $and: [{ _id: id }, { user: userId }],
    });
    if (!Deletedtodo) {
      return res.status(201).json({
        message: "could not delete!",
      });
    }
    res.status(200).json({
      message: "todo deleted sucess!",
      Deletedtodo,
    });
  } catch (err) {
    console.log("error while deleting todo!", err);
    res.status(500).json({
      message: "internal server error!",
      err,
    });
  }
}
