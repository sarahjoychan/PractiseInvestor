import { EReduxActionTypes } from '../constants/actionTypes';
import { getUser } from '../api/backendApi';// import all exports from api folder (EX, api.(function) to use a function )

// Action Creators - functions that return an action

export const getAllActivities = () => async (dispatch: (arg: { type: string; payload: []; }) => void) => {
  try {
    const { data } = await getUser(); // decontruct response to grab data from response object

    const { activities } = data;
    const action = {
      type: EReduxActionTypes.FETCH_ACTIVITIES,
      payload: activities,
    };

    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};