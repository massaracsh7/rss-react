import { MutableRefObject, RefObject } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import store from '../store';

export interface DataForm {
  name: string;
  age: number;
  email: string;
  gender: Gender;
  accept: boolean;
  picture: string;
  country: string;
  password: string;
  confirmPassword: string;
}

export type Gender = 'Other' | 'Female' | 'Male';

export interface DataForm2 {
  name: string;
  age: number;
  email: string;
  gender: string;
  picture: string;
  password: string;
  confirmPassword: string;
  accept: boolean;
  country: string;
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export interface FormObject {
  nameRef: RefObject<HTMLInputElement>;
  ageRef: RefObject<HTMLInputElement>;
  emailRef: RefObject<HTMLInputElement>;
  passwordRef: RefObject<HTMLInputElement>;
  confirmPasswordRef: RefObject<HTMLInputElement>;
  genderRef: RefObject<HTMLInputElement>;
  acceptRef: RefObject<HTMLInputElement>;
  pictureRef: MutableRefObject<string | null>;
  countryRef: MutableRefObject<string | null>;
}

export interface errorObject {
  name?: string;
  age?: string;
  email?: string;
  gender?: string;
  accept?: string;
  country?: string;
  picture?: string;
  password?: string;
  confirmPassword?: string;
}
