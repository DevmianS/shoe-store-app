import {useTheme} from '@emotion/react';
import {Box, Pagination, useMediaQuery} from '@mui/material';

const PaginationUI = ({pageCount, setPage, isLoading}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      mt: 2,
      mb: 4,
    },
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={styles.wrapper}>
      <Pagination
        size={isDesktop ? 'medium' : 'small'}
        color="primary"
        shape="rounded"
        count={isLoading ? 5 : pageCount}
        onChange={handleChangePage}
        disabled={isLoading ? true : false}
      />
    </Box>
  );
};

export default PaginationUI;
