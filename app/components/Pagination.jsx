import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const Pagination = ({
  peopleData,
  peoplePerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(peopleData / peoplePerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center mt-10">
      <button
        onClick={() => {
          setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1);
        }}
        className="mx-1 flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-500 cursor-pointer h-8 w-10"
      >
        <MdNavigateBefore size={15} />
      </button>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={
              page == currentPage
                ? "mx-1 flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-500 cursor-pointer h-8 w-10"
                : "mx-1 flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-500 cursor-pointer h-8 w-10"
            }
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => {
          setCurrentPage(
            currentPage === pages.length ? currentPage : currentPage + 1
          );
        }}
        className="mx-1 flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-500 cursor-pointer h-8 w-10"
      >
        <MdNavigateNext size={20} />
      </button>
    </div>
  );
};

export default Pagination;
