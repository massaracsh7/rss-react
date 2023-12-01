import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required('Name is a required field'),
  age: yup.number().positive().required('Age is a required field'),
  email: yup.string().required(' is required to complete').email({
    message: ' is invalid. Please enter a valid email address(e.g., user@example.com)',
  }),
  gender: yup.string().required('gender is a required field'),
  picture: yup.string().required('image is required'),
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
