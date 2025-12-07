const Pagination = ({ page, setPage, total, pageSize }) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      <button
        className="px-3 py-1 border rounded cursor-pointer"
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page <= 1}
      >
        Prev
      </button>
      <div className="text-sm font-semibold">
        Page {page} of {totalPages}
      </div>
      <button
        className="px-3 py-1 border rounded cursor-pointer"
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
