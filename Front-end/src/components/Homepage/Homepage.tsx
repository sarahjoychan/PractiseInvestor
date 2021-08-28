import { useState } from 'react';
import './Homepage.css';
import NavBar from '../NavBar/NavBar';
import { Dashboard } from '../Dashboard/Dashboard';
import Order from '../Order/Order';
import PastActivities from '../PastActivities/PastActivities';
import UsersRankings from '../UsersRanking/UsersRanking';
import News from '../News/News';

export const Homepage = () => {

  const [component, setComponent] = useState('Dashboard');
  const [title, setTitle] = useState('Practise Investing');  
  const [portfolioValue, setPortfolioValue] = useState<number>(0);
   const toggleComponent = (componentString: string): void => {
    setComponent(componentString);
    setTitle(componentString);
  };

  return (
    <>
      <NavBar toggleComponent={toggleComponent} setPortfolioValue={setPortfolioValue} title={title} />
      {component === 'Dashboard' && <Dashboard toggleComponent={toggleComponent} portfolioValue={portfolioValue} setPortfolioValue={setPortfolioValue}/>}
      {component === 'Order' && <Order toggleComponent={toggleComponent} />}
      {component === 'Past Activities' && <PastActivities />}
      {component === 'Ranking' && <UsersRankings />}
      {component === 'News' && <News />}
    </>
  );
};
