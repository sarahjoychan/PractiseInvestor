// this helps us avoid misspelling, less error prone app and easier to scale app
// eslint-disable-next-line max-len
// without this, if we mispelled a string it wouldn't give an error, holdings component wouldnt show up and we wouldn't know where the bug is
export interface IReduxBaseAction {
  payload: any;
  type: EReduxActionTypes;
  data?: any;
}

export enum EReduxActionTypes {
  FETCH_HOLDINGS = 'FETCH_HOLDINGS',
  UPDATE_HOLDING = 'UPDATE_HOLDING',
  CLEAR_HOLDINGS = 'CLEAR_HOLDINGS',
  LOGOUT = 'LOGOUT',
  AUTHENTICATE = 'AUTHENTICATE',
  FETCH_ACTIVITIES = 'FETCH_ACTIVITIES'
}

