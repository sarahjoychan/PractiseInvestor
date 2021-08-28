import { ActivityI } from "./Activity"
import { HoldingI } from "./Holding"

export default interface UserI {
  _id: string
  cash: number
  holdings: HoldingI[]
  activities: ActivityI[]
  totalValueHistory: totalValueHistoryI[]
  userName: string
  password: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface totalValueHistoryI extends UserI {
  totalValue: number
  date: Date | string
}