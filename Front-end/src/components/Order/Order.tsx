/* eslint-disable */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, ReactElement, useEffect, } from 'react';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {Box,
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { updateHoldings } from '../../actions/holdings';
import { getMatchingStocks } from '../../api/backendApi';
import { getCurrentPrice } from '../../api/stockApi';
import { BasicStockI } from '../../interfaces/Stock';

interface Props {
  toggleComponent: Function;
}

export default function order({toggleComponent}: Props): ReactElement {
  const { holdings, cash } = useSelector((state: any) => state.holdings);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [allStocks, setAllStocks] = useState<BasicStockI[]>([]);
  const [company, setCompany] = useState<string>('');
  const [ticker, setTicker] = useState<string>('');
  const [action, setAction] = useState<string>('');
  const [date, setDate] = useState<string>(moment().format('MMMM Do YYYY, h:mm a'));
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    // getting all stocks to filter them later instead of making one api call for each filter
    getMatchingStocks(company).then(res => setAllStocks(res.data));
  }, [])

  useEffect(() => {
    if (ticker.length > 0) {
      suggestionHandler()
    }
  }, [ticker])

  const suggestionHandler = async () => {
      const realTimePrice:number = Number((await getCurrentPrice(ticker)).data.price);
      setPrice(realTimePrice)
  }

  const handleSubmit = (e:any) => { 
    e.preventDefault(); // prevent browser from refreshing , defualt when you submit a form
    // checking if the form is entirely filled
    const holding = holdings.find(holding => holding.company === company);
    // checking if the form fields are all filled
    if (ticker && quantity && action) {
      // checking if the holding is one you own if you are trying to sell
      if (action === 'sell' && !holding) return alert("You do not own any shares of this company");
      
      // checking if the type of action is sell
      if (holding  && action === 'sell')  {
        // checking if the user is trying to sell more than he currently owns
        if (quantity <= holding.quantity) {

          dispatch(updateHoldings({ date, company, ticker, action, quantity, price, netAmount: Number((price * quantity).toFixed(2)) }));
          setCompany('');
          setTicker('');
          setAction('');
          setQuantity(0);
          setPrice(0);
          toggleComponent('Dashboard');
        } else {
          alert(`You currently own ${holding.quantity} shares from this company.`)
        }
      } else {
        // check cash
        const netAmount: number = Number((price * quantity).toFixed(2));
        if (cash >= netAmount) {
          dispatch(updateHoldings({ date, company, ticker, action, quantity, price, netAmount }));
          setCompany('');
          setTicker('');
          setAction('');
          setQuantity(0);
          setPrice(0);
          toggleComponent('Dashboard');
        } else {
          alert(`Not enough funds`);
        }
      }
    }
    else {
      alert('Please fill out all fields');
    }
  };

  const handleRadio = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setValue(event.target.value);
    setAction(event.target.value)
  };
 
  const renderAutocomplete = (
    <Autocomplete
      id="autocomplete-suggestion"
      options={allStocks}
      fullWidth
      forcePopupIcon={false}
      getOptionLabel={(option) => `${option.name} (${option.symbol})`}
      onChange={(_, newValue: BasicStockI | null, reason: string) => {
        if (newValue) {
          setCompany(newValue.name);
          setTicker(newValue.symbol);
        }
        if (reason === 'clear') {
          setCompany('');
          setTicker('');
          setPrice(0);
        }
      }}
      renderInput={(params) => <TextField {...params} label="Company" variant="outlined" />}
    ></Autocomplete>
  )

  return (
    <Box m={1}>
      <Paper className={classes.paper}>
        <form className={`${classes.form} ${classes.root}`} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Typography variant="h6">Order</Typography>
          <TextField name="date" label="Date" variant="outlined" fullWidth value={date}/>
          {renderAutocomplete}
          <TextField name="ticker" label="Ticker" variant="outlined" fullWidth value={ticker} onChange={(e) => setTicker( ticker )} />
          <RadioGroup row aria-label="action" name="action1" value={value} onChange={handleRadio}>
            <FormControlLabel value="buy" control={<Radio color="primary"/>} label="Buy" />
            <FormControlLabel value="sell" control={<Radio color="primary"/>} label="Sell" />
          </RadioGroup>
          <TextField type="number" name="quantity" InputProps={{inputProps: { min: 0 }}} label="Quantity" variant="outlined" fullWidth defaultValue={quantity} onChange={(e) => setQuantity(+e.target.value)} />
          <TextField type="number" name="price" label="Price" variant="outlined" fullWidth value={price.toFixed(2)} />
          <TextField type="number" name="netAmount" label="NetAmount" variant="outlined" autoComplete="netAmount" fullWidth value={(price * quantity).toFixed(2)} />
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit Order</Button>
        </form>
      </Paper>
    </Box>
  );
}
