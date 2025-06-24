import * as yup from 'yup';

const loginSchema = yup.object({
  email: yup.string().email('please enter valid email').required('please enter your email'),
  password: yup
    .string()
    .min(6, 'The password must be at least 6 character')
    .required('Please enter the password'),
});

export const signupSchema = yup.object({
  name: yup.string().min(2, 'please enter valid name').required('please enter your name'),
  username: yup
    .string()
    .min(4, 'please enter valid user name')
    .max(24, 'please enter less than 18 charachter')
    .required('please enter your user name'),
  email: yup.string().email('please enter valid email').required('please enter your email'),
  password: yup
    .string()
    .min(6, 'The password must be at least 6 character')
    .required('Please enter the password'),
  phone: yup
    .string()
    .min(11, 'you entered less than 11 number')
    .max(11, 'you entered more than 11 number'),
});

export default loginSchema;
