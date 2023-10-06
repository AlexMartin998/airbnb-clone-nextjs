import * as yup from 'yup';

const emailYupValidation = yup
  .string()
  .matches(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Invalid email'
  )
  .required('Email is requiered')
  .min(2, 'Min 2 characteres')
  .max(24, 'Max 12 characteres');

const passwordYupValidation = yup
  .string()
  .required('Password is requiered')
  .min(2, 'Min 2 characteres')
  .max(33, 'Max 12 characteres');

export const registerFormSchema = yup.object({
  name: yup
    .string()
    .required('Name is requiered')
    .min(2, 'Min 2 characteres')
    .max(30, 'Max 12 characteres'),
  email: emailYupValidation,
  password: passwordYupValidation,
});
