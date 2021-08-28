import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import RankingI from '../../../interfaces/Ranking';

interface Props {
  ranking: RankingI;
  index: number;
}

const UserRanking = ({ranking, index}: Props) => (
  <TableRow>
    <TableCell component="th" scope="ranking" data-testid="ranking-rank">
      {index + 1}
    </TableCell>
    <TableCell align="right" data-testid="ranking-username">{ranking.userName}</TableCell>
    <TableCell align="right" data-testid="ranking-totalValue">{ranking.totalValue?.toLocaleString('en-us', {style: 'currency', currency:'USD'})}</TableCell>
    <TableCell align="right" data-testid="ranking-totalActivities">{ranking.totalNumberOfActivities}</TableCell>
    <TableCell align="right" data-testid="ranking-numberOfStocks">{ranking.numberOfStocks}</TableCell>
  </TableRow>
);

export default UserRanking;


