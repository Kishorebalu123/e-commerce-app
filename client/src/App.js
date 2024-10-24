import { Routes, Route, Navigate } from 'react-router-dom';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, setCartItems } from './features/cart/cartSlice';

import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Products from './components/Products';
import ProductItemDetails from './components/ProductItemDetails';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';


import './App.css';

const App = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
  
    // Save cart items to LocalStorage whenever they change
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);
  
    // Load cart items from LocalStorage 
    useEffect(() => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        dispatch(setCartItems(JSON.parse(savedCart)));
      }
    }, [dispatch]);
  

    return (
        
        
            <Routes>
                <Route path="/register" element={<RegisterForm/>} />
                <Route path="/login" element={<LoginForm />} />
                <Route exact path="/" element={<ProtectedRoute element={<Home />} />} />
                <Route exact path="/products" element={<ProtectedRoute element={<Products />} />} />
                <Route exact path="/products/:id" element={<ProtectedRoute element={<ProductItemDetails />} />} />
                <Route exact path="/cart" element={<ProtectedRoute element={<Cart />} />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/not-found" />} />
            </Routes>
          
        
    );
};

export default App;
