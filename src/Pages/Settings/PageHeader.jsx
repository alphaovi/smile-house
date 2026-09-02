const PageHeader = ({
  title,
  description,
  buttonText,
  onAdd,
}) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        )}
      </div>

      <button
        onClick={onAdd}
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        + {buttonText}
      </button>
    </div>
  );
};

export default PageHeader;