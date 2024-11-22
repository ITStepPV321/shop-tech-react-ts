import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import ProductsList from './components/products/ProductsList';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/accounts/Login';
import CreateProduct from './components/products/CreateProduct';
import EditProduct from './components/products/EditProduct';
import { Register } from './components/accounts/Register';
import { login, logout } from './store/user/userSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getTokenFromLocalStorage } from './helper/localStorage.helper';
import ProtectedRoute from './components/accounts/ProtectedRoute';

function App() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.user.user)

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();
    try {
      if (token) {
        if (data) {
          dispatch(login(data));

        }
        else {
          dispatch(logout());
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkAuth();


  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
