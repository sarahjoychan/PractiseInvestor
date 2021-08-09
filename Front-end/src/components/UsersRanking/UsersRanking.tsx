import {useEffect, useState } from 'react';
import './UsersRanking.css';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow} from '@material-ui/core';
import UserRanking from './UserRanking/UserRanking';
import { getRanking } from '../../api/backendApi';
import PacmanLoader from "react-spinners/PacmanLoader";
import TablePaginationActions from '../../utils/TablePaginationActions';

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export const CustomPaginationActionsTable = () => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    (async function useEffectFunc () {
      // setLoading(true);
      // setTimeout(() => {
      //   setLoading(false);
      // }, 100);
      const ranking = await getRanking();
      setRankings(ranking.data);
    })()}, []);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rankings.length - page * rowsPerPage);

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
    <>
    {loading 
      ? <div className="Homepage"><PacmanLoader color={"blue"} loading={loading} size={45} />
      </div>
      :<Box m={1}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell align="right">Username</TableCell>
                <TableCell align="right">Total Value</TableCell>
                <TableCell align="right"># of Order</TableCell>
                <TableCell align="right"># of Current Holdings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rankings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rankings
              ).map((ranking, index) => (
                  <UserRanking key={index} ranking={ranking} index={index} />
                  ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rankings.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        </Box>
      }
    </>
  );
}

export default CustomPaginationActionsTable;
