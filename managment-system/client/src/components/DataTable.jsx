import { Search, Filter, Plus } from "lucide-react";
const DataTable = ({
  columns,
  data,
  search,
  onSearch,
  onAdd,
  onFilter,
  page,
  totalPages,
  pageSize,
  onPageSizeChange,
  onPageChange,
  total,
}) => {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  return (
    <div className="rounded-xl border bg-white dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b p-4 dark:border-gray-700">
        <div className="flex flex-1 items-center rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-700">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search..."
            className="ml-2 w-full bg-transparent outline-none"
          />
        </div>
        <div className="flex gap-2">
          {onFilter && (
            <button
              onClick={onFilter}
              className="flex items-center gap-2 rounded-lg border px-4 py-2"
            >
              <Filter size={18} />
              Filter
            </button>
          )}
          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              <Plus size={18} />
              Add
            </button>
          )}
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left dark:border-gray-700">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-sm font-medium text-gray-500"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row._id} className="border-b dark:border-gray-700">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between p-4">
        <p className="text-sm text-gray-500">
          Showing {start} to {end} out of {total} records
        </p>
        <div className="flex items-center gap-4">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded-lg border px-3 py-2 dark:bg-gray-700"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => onPageChange(number)}
                  className={`h-9 w-9 rounded-lg ${
                    page === number ? "bg-blue-600 text-white" : "border"
                  }`}
                >
                  {number}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DataTable;
