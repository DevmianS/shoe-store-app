import {Pagination} from '@mui/material';

const PaginationUI = ({pageCount, setPage}) => {
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Pagination
      color="primary"
      shape="rounded"
      count={pageCount}
      onChange={handleChangePage}
    />
  );
};

export default PaginationUI;
