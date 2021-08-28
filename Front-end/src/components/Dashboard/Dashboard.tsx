
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Holdings } from './Holdings/Holdings';
import { getAllHoldings } from '../../actions/holdings';
import { PacmanLoader } from 'react-spinners';
import { HoldingI, NoPriceHoldingI } from '../../interfaces/Holding';
import { getCurrentPrice } from '../../api/stockApi';
import './Dashboard.css';

interface Props {
  toggleComponent: (str: string) => void;
  setPortfolioValue: (num: number) => void;
  portfolioValue: number;
}

export const Dashboard = ({toggleComponent, setPortfolioValue, portfolioValue}: Props) => {
  const { holdings, cash } = useSelector((state: any) => state.holdings);
  const dispatch = useDispatch(); // allows us to dispatch an action
  const [loading, setLoading] = useState(true);
  const [holdingsPrices, setHoldingsPrices] = useState<HoldingI[]>([]);


  useEffect(() => {    
    dispatch(getAllHoldings());
  }, [dispatch]);

  useEffect(() => {
    if (portfolioValue > 0) setLoading(false);
  }, [portfolioValue])

  useEffect(() => {
    function getPrice () {
      const apiCallArray = holdings?.map(async (holding: NoPriceHoldingI) => {
        const price = Number((await getCurrentPrice(holding.ticker)).data.price);
        return {...holding, price };
      });
      apiCallArray && Promise.all<HoldingI>(apiCallArray).then((res: HoldingI[]) => {
        setHoldingsPrices(res);
        let calcPortfolioValue = cash;
        res && res.forEach((holding: HoldingI)=>{
          calcPortfolioValue += holding.price*holding.quantity;
        });
        setPortfolioValue(Number(calcPortfolioValue.toFixed(2)));
      });
    };
    getPrice();
    const interval = setInterval(() => getPrice(), 120000 ); // every 1 minute, 55 api calls/minute retriction
    return () => {
      clearInterval(interval);
    }
  }, [holdings])

  return (
    (loading) ?
    <div className="loader-box">
      <PacmanLoader color={'blue'} size={45} />
    </div>
    :<div>
      <Holdings toggleComponent={toggleComponent} portfolioValue={portfolioValue} holdingsPrices={holdingsPrices}/>
    </div>
  )
}

