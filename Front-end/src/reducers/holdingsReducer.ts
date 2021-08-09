import { EReduxActionTypes, IReduxBaseAction } from '../constants/actionTypes';
import { HoldingI } from '../interfaces/Holding';


interface Holdings {
  holdings: HoldingI[];
  cash: number;
}

// eslint-disable-next-line max-len
const holdingsReducer = (holdings: Holdings[] = [], action:IReduxBaseAction) => { // need to inialize state(holdings) , holdings is gunna be an array of objects, reducer returns the new state
  switch (action.type) {
    case EReduxActionTypes.FETCH_HOLDINGS:
      return action.payload;
    case EReduxActionTypes.UPDATE_HOLDING:
      return action.payload;
    default:
      return holdings;
  }
};

export default holdingsReducer;
