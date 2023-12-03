import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ValidationError } from 'yup';

import { setForm } from '../../store/Slice';
import { FormObject, errorObject, useAppDispatch } from '../../types/types';
import { AutoComplete } from '../../utils/autocomplete';
import useCreateForm from '../../utils/createForm';
import { handlePassword } from '../../utils/handlePassword';
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

  const onOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    genderRef.current = e.target.value;
  };

  const [strength, setStrength] = useState('');
  const [color, setColor] = useState('');

  return (
    <form className='form' onSubmit={handlerSubmit}>
      <label htmlFor='name'>Name</label>
      {errors.name && <span className='form__error'>{errors.name}</span>}
      <input className='form__input' id='name' ref={nameRef} />

      <label htmlFor='age'>Age</label>
      {errors.age && <span className='form__error'>{errors.age}</span>}
      <input className='form__input' id='age' ref={ageRef} type='number' />

      <label>Email</label>
      {errors.email && <span className='form__error'>{errors.email}</span>}
      <input className='form__input' id='email' ref={emailRef} placeholder='email@gmail.com' />

      <p>
        <strong>Choose your gender </strong>
        {errors.gender && <span className='form__error'>{errors.gender}</span>}
      </p>
      <div className='form__flex'>
        <label htmlFor='male'>Male</label>
        <input onChange={onOptionChange} id='male' type='radio' name='gender' value='Male' />
        <label htmlFor='female'>Female</label>
        <input onChange={onOptionChange} id='female' type='radio' name='gender' value='Female' />
        <label htmlFor='other'>Other</label>
        <input onChange={onOptionChange} id='other' type='radio' name='gender' value='Other' />
      </div>

      <label>Upload your avatar </label>
      {errors.picture && <span className='form__error'>{errors.picture}</span>}
      {errorImage && <span className='form__error'>{errorImage}</span>}
      <div className='form__box'>
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
      </div>

      <div className='form__box'>
        <label htmlFor='password'>Password</label>
        {errors.password && <span className='form__error'>{errors.password}</span>}
        <span className={color}> {strength}</span>
        <input ref={passwordRef} type='password' id='password' className='form__input' />
      </div>

      <div className='form__box'>
        <label htmlFor='confirmPassword'>Confirm Password:</label>
        {errors.confirmPassword && <span className='form__error'>{errors.confirmPassword}</span>}
        <input
          type='password'
          ref={confirmPasswordRef}
          id='conformPassword'
          className='form__input'
        />
      </div>

      <div className='form__box'>
        <input type='checkbox' id='accept' ref={acceptRef} />
        <label htmlFor='accept'> Accept our Terms of Service and Privacy Policy</label>
        {errors.accept && <span className='form__error'>{errors.accept}</span>}
      </div>

      <div>
        <p>
          <strong>Enter your country: </strong>
          {errors.country && <span className='form__error'>{errors.country}</span>}
        </p>
        <AutoComplete handleCountry={handleCountry} />
      </div>

      <button className='form__btn' type='submit'>
        Submit
      </button>
    </form>
  );

  async function handlerSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = nameRef.current?.value;
    const age = ageRef.current?.value;
    const email = emailRef.current?.value;
    const gender = genderRef.current;
    const accept = acceptRef.current?.checked;
    const country = countryRef.current;
    const picture = pictureRef.current;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    console.log(password);
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
          validationErrors[error.path as keyof typeof validationErrors]
            ? (validationErrors[error.path as keyof typeof validationErrors] =
                validationErrors[error.path as keyof typeof validationErrors] + ' ' + error.message)
            : (validationErrors[error.path as keyof typeof validationErrors] = error.message);
        });
        setErrors(validationErrors);
        const answer = handlePassword(validationErrors.password, passwordRef.current?.value);
        setStrength(answer ? answer[0] : '');
        setColor(answer ? answer[1] : '');
      }
    }
  }
};
