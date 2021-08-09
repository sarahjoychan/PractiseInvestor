import { EReduxActionTypes } from '../constants/actionTypes';
import { signIn, signUp } from '../api/backendApi';
import { HeaderHomeI } from '../interfaces/HeaderHome'
import { UserI } from '../interfaces/User';

export const login = (form: UserI, history: any) => async (dispatch: (arg: { type: string; data: HeaderHomeI; }) => void) => {
  try {
    const { data }: any = await signIn(form);
    dispatch({
      type: EReduxActionTypes.AUTHENTICATE,
      data,
    });

    history.push('/');// after login push user to homepage
  } catch (error) {
    console.log(error);
  }
};

export const register = (form: UserI, history: string[]) => async (dispatch: (arg: { type: string; data: HeaderHomeI; }) => void) => {
  try {
    const { data } = await signUp(form);

    dispatch({
      type: EReduxActionTypes.AUTHENTICATE,
      data,
    });

    history.push('/');
  } catch (error) {
    console.log(error);
  }
};
