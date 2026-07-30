import { useForm } from "react-hook-form";
import { api } from "../store/axios";

function CreateTodo() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(formData) {
    try {
      await api.post("/api/todo/createtodo", formData);
      reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>

        <input
          type="text"
          {...register("title", {
            required: "Title is required",
          })}
          className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none ${
            errors.title
              ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          }`}
        />

        {errors.title && (
          <p className="mt-2 text-sm font-medium text-red-600">
            {errors.title.message}
          </p>
        )}

        <label className="mt-4 block">Content</label>

        <input
          type="text"
          {...register("content", {
            required: "Content is required",
          })}
          className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none ${
            errors.content
              ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          }`}
        />

        {errors.content && (
          <p className="mt-2 text-sm font-medium text-red-600">
            {errors.content.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Todo"}
        </button>
      </form>
    </div>
  );
}

export default CreateTodo;
