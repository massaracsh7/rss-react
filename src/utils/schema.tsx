import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(' is a required field')
    .matches(/^[A-Z]/, ' must begin with  uppercase letter'),
  age: yup.number().typeError('age must be a number').positive().required(' is a required field'),
  email: yup
    .string()
    .required(' is required field')
    .email('please, enter a valid email (e.g., user@example.com)')
    .max(255),
  gender: yup.string().required(' is a required field'),
  picture: yup.string().required(' is required'),
  country: yup.string().required(' is a required field'),
  password: yup
    .string()
    .required(' is a required field')
    .matches(/^(?=.*[a-z])/, 'Must Contain One Lowercased Character.')
    .matches(/^(?=.*[A-Z])/, 'Must Contain One Uppercased Character.')
    .matches(/^(?=.*[0-9])/, 'Must Contain One Number Character.')
    .matches(/^(?=.*[!@#$%^&*])/, 'Must Contain  One Special Case Character.')
    .min(8, 'Must Contain 8 Characters. '),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], ' Passwords must match'),
  accept: yup.boolean().oneOf([true], ' You need to accept to be able to proceed.').required(),
});
