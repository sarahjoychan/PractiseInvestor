import {TableRow, TableCell} from '@material-ui/core';
import { HoldingI } from '../../../../interfaces/Holding';

interface Props {
  holding: HoldingI
  portfolioValue: number
}

export const Holding = ({ holding, portfolioValue }: Props) => {
  //instead of using just holding.price we change it to parseFloat(number.toFixed(2)) so that it'll be more correct in showing if there is loss or gain only after having been rounded to the nearest penny and subtracting the cost that was payed aka holding.avgCost 
  return (
    <TableRow key={holding.company}>
      <TableCell component="th" scope="holding" data-testid="holding-company">
        {holding.company}
      </TableCell>
      <TableCell align="right" data-testid="holding-ticker" >{holding.ticker}</TableCell>
      <TableCell align="right" data-testid="holding-quantity ">{holding.quantity}</TableCell>
      <TableCell align="right" data-testid="holding-price" >{holding.price.toLocaleString('en-us', {style: 'currency', currency:'USD'})}</TableCell>
      <TableCell align="right" data-testid="holding-avgCost" >{holding?.avgCost?.toLocaleString('en-us', {style: 'currency', currency:'USD'})}</TableCell>
      <TableCell align="right" data-testid="holding-avgTotalCost" >{(holding.avgCost * holding.quantity).toLocaleString('en-us', {style: 'currency', currency:'USD'})}</TableCell>
      <TableCell align="right" style=
      {(parseFloat(holding.price.toFixed(2)))-holding.avgCost < 0?{color: 'red'}:{color: 'green'}}>
        {(parseFloat(holding.price.toFixed(2)))-holding.avgCost < 0? '-':null}
        {((Math.abs(holding.price-holding.avgCost)*holding.quantity)).toLocaleString('en-us', {style: 'currency', currency:'USD'})} 
        ({(((parseFloat(holding.price.toFixed(2))-holding.avgCost)/holding.avgCost)*100).toFixed(2)}%)</TableCell>
      <TableCell align="right">{Number(((holding.price*holding.quantity/portfolioValue)*100).toFixed(2))}%</TableCell>
    </TableRow>
  )
}
