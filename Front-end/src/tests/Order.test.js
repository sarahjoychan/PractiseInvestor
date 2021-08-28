import { render as rtlRender, screen } from '@testing-library/react'
import Order from '../components/Order/Order';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk),
));

const render = component => rtlRender(
  <Provider store={store}>
    {component}
  </Provider>

)

it('should render the order component', () => {
  render(<Order />)
  expect(screen.getByTestId("order-form")).toBeInTheDocument();
})