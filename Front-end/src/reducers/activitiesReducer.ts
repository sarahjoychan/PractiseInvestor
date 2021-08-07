import { IReduxBaseAction, EReduxActionTypes } from '../constants/actionTypes';

const activitiesReducer = (activities: any[] = [], action:IReduxBaseAction) => { // need to inialize state(holdings) , holdings is gunna be an array of objects, reducer returns the new state
  switch (action.type) {
    case EReduxActionTypes.FETCH_ACTIVITIES:
      return action.payload;
    default:
      return activities;
  }
};

export default activitiesReducer;
