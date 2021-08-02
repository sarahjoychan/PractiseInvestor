/* eslint-disable */
import { FETCH_ACTIVITIES } from '../constants/actionTypes';
import { getUser } from '../api/backendApi';// import all exports from api folder (EX, api.(function) to use a function )

// Action Creators - functions that return an action

export const getAllActivities = () => async (dispatch) => {
  try {
    const { data } = await getUser(); // decontruct response to grab data from response object

    const { activities } = data;
    const action = {
      type: FETCH_ACTIVITIES,
      payload: activities,
    };

    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};