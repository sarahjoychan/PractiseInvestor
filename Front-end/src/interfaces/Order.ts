export interface CompanyStatePropertiesI {
  name: string;
  symbol: string;
  data: {
    price: number;
  };
}

export interface Company {
  company: CompanyStatePropertiesI[];
  
}

export interface TickerStatePropertiesI {
  ticker: string;
}