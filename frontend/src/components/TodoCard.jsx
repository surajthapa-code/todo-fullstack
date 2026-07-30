export default function TodoCard({
  title,
  content,
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border bg-white p-4 shadow-sm transition-all">
      <input
        type="checkbox"
        className="mt-1 h-5 w-5 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-600">
          {content}
        </p>
      </div>
    </div>
  );
}