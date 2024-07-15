import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const LoginFormContainer = styled.div`
  width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 24px;
`;

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('https://demo-nodejs-1.onrender.com/api/auth/login', values);

      if (response.status === 200) {
        message.success('Logged in successfully.');
        navigate('/');
      } else {
        message.error('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Failed to log in:', error);
      message.error('Failed to log in. Please check your credentials and try again.');
    }
  };

  return (
    <LoginContainer>
      <LoginFormContainer>
        <Title>Login User</Title>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </LoginFormContainer>
    </LoginContainer>
  );
};

export default Login;
