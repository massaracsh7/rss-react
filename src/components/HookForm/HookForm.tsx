import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';

import { setForm } from '../../store/Slice';
import { DataForm2, useAppDispatch } from '../../types/types';
import { AutoComplete } from '../../utils/autocomplete';
import { schema } from '../../utils/schema';
import { uploadImage } from '../../utils/uploadImage';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input {...register('name')} />
      {errors.name && <p>{errors.name.message}</p>}
      <label>Age</label>
      <input {...register('age')} type='number' />
      {errors.age && <p>{errors.age.message}</p>}
      <label>Email</label>
      <input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}
      {errors.gender && <p className='reg-form__error'>{errors.gender.message}</p>}
      <label htmlFor='male'>Male</label>{' '}
      <input {...register('gender')} id='male' type='radio' name='gender' value='Male' />
      <label htmlFor='female'>Female</label>{' '}
      <input {...register('gender')} id='female' type='radio' name='gender' value='Female' />
      <label htmlFor='genderless'>genderless</label>{' '}
      <input
        {...register('gender')}
        id='genderless'
        type='radio'
        name='gender'
        value='genderless'
      />
      <label htmlFor='unknown'>unknown</label>{' '}
      <input {...register('gender')} id='unknown' type='radio' name='gender' value='unknown' />
      <label>Picture</label>
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
      {err && <p>{err}</p>}
      <div className='reg-form__flex'>
        <div>
          <label htmlFor='password' className='reg-form__label-pass'>
            Password
            <input
              {...register('password')}
              type='password'
              id='password'
              className='reg-form__input'
            />
          </label>
          {errors.password && <span className='reg-form__error'>{errors.password.message}</span>}
        </div>
        <div>
          <label htmlFor='confirmPassword' className='reg-form__label-pass'>
            Confirm Password:
            <input
              type='password'
              {...register('confirmPassword')}
              id='conformPassword'
              className='reg-form__input'
            />
          </label>
          {errors.confirmPassword && (
            <span className='reg-form__error'>{errors.confirmPassword?.message}</span>
          )}
        </div>
      </div>
      <label htmlFor='accept'> Agree</label>
      <input type='checkbox' id='accept' {...register('accept')} />
      <AutoComplete handleCountry={handleCountry} />
      <button type='submit' disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};
