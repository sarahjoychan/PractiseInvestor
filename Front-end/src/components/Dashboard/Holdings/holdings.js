/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux'; // to retrieve the data from the store in redux
import useStyles from './styles';
import Holding from './Holding/holding';
import { getCurrentPrice } from '../../../api/stockApi';

const Holdings = () => {
  const classes = useStyles();
  const [totalHoldingsValue, setTotalHoldingsValue] = useState(0); //state has to only refresh the component if first time user has come onto page
  const [holdingsPrices, setHoldingsPrices] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);

  const { holdings, cash } = useSelector((state) => state.holdings); // state object is all the states within the combine reducer in index.js in reducer folder

  useEffect(() => {
    function getPrice () {
      const apiCallArray = holdings.map(async (holding) => {
        const price = Number((await getCurrentPrice(holding.ticker)).data.price)
        // const price = 0;
        return {...holding, price };
      });
      Promise.all(apiCallArray).then((res)=>{
        setHoldingsPrices(res);
        let calcPortfolioValue = cash;
        res.forEach((holding)=>{
          calcPortfolioValue += holding.price*holding.quantity;
        });
        setPortfolioValue(Number(calcPortfolioValue.toFixed(2)));
      });

    };

    getPrice();
    const interval = setInterval(() => getPrice(), 60000 ); // every 1 minute, 55 api calls/minute retriction

    return () => {
      clearInterval(interval);
    }
  }, [holdings])

  return (
    <>
      {!holdings.length ? <p>No Holdings, buy a stock</p> : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Company</TableCell>
                  <TableCell align="right">Ticker</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Current Price</TableCell>
                  <TableCell align="right">Avg Cost</TableCell>
                  <TableCell align="right">Unrealized Gain/Loss</TableCell>
                  <TableCell align="right">% of Portfolio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {holdingsPrices.map((holding) => (
                  <Holding key={holding.company} holding={holding} portfolioValue={portfolioValue}/>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      }
  </>
  );
};

export default Holdings;
