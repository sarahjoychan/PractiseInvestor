import { render, screen, cleanup } from "@testing-library/react";
import { PastActivity } from "../components/PastActivities/PastActivity/PastActivity";

afterEach(() => {
  cleanup();
});

test('should render PastActivity component', () => {
  const activity = {
    action: "buy",
    company: "Odonate Therapeutics Inc",
    date: "August 7th 2021",
    netAmount: 3.35,
    price: 3.35,
    quantity: 1,
    ticker: "ODT"
  }

  render(<PastActivity activity={activity}/>)

  expect(screen.getByTestId("activity-date")).toBeInTheDocument();
  expect(screen.getByTestId("activity-date").textContent).toBe("August 7th 2021");

  expect(screen.getByTestId("activity-company")).toBeInTheDocument();
  expect(screen.getByTestId("activity-company").textContent).toBe("Odonate Therapeutics Inc");

  expect(screen.getByTestId("activity-ticker")).toBeInTheDocument();
  expect(screen.getByTestId("activity-ticker").textContent).toBe("ODT");

  expect(screen.getByTestId("activity-action")).toBeInTheDocument();
  expect(screen.getByTestId("activity-action").textContent).toBe("buy");

  expect(screen.getByTestId("activity-quantity")).toBeInTheDocument();
  expect(screen.getByTestId("activity-quantity").textContent).toBe("1");

  expect(screen.getByTestId("activity-price")).toBeInTheDocument();
  expect(screen.getByTestId("activity-price").textContent).toBe("$3.35");

  expect(screen.getByTestId("activity-netAmount")).toBeInTheDocument();
  expect(screen.getByTestId("activity-netAmount").textContent).toBe("$3.35");
});

