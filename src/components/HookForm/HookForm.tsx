import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';

import { setForm } from '../../store/Slice';
import { DataForm2, useAppDispatch } from '../../types/types';
import { AutoComplete } from '../../utils/autocomplete';
import { schema } from '../../utils/schema';
import { uploadImage } from '../../utils/uploadImage';
import './style.css';

export const HookForm: React.FC = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DataForm2>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [err, setErr] = useState('');

  const onSubmit = (data: DataForm2) => {
    dispatch(setForm(data));
    navigate('/', { replace: true });
  };

  const handleCountry = (value: string) => {
    setValue('country', value);
    register('country', { value: value });
  };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='name'>Name</label>
      {errors.name && <span className='form__error'>{errors.name.message}</span>}
      <input className='form__input' id='name' {...register('name')} />
      <label htmlFor='age'>Age</label>
      {errors.age && <span className='form__error'>{errors.age.message}</span>}
      <input className='form__input' id='age' {...register('age')} type='number' />
      <label>Email</label>{' '}
      {errors.email && <span className='form__error'>{errors.email.message}</span>}
      <input
        className='form__input'
        id='email'
        {...register('email')}
        placeholder='email@gmail.com'
      />
      <p>
        <strong>Choose your gender </strong>{' '}
        {errors.gender && <span className='form__error'>{errors.gender.message}</span>}
      </p>
      <div className='form__flex'>
        <label htmlFor='male'>Male</label>
        <input {...register('gender')} id='male' type='radio' name='gender' value='Male' />
        <label htmlFor='female'>Female</label>
        <input {...register('gender')} id='female' type='radio' name='gender' value='Female' />
        <label htmlFor='other'>Other</label>
        <input {...register('gender')} id='other' type='radio' name='gender' value='Other' />
      </div>
      <label>Upload your avatar </label>
      {err && <span className='form__error'>{err}</span>}
      <input
        type='file'
        onChange={async (event) => {
          const value = await uploadImage(event);
          if (value && value.startsWith('Error')) {
            setErr(value);
          } else {
            setErr('');
            value && setValue('picture', value);
          }
        }}
      />
      <div className='form__box'>
        <label htmlFor='password' className='form__label-pass'>
          Password{' '}
        </label>
        {errors.password && <span className='form__error'>{errors.password.message}</span>}
        <input {...register('password')} type='password' id='password' className='form__input' />
      </div>
      <div className='form__box'>
        <label htmlFor='confirmPassword' className='form__label-pass'>
          Confirm Password:{' '}
        </label>
        {errors.confirmPassword && (
          <span className='form__error'>{errors.confirmPassword?.message}</span>
        )}
        <input
          type='password'
          {...register('confirmPassword')}
          id='conformPassword'
          className='form__input'
        />
      </div>
      <div className='form__box'>
        <input type='checkbox' id='accept' {...register('accept')} />
        <label htmlFor='accept'> Accept our Terms of Service and Privacy Policy</label>{' '}
        {errors.accept && <span className='form__error'>{errors.accept.message}</span>}
      </div>
      <div>
        <p>
          <strong>Enter your country: </strong>{' '}
          {errors.country && <span className='form__error'>{errors.country.message}</span>}
        </p>
        <AutoComplete handleCountry={handleCountry} />
      </div>
      <button className='form__btn' type='submit' disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};
