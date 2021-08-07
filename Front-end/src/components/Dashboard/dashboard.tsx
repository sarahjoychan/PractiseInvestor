/* eslint-disable */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import  { Holdings } from './Holdings/holdings'

import { getAllHoldings } from '../../actions/holdings';

export const Dashboard = () => {
  
  const dispatch = useDispatch(); // allows us to dispatch an action
  useEffect(() => {    
    dispatch(getAllHoldings());
  }, [dispatch]);

  return (
    <div>
      <Holdings />
    </div>
  )
}

