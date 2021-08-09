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
   //Dashboard, Order, Past Acitivities, Ranking
   const toggleComponent = (componentString: string): void => {
    setComponent(componentString);
    setTitle(componentString);
  };

  return (
    <>
      <NavBar toggleComponent={toggleComponent} title={title} />
      {component === 'Dashboard' && <Dashboard />}
      {component === 'Order' && <Order toggleComponent={toggleComponent} />}
      {component === 'Past Activities' && <PastActivities />}
      {component === 'Ranking' && <UsersRankings />}
      {component === 'News' && <News />}
    </>
  );
};
