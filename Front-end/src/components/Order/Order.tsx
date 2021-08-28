/* eslint-disable */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, ReactElement, useEffect, } from 'react';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
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

export default function Order({toggleComponent}: Props): ReactElement {
  const { holdings, cash } = useSelector((state: any) => state.holdings);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [allStocks, setAllStocks] = useState<BasicStockI[]>([]);
  const [company, setCompany] = useState<string>('');
  const [ticker, setTicker] = useState<string>('');
  const [action, setAction] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [value, setValue] = useState<string>('');
  const [sharesHeld, setSharesHeld] = useState<number>(0);

  useEffect(() => {
    // getting all stocks to filter them later instead of making one api call for each filter
    getMatchingStocks(company).then(res => setAllStocks(res.data));
    const rawDate = new Date();
    const dateString = `${rawDate.toLocaleDateString('en-US', {timeZone: 'America/New_York', year: 'numeric', month: 'long', day: 'numeric'})}, ${rawDate.toLocaleTimeString('en-US', {hour12: true, hour: 'numeric', minute: 'numeric'})}`;
    setDate(dateString);
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
        // checking if the user is trying to sell more than user owns
        if (quantity <= holding.quantity) {
          dispatch(updateHoldings({ date, company, ticker, action, quantity, price, netAmount: Number((price * quantity).toFixed(2)) }));
          setCompany('');
          setTicker('');
          setAction('');
          setQuantity(0);
          setPrice(0);
          toggleComponent('Dashboard');
          
        } else alert(`You currently own ${holding.quantity} shares from this company.`)
        
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
        } else alert(`Not enough funds`);
        
      }
    }
    else alert('Please fill out all fields');
    
  };

  const handleRadio = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setValue(event.target.value);
    setAction(event.target.value);
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
          const companyHeld = holdings.find(holding => holding.company === newValue.name);
          if (companyHeld) setSharesHeld(companyHeld.quantity);
          else setSharesHeld(0);
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
      <Paper className={classes.paper} >
        <form className={`${classes.form} ${classes.root}`} noValidate autoComplete="off" onSubmit={handleSubmit} data-testid="order-form">
          <Typography variant="h6">Order</Typography>
          <TextField name="date" label="Date/Time" variant="outlined" fullWidth value={date}/>
          {renderAutocomplete}
          <TextField name="ticker" label="Ticker" variant="outlined" fullWidth value={ticker} onChange={(e) => setTicker( ticker )} />
          <RadioGroup row aria-label="action" name="action1" value={value} onChange={handleRadio}>
            <FormControlLabel value="buy" control={<Radio color="primary"/>} label="Buy" />
            <FormControlLabel value="sell" control={<Radio color="primary"/>} label="Sell" />
          </RadioGroup>
          <TextField type="number" name="quantity" error={(price * quantity > cash && action === 'buy') || (quantity > sharesHeld && action === 'sell')} fullWidth InputProps={{inputProps: { min: 0 }}} label="Quantity" variant="outlined" defaultValue={quantity} onChange={(e) => setQuantity(+e.target.value)} />
          {company.length ? <TextField variant="filled" margin="dense" disabled color="primary" fullWidth label={<p>You currently own {sharesHeld} shares of {company} ({ticker})</p>} /> : <></>}
          <TextField name="price" label="Price" variant="outlined" fullWidth value={price.toLocaleString('en-us', {style: 'currency', currency:'USD'})} />
          <TextField name="netAmount" label="NetAmount" variant="outlined" autoComplete="netAmount" fullWidth  value={(price * quantity).toLocaleString('en-us', {style: 'currency', currency:'USD'})} />
          {company.length && action === 'buy' ? <TextField variant="filled" margin="dense" disabled color="primary" error={price * quantity > cash} fullWidth label={<p>You currently have {cash?.toLocaleString('en-us', {style: 'currency', currency:'USD'})} in available cash</p>} /> : <></>}
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit Order</Button>
          
        </form>
      </Paper>
    </Box>
  );
}
