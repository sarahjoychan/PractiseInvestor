export interface StockI {
  action: string
  company: string
  date: string
  netAmount: number
  price: number
  quantity: number
  ticker: string
}

export interface BasicStockI {
  name: string
  symbol: string
  __v: number
  _id: string
}