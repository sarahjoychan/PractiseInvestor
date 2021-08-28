/* eslint-disable */
import { TableRow, TableCell } from '@material-ui/core'
import { StockI } from '../../../interfaces/Stock';

interface Props {
  activity: StockI;
}

export const PastActivity = ({ activity }: Props) => {
  return (
    <TableRow>
      <TableCell component="th" scope="activity" data-testid="activity-date">
        {activity.date}
      </TableCell>
      <TableCell align="right" data-testid="activity-company">{activity.company}</TableCell>
      <TableCell align="right" data-testid="activity-ticker">{activity.ticker}</TableCell>
      <TableCell align="right" data-testid="activity-action">{activity.action}</TableCell>
      <TableCell align="right" data-testid="activity-quantity">{activity.quantity}</TableCell>
      <TableCell align="right" data-testid="activity-price">{activity.price.toLocaleString('en-us', {style: 'currency', currency:'USD'})}</TableCell>
      <TableCell align="right" data-testid="activity-netAmount">{activity.netAmount.toLocaleString('en-us', {style: 'currency', currency:'USD'})}</TableCell>
    </TableRow>
  )
};