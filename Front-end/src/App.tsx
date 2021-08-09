import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { Homepage } from './components/Homepage/Homepage';
import Authenticate from './components/Authenticate/Authenticate';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Box>
        <Switch>
          <Route path="/auth" exact component={Authenticate} />
          <PrivateRoute path="/" exact component={Homepage} />
        </Switch>
      </Box>
    </BrowserRouter>
  );
}

export default App;
