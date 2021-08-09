import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Ranking from '../../../interfaces/Ranking';

interface Props {
  ranking: Ranking;
  index: number;
}

const UserRanking = ({ranking, index}: Props) => (
  <TableRow>
    <TableCell component="th" scope="ranking">
      {index + 1}
    </TableCell>
    <TableCell align="right">{ranking.userName}</TableCell>
    <TableCell align="right">${Number(ranking.totalValue?.toFixed(2))}</TableCell>
    <TableCell align="right">{ranking.totalNumberOfActivities}</TableCell>
    <TableCell align="right">{ranking.numberOfStocks}</TableCell>
  </TableRow>
);

export default UserRanking;


