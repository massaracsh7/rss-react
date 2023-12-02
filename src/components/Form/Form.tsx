import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ValidationError } from 'yup';

import { setForm } from '../../store/Slice';
import { FormObject, errorObject, useAppDispatch } from '../../types/types';
import { AutoComplete } from '../../utils/autocomplete';
import useCreateForm from '../../utils/createForm';
import { schema } from '../../utils/schema';
import { uploadImage } from '../../utils/uploadImage';
import './style.css';

export const Form: React.FC = () => {
  const {
    nameRef,
    ageRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    genderRef,
    acceptRef,
    pictureRef,
    countryRef,
  }: FormObject = useCreateForm();

  const handleCountry = (value: string) => {
    countryRef.current = value;
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<errorObject>({});

  const [errorImage, setErrorImage] = useState('');

  return (
    <div>
      <form action='#' onSubmit={handlerSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input id='name' type='text' ref={nameRef} />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor='age'>Age:</label>
          <input id='age' type='number' ref={ageRef} />
          {errors.age && <p>{errors.age}</p>}
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input id='email' type='email' ref={emailRef} />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input id='password' type='password' ref={passwordRef} />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor='confirmPassword'>Password repeat:</label>
          <input id='confirmPassword' type='password' ref={confirmPasswordRef} />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <div>
          <label htmlFor='male'>Male</label>
          <input ref={genderRef} id='male' type='radio' name='gender' value='Male' />
          <label htmlFor='female'>Female</label>
          <input ref={genderRef} id='female' type='radio' name='gender' value='Female' />
          <label htmlFor='genderless'>genderless</label>
          <input ref={genderRef} id='genderless' type='radio' name='gender' value='genderless' />
          <label htmlFor='unknown'>unknown</label>
          <input ref={genderRef} id='unknown' type='radio' name='gender' value='unknown' />
        </div>
        <div>
          <label htmlFor='accept'>Accept Terms and Conditions</label>
          <input id='accept' type='checkbox' ref={acceptRef} />
          {errors.accept && <p>{errors.accept}</p>}
        </div>
        <div>
          <label htmlFor='picture'>Avatar</label>
          <input
            id='picture'
            type='file'
            onChange={async (event) => {
              const value = await uploadImage(event);
              if (value && value.startsWith('Error')) {
                setErrorImage(value);
              } else {
                setErrorImage('');
                pictureRef.current = value ?? null;
              }
            }}
          />
          {errors.picture && <p>{errors.picture}</p>}
          {errorImage && <p>{errorImage}</p>}
        </div>
        <div>
          <label htmlFor='countries'>Country</label>
          <AutoComplete handleCountry={handleCountry} />
          {errors.country && <p>{errors.country}</p>}
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );

  async function handlerSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = nameRef.current?.value;
    const age = ageRef.current?.value;
    const email = emailRef.current?.value;
    const gender = genderRef.current?.value;
    const accept = acceptRef.current?.checked;
    const country = countryRef.current;
    const picture = pictureRef.current;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    try {
      await schema.validate(
        { name, age, email, gender, accept, country, picture, password, confirmPassword },
        { abortEarly: false },
      );
      const data = {
        name,
        age,
        email,
        gender,
        accept,
        country,
        picture,
        password,
        confirmPassword,
      };
      dispatch(setForm(data));
      navigate('/', { replace: true });
    } catch (error) {
      const validationErrors: errorObject = {};
      if (error instanceof ValidationError) {
        error.inner.forEach((error) => {
          console.log(error.path, error.message);
          validationErrors[error.path as keyof typeof validationErrors]
            ? (validationErrors[error.path as keyof typeof validationErrors] =
                validationErrors[error.path as keyof typeof validationErrors] + ' ' + error.message)
            : (validationErrors[error.path as keyof typeof validationErrors] = error.message);
        });
        setErrors(validationErrors);
      }
    }
  }
};
