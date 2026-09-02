const DataTable = ({
  columns,
  data,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full min-w-max text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-5 py-4 text-left font-semibold text-gray-600">
              SN
            </th>

            {columns.map((column) => (
              <th
                key={column.key}
                className="px-5 py-4 text-left font-semibold text-gray-600"
              >
                {column.label}
              </th>
            ))}

            <th className="px-5 py-4 text-center font-semibold text-gray-600">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-5 py-4 text-gray-600">
                  {index + 1}
                </td>

                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-5 py-4 text-gray-700"
                  >
                    {column.render
                      ? column.render(item)
                      : item[column.key]}
                  </td>
                ))}

                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-blue-600 hover:bg-blue-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(item)}
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 2}
                className="px-5 py-10 text-center text-gray-500"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;