import { MutableRefObject, RefObject, useRef } from 'react';

import { FormObject } from '../types/types';

function useCreateForm(): FormObject {
  const nameRef: RefObject<HTMLInputElement> = useRef(null);
  const ageRef: RefObject<HTMLInputElement> = useRef(null);
  const emailRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordRef: RefObject<HTMLInputElement> = useRef(null);
  const confirmPasswordRef: RefObject<HTMLInputElement> = useRef(null);
  const genderRef: RefObject<HTMLInputElement> = useRef(null);
  const acceptRef: RefObject<HTMLInputElement> = useRef(null);
  const pictureRef: MutableRefObject<string | null> = useRef<string | null>(null);
  const countryRef: MutableRefObject<string | null> = useRef<string | null>(null);

  return {
    nameRef,
    ageRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    genderRef,
    acceptRef,
    pictureRef,
    countryRef,
  };
}

export default useCreateForm;
