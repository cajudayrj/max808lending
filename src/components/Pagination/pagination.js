import React from 'react';

function* range(start, end) {
  while (start < end) {
    yield start;
    start += 1;
  }
}

const Pagination = ({
  totalPage,
  activePage,
  onPageChange,
}) => {
  const generatePages = () => {
    if (totalPage <= 6) {
      const pages = Array.from(range(1, totalPage + 1));

      return pages.map((page, index) => (
        <button
          key={index}
          type="button"
          className={page === activePage ? 'is-active' : ''}
          onClick={() => { onPageChange(page); }}
        >
          {page}
        </button>
      ));
    }

    if ((totalPage - activePage) <= 4) {
      const pages = Array.from(range(totalPage - 4, totalPage + 1));

      return (
        <>
          <span className="ellipsis">
            ...
          </span>
          {
            pages.map((page, index) => (
              <button
                key={index}
                type="button"
                className={page === activePage ? 'is-active' : ''}
                onClick={() => { onPageChange(page); }}
              >
                {page}
              </button>
            ))
          }
        </>
      );
    }

    const first = activePage === 1
      ? Array.from(range(activePage, activePage + 3))
      : Array.from(range(activePage - 1, activePage + 2));
    const end = Array.from(range(totalPage - 1, totalPage + 1));

    return (
      <>
        {
          first.map((page, index) => (
            <button
              key={index}
              type="button"
              className={page === activePage ? 'is-active' : ''}
              onClick={() => { onPageChange(page); }}
            >
              {page}
            </button>
          ))
        }
        <span className="ellipsis">
          ...
        </span>
        {
          end.map((page, index) => (
            <button
              key={index}
              modifier="light"
              type="button"
              className={page === activePage ? 'is-active' : ''}
              onClick={() => { onPageChange(page); }}
            >
              {page}
            </button>
          ))
        }
      </>
    );
  };

  return (
    <div className="pagination">
      <section className="btn-page btn-page--prev">
        <button
          disabled={activePage === 1}
          onClick={() => { onPageChange(activePage - 1); }}
        >
          Prev
        </button>
      </section>
      <section className="btn-page btn-page--numbers">
        {generatePages()}
      </section>
      <section className="btn-page btn-page--next">
        <button
          disabled={activePage === totalPage}
          onClick={() => { onPageChange(activePage + 1); }}
        >
          Next
        </button>
      </section>
    </div>
  );
};

export default Pagination;
