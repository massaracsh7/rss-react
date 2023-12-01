import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { setForm } from '../../store/Slice';
import { DataForm2, useAppDispatch, useAppSelector } from '../../types/types';

// yup schema
const schema = yup.object().shape({
  name: yup.string().required('Name is a required field'),
  age: yup.number().required('Age is a required field'),
  email: yup.string().required(' is required to complete').email({
    message: ' is invalid. Please enter a valid email address(e.g., user@example.com)',
  }),
  gender: yup.string().required('gender is a required field'),
  picture: yup.string().required('File is required'),
  country: yup.string().required('country is a required field'),
  password: yup
    .string()
    .min(8, 'Must Contain 8 Characters')
    .required()
    .matches(/^(?=.*[a-z])/, ' Must Contain One Lowercase Character')
    .matches(/^(?=.*[A-Z])/, '  Must Contain One Uppercase Character')
    .matches(/^(?=.*[0-9])/, '  Must Contain One Number Character')
    .matches(/^(?=.*[!@#$%^&*])/, '  Must Contain  One Special Case Character'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
  accept: yup
    .boolean()
    .oneOf(
      [true],
      'You need to accept our Terms of Service and Privacy Policy to be able to proceed.',
    )
    .required(),
});

const file2Base64 = (file: Blob): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = (error) => reject(error);
  });
};

export const HookForm: React.FC = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<DataForm2>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [search, setSearch] = useState({
    text: '',
    suggestions: [''],
  });
  const [isComponentVisible, setIsComponentVisible] = useState(true);

  const list = useAppSelector((state) => state.store.countryReducer);

  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let suggestions = [''];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = list.filter((v: string) => regex.test(v));
    }
    setIsComponentVisible(true);
    setSearch({ suggestions, text: value });
  };

  const suggestionSelected = (value: string) => {
    setIsComponentVisible(false);
    setSearch({
      text: value,
      suggestions: [],
    });
    setValue('country', value);
  };

  const { suggestions } = search;

  const [url, setUrl] = useState('');

  const dispatch = useAppDispatch();

  const onSubmit = (data: DataForm2) => {
    dispatch(setForm(data));
  };

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files && event.target.files[0];
      const base64 = await file2Base64(file);
      setUrl(base64);
    }
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
        onChange={(e) => {
          uploadImage(e);
        }}
      />
      <h6>Image Preview:</h6>
      <textarea value={url} {...register('picture')} />
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
      <div>
        <div onClick={() => setIsComponentVisible(false)}></div>
        <input
          id='input'
          autoComplete='off'
          value={search.text}
          {...register('country')}
          onChange={onTextChanged}
        />
        (
        {suggestions.length > 0 && isComponentVisible && (
          <ul>
            {suggestions.map((item: string, index) => (
              <li key={index}>
                <button key={index} onClick={() => suggestionSelected(item)}>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        )}
        )
      </div>
      <input type='submit' />
    </form>
  );
};
