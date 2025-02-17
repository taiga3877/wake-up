import React, { useEffect } from 'react'
import Form from './Pages/Login/Form'
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';

function App() {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token])
  return token ? <Layout><Outlet></Outlet></Layout> : <Form />
}

export default App
