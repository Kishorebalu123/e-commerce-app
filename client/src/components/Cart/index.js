import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementItem, decrementItem, removeItem, clearCart, calculateTotal,selectCartItems } from '../../features/cart/cartSlice';
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs'; // Assuming you're using these icons
import { AiFillCloseCircle } from 'react-icons/ai'; // Assuming you're using this icon
import Header from '../Header';
import EmptyCartView from '../EmptyCartView'

import './index.css';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);  // Access cart state
  const totalAmount = useSelector(state => state.cart.totalAmount); // Access total amount state
  const dispatch = useDispatch();

  // Calculate total whenever the cart changes
  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems, dispatch,]);

  // Handlers for increment, decrement, remove, and clear actions
  const handleIncrement = (id) => {
    dispatch(incrementItem(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementItem(id));
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));

    const updatedCart = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update LocalStorage
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.removeItem('cart'); // Clear LocalStorage
  };

  return (
    <>
      <Header />
      <div className="cart-container">
        {cartItems.length === 0 ? (
         <EmptyCartView/>
           ) : (
            <div>
              <h1>Your Cart</h1>
             <ul className="cart-list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <img className="cart-product-image" src={item.imageUrl} alt={item.title} />
                  <div className="cart-item-details-container">
                    <div className="cart-product-title-brand-container">
                      <p className="cart-product-title">{item.title}</p>
                      <p className="cart-product-brand">by {item.brand}</p>
                    </div>
                    <div className="cart-quantity-container">
                      <button
                        type="button"
                        className="quantity-controller-button"
                        onClick={() => handleDecrement(item)}
                      >
                        <BsDashSquare color="#52606D" size={12} />
                      </button>
                      <p className="cart-quantity">{item.quantity}</p>
                      <button
                        type="button"
                        className="quantity-controller-button"
                        onClick={() => handleIncrement(item)}
                      >
                        <BsPlusSquare color="#52606D" size={12} />
                      </button>
                    </div>
                    <div className="total-price-remove-container">
                      <p className="cart-total-price">Rs {item.price * item.quantity}/-</p>
                      <button
                        className="remove-button"
                        type="button"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => handleRemove(item)}
                  >
                    <AiFillCloseCircle color="#616E7C" size={20} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <h3>Total: Rs {totalAmount.toFixed(2)}</h3>
              <button className="clear-btn" onClick={handleClearCart}>Clear Cart</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
