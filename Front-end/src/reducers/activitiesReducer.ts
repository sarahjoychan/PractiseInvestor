import { IReduxBaseAction, EReduxActionTypes } from '../constants/actionTypes';

// eslint-disable-next-line max-len
/*
 export interface IReduxGetMoviesAction extends IReduxBaseAction {
  type: EReduxActionTypes.GET_MOVIES;
  data: IMovie[];
}

type TMoviesReducerActions = IReduxGetMoviesAction | IReduxGetMovieAction | IReduxResetMovieAction;

export default function(state: IReduxMoviesState = initialState, action: TMoviesReducerActions) {
  switch (action.type) {
    case EReduxActionTypes.GET_MOVIES:
      return { ...state, movies: action.data, moviesLoaded: true, moviesLoadedAt: Date.now() };
    case EReduxActionTypes.GET_MOVIE:
      return { ...state, movie: action.data, movieLoaded: true };
    case EReduxActionTypes.RESET_MOVIE:
      return { ...state, movie: undefined, movieLoaded: false };
    default:
      return state;
  }
} */


const activitiesReducer = (activities: any[] = [], action:IReduxBaseAction) => { // need to inialize state(holdings) , holdings is gunna be an array of objects, reducer returns the new state
  switch (action.type) {
    case EReduxActionTypes.FETCH_ACTIVITIES:
      return action.payload;
    default:
      return activities;
  }
};

export default activitiesReducer;
