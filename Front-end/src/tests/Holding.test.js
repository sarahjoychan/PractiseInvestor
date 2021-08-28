import { render, screen, cleanup } from "@testing-library/react";
import { Holding } from '../components/Dashboard/Holdings/Holding/Holding';

afterEach(() => {
  cleanup();
});

test('should render Holding component', () => {
  const holding = {
    avgCost: 14.01,
    company: "Alphatec Holdings Inc",
    price: 14.58,
    quantity: 90,
    ticker: "ATEC"
  };
  const portfolioValue = 278619.23;

  render(<Holding holding={holding} portfolioValue={portfolioValue}/>)

  expect(screen.getByTestId('holding-company')).toBeInTheDocument();
  expect(screen.getByTestId('holding-company').textContent).toBe('Alphatec Holdings Inc');

  expect(screen.getByTestId('holding-ticker')).toBeInTheDocument();
  expect(screen.getByTestId('holding-ticker').textContent).toBe('ATEC');

  expect(screen.getByTestId('holding-quantity')).toBeInTheDocument();
  expect(screen.getByTestId('holding-quantity').textContent).toBe("90");

  expect(screen.getByTestId('holding-price')).toBeInTheDocument();
  expect(screen.getByTestId('holding-price').textContent).toBe("$14.58");

  expect(screen.getByTestId('holding-avgCost')).toBeInTheDocument();
  expect(screen.getByTestId('holding-avgCost').textContent).toBe("$14.01");

  expect(screen.getByTestId('holding-avgTotalCost')).toBeInTheDocument();
  expect(screen.getByTestId('holding-avgTotalCost').textContent).toBe("$1,260.90");

})