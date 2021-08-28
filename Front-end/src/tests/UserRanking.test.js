import { render, screen, cleanup } from "@testing-library/react";
import UserRanking from "../components/UsersRanking/UserRanking/UserRanking";

afterEach(() => {
  cleanup();
});

test('should render UserRanking component', () => {
  const ranking = {
    numberOfStocks: 6,
    totalNumberOfActivities: 15,
    totalValue: 279339.5944,
    userName: "test"
  }

  const index = 0;

  render(<UserRanking ranking={ranking} index={index}/>)

  expect(screen.getByTestId("ranking-rank")).toBeInTheDocument();
  expect(screen.getByTestId("ranking-rank").textContent).toBe("1");

  expect(screen.getByTestId("ranking-username")).toBeInTheDocument();
  expect(screen.getByTestId("ranking-username").textContent).toBe("test");

  expect(screen.getByTestId("ranking-totalValue")).toBeInTheDocument();
  expect(screen.getByTestId("ranking-totalValue").textContent).toBe("$279,339.59");

  expect(screen.getByTestId("ranking-totalActivities")).toBeInTheDocument();
  expect(screen.getByTestId("ranking-totalActivities").textContent).toBe("15");

  expect(screen.getByTestId("ranking-numberOfStocks")).toBeInTheDocument();
  expect(screen.getByTestId("ranking-numberOfStocks").textContent).toBe("6");
});

