import style from "./Pagination.module.css";

const Pagination = ({ handlePage, current, total }) => {
  const maxButtonsToShow = 5;
  let startPage = Math.max(current - Math.floor(maxButtonsToShow / 2), 1);
  let endPage = startPage + maxButtonsToShow - 1;

  if (endPage > total) {
    endPage = total;
    startPage = Math.max(endPage - maxButtonsToShow + 1, 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div className={style.pagination}>
      <button onClick={() => handlePage(current - 1)} disabled={current === 1}>
        Anterior
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePage(page)}
          className={current === page ? style.current : ""}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePage(current + 1)}
        disabled={current === total || total === 0}
      >
        Siguiente
      </button>
    </div>
  );
};
export default Pagination;
