import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Holdings } from './Holdings/Holdings';
import { getAllHoldings } from '../../actions/holdings';
import { PacmanLoader } from 'react-spinners';
import './Dashboard.css';

export const Dashboard = () => {
  
  const dispatch = useDispatch(); // allows us to dispatch an action
  const { holdings, cash } = useSelector((state: any) => state.holdings);

  useEffect(() => {    
    dispatch(getAllHoldings());
  }, [dispatch]);

  return (
    (holdings || cash) ?
    <div>
      <Holdings />
    </div>
    :
    // if api call takes a little while to load the info, pacman loader will pop up until the api call is done
    <div className="loader-box">
      <PacmanLoader color={'blue'} size={45} />
    </div>
  )
}

