import { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper} from '@material-ui/core';
import { useSelector } from 'react-redux'; // to retrieve the data from the store in redux
import useStyles from './styles';
import { Holding } from './Holding/Holding';
import { PieChart } from './PieChart/PieChart';
import { HoldingI  } from '../../../interfaces/Holding';
import { StockChart } from './StockChart/StockChart';
import { DialogButton } from './DialogButton';

interface Props {
  toggleComponent: (str: string) => void;
  portfolioValue: number;
  holdingsPrices: HoldingI[];
}

export const Holdings = ({toggleComponent, portfolioValue, holdingsPrices}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [holdingSelected, setSelectedHolding] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedStock, setSelectedStock] = useState<string>('');
  const classes = useStyles();
  const { holdings, cash } = useSelector((state: any) => state.holdings); // state object is all the states within the combine reducer in index.js in reducer folder
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: any) => {
    setOpen(false);
    if (value.company) {
      setSelectedValue(value.company);
      setSelectedStock(value.ticker);
      setSelectedHolding(value.company);
    }
  };

  return (
    holdings &&
    <>
      <div className={classes.container}> 
        <div style={{ gridColumnEnd: 'span 4', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box m={1} width={500} >
            <PieChart portfolioValue={portfolioValue} cash={cash} b="2rem"/>
            </Box>
        </div>
        <div style={{ gridColumnEnd: 'span 8', justifyContent: 'center', alignItems: 'center' }}>
        {holdings.length ? <Box>
            <div className={classes.container} style={{ padding: "1rem 0 0 0" }}> 
              <div style={{ gridColumnEnd: 'span 12' }}>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                  Company
                </Button>
                <DialogButton holdings={holdings} selectedValue={selectedValue} open={open} onClose={handleClose} />
              </div>
            </div>
            <StockChart holdingSelected={holdingSelected} selectedStock={selectedStock}/>
          </Box> : <></>}
        </div>
      </div>

      <Divider className={classes.divider} />

      {!holdings?.length ? <Button variant="contained" color="secondary" onClick={() => {toggleComponent('Order')}}>No Holdings: Buy Your First Stock</Button> : (
        <Box m={1}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Company</TableCell>
                  <TableCell align="right">Ticker</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Market Value</TableCell>
                  <TableCell align="right">Avg Book Cost</TableCell>
                  <TableCell align="right">Total Avg Cost</TableCell>
                  <TableCell align="right">Unrealized Gain/Loss</TableCell>
                  <TableCell align="right">% of Portfolio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {holdingsPrices.map((holding: HoldingI) => (
                  <Holding key={holding.company} holding={holding} portfolioValue={portfolioValue}/>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Box>   
         )
      }
  </>
  )
}