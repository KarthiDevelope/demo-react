import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const RegisterFormContainer = styled.div`
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

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await axios.post('https://demo-nodejs-1.onrender.com/api/auth/register', values);
      message.success('User registered successfully.');
      form.resetFields();
      navigate("/login");
    } catch (error) {
      console.error('Failed to register user:', error);
      message.error('Failed to register user. Please try again later.');
    }
  };

  return (
    <RegisterContainer>
      <RegisterFormContainer>
        <Title>Register User</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input />
          </Form.Item>
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
          <p>Already have an account? <Link to="/">Login</Link></p>
          <Form.Item>
            <Button type="primary" htmlType="submit">Register</Button>
          </Form.Item>
        </Form>
      </RegisterFormContainer>
    </RegisterContainer>
  );
};

export default Register;
