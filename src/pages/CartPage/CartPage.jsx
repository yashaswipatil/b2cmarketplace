import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../../redux/cartSlice';
import './CartPage.css';
import { toast } from 'react-toastify';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.error('Item removed from cart.');
  };

  const handleQuantityChange = (id, qty) => {
    if (qty < 1) return; // prevent zero or negative
    dispatch(updateQuantity({ id, quantity: qty }));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  ).toFixed(2);

  if (cartItems.length === 0) {
    return <h2 style={{ padding: '1.25rem' , marginTop:'3rem' }}>Your cart is empty.</h2>;
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <button className="clear-btn" onClick={() => dispatch(clearCart())}>
        Clear Cart
      </button>
      <div className="cart-items">
        {cartItems.map(item => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className="item-info">
              <h3>{item.title}</h3>
              <p>${item.price.toFixed(2)}</p>
              <div>
                Qty: 
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
                />
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <h3 className="total">Total: ${totalPrice}</h3>
      <button className="checkout-btn">Checkout</button>
    </div>
  );
};

export default CartPage;
