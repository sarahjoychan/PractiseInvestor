import { EReduxActionTypes } from '../constants/actionTypes';
import { getUser, putHoldings } from '../api/backendApi';// import all exports from api folder (EX, api.(function) to use a function )
import { HoldingI } from '../interfaces/Holding';
import { StockI } from '../interfaces/Stock'

// Action Creators - functions that return an action

export const getAllHoldings = () => async (dispatch: (arg: { type: string; payload: { holdings: HoldingI[]; cash: number; }; }) => void) => {
  try {
    const { data } = await getUser(); // decontruct response to grab data from response object
    const { holdings, cash } = data;
    const action = {
      type: EReduxActionTypes.FETCH_HOLDINGS,
      payload: { holdings, cash },
    };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateHoldings = (order: StockI) => async (dispatch: (arg: { type: string; payload: { holdings: HoldingI; cash: number; }; }) => void) => {
  try {
    const { data } = await putHoldings(order);
    const { holdings, cash } = data;
    const action = {
      type: EReduxActionTypes.UPDATE_HOLDING,
      payload: { holdings, cash },
    };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};
