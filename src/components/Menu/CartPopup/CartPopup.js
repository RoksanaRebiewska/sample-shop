import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { cartActions } from '../../../store/cart-slice';
import { cartPopupActions } from '../../../store/cartPopup-slice';

import classes from './CartPopup.module.scss';

import Delete from '../../../assets/icon-delete.svg';

const CartPopup = () => {
  const data = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();
  const history = useHistory();

  const removeItemHandler = (dataId) => {
    dispatch(cartActions.removeFromCart(dataId));
  };

  const cartVisibleHandler = () => {
    dispatch(cartPopupActions.setCartVisible());
  };

  const checkoutHandler = () => {
    dispatch(cartPopupActions.setCartVisible());
    history.push('/order-confirmation');
  };

  return (
    <>
      <div
        className={classes['outer-popup']}
        onClick={cartVisibleHandler}
      ></div>
      <div className={classes['cart-popup']}>
        <p className={classes['cart-popup-title']}>Cart</p>
        {data.map((item) => (
          <div key={item.id} className={classes['product-details']}>
            <img src={item.image} />
            <div>
              <p>{item.name}</p>
              <p>
                {`$${item.price}`} x {`${item.quantity}`}
                <span className={classes['total-price']}>
                  ${+item.price * +item.quantity}
                </span>
              </p>
            </div>
            <img src={Delete} onClick={() => removeItemHandler(item.id)} />
          </div>
        ))}
        {data.length === 0 && (
          <p className={classes['empty-cart']}>Your cart is empty</p>
        )}
        {data.length !== 0 && (
          <p className={classes['total']}>
            Total: $
            {data
              .map((item) => item.price * item.quantity)
              .reduce((prevVal, currVal) => {
                return +prevVal + +currVal;
              })
              .toFixed(2)}
          </p>
        )}
        {data.length !== 0 && (
          <button id={classes['checkout']} onClick={checkoutHandler}>
            Checkout
          </button>
        )}
      </div>
    </>
  );
};

export default CartPopup;
