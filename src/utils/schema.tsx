import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required('Name is a required field'),
  age: yup.number().positive().required('Age is a required field'),
  email: yup
    .string()
    .email('Please enter a valid email address(e.g., user@example.com)')
    .max(255)
    .required('Email is required field'),
  gender: yup.string().required('Gender is a required field'),
  picture: yup.string().required('Image is required'),
  country: yup.string().required('Country is a required field'),
  password: yup
    .string()
    .min(8, 'Must Contain 8 Characters')
    .required(' is a required field')
    .matches(/^(?=.*[a-z])/, ' Must Contain One Lowercase Character')
    .matches(/^(?=.*[A-Z])/, '  Must Contain One Uppercase Character')
    .matches(/^(?=.*[0-9])/, '  Must Contain One Number Character')
    .matches(/^(?=.*[!@#$%^&*])/, '  Must Contain  One Special Case Character'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
  accept: yup.boolean().oneOf([true], 'You need to accept to be able to proceed.').required(),
});
