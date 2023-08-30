export default function Pagination(props) {
  const getPages = () => {
    const result = [];
    for (let i = 0; i < props.total; i++) {
      let page = i + 1;
      if (i === 0 && props.page > 3) {
        result.push(
          <button
            key={i}
            onClick={() => {
              props.onChange(page);
            }}
          >
            &laquo;
          </button>
        );
      } else if (i >= props.page - 3 && i <= props.page + 1) {
        result.push(
          <button
            key={i}
            className={
              props.page === page
                ? "mx-1 flex flex-row items-center justify-center rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-500 cursor-pointer h-8 w-10"
                : "mx-1 flex flex-row items-center justify-center rounded bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-400 cursor-pointer h-8 w-10"
            }
            onClick={() => {
              props.onChange(page);
            }}
          >
            {page}
          </button>
        );
      }
      if (i === props.total - 1 && props.page < props.total - 2) {
        result.push(
          <button
            key={i}
            onClick={() => {
              props.onChange(page);
            }}
          >
            &raquo;
          </button>
        );
      }
    }
    return result;
  };

  return (
    <div className="flex items-center justify-center mt-5">
      <br />
      {getPages()}
    </div>
  );
}
