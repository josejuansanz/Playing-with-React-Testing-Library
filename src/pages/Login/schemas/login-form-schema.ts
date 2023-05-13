import * as yup from 'yup';

export const LoginFormSchema = yup.object({
  username: yup
    .string()
    .required('username is required')
    .max(12, 'Username can not be longer than 12 characters'),
  password: yup
    .string()
    .required('password is required')
    .max(12, 'Password can not be longer than 12 characters')
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, 'Password has to include at least an uppercase letter, a lowercase letter, a number and a special character')
    .required(),
});
