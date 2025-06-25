import React, { useEffect } from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from './loginSchema';
import { loginApi } from '../../api/fetchApi';
import useAuthStore from '../../store';

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('login page');
    window.history.pushState(null, '', window.location.href);
    localStorage.clear();
  }, []);
  const { setTokens, getCurrentUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const inputs = watch();

  const onsubmit = async data => {
    loginApi(data)
      .then(res => {
        setTokens(res.data);
        getCurrentUser(inputs.email);
        reset();
        navigate('/home');
      })
      .catch(error => {
        console.log('error in catch:', error.request.status);
        error.request.status === 401
          ? alert('Error in email or password')
          : alert('something went wrong');
      })
      .finally(() => {
        console.log('finally');
      });
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <form className="login-form" onSubmit={handleSubmit(onsubmit)}>
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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="*********"
              {...register('password', { required: true })}
            />
            {errors.password && <span className="errorSpan">{errors.password.message}</span>}
          </div>

          <input type="submit" value="Log In" className="login-button" />
          <p className="signup-text">
            Don't have an account? <Link to="/signUp">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
