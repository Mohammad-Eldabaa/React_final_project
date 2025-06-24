import React from 'react';
import './signUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../login/loginSchema';
import { signupApi } from '../../api/fetchApi';

export default function SignUpPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });
  const onsubmit = async data => {
    await signupApi(data)
      .then(res => {
        console.log(res);
        reset();
        navigate('/Login');
      })
      .catch(error => {
        console.log(error);
        error.request.status === 500
          ? alert('This email already existed.')
          : alert('something went wrong');
      })
      .finally(() => console.log('finally'));
  };
  return (
    <div className="signup-container">
      <div className="signup-card " style={{ width: '500px' }}>
        <h1 className="signup-title">Create an Account</h1>
        <form className="signup-form" onSubmit={handleSubmit(onsubmit)}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Mohammad Ramadan Eldabaa."
              {...register('name', { required: true })}
            />
            {errors.name && <span className="errorSpan">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="mohammad_123"
              {...register('username', { required: true })}
            />
            {errors.username && <span className="errorSpan">{errors.username.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="mohammad123@gmail.com"
              {...register('email', { required: true })}
            />
            {errors.email && <span className="errorSpan">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="text"
              placeholder="+20 123 456 789"
              {...register('phone', { required: true })}
            />
            {errors.phone && <span className="errorSpan">{errors.phone.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="avatar">Avatar URL</label>
            <input
              id="avatar"
              type="text"
              placeholder="https://example.com/avatar.png"
              {...register('avatar', { required: true })}
            />
            {errors.avatar && <span className="errorSpan">please add an avatar.</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="*********"
              {...register('password', { required: true })}
            />
            {errors.password && <span className="errorSpan">{errors.password.message}</span>}
          </div>

          <input type="submit" value="Sign Up" className="signup-button" onClick={() => {}} />
          <p className="login-text">
            Already have an account? <Link to="/Login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
