import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { cartActions } from '../../../store/cart-slice';

import classes from './OrderConfirmation.module.scss';
import Delete from '../../../assets/icon-delete.svg';
import CustomerForm from '../CustomerForm/CustomerForm';

const OrderConfirmation = () => {
  const data = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const removeItemHandler = (dataId) => {
    dispatch(cartActions.removeFromCart(dataId));
  };

  return (
    <div className={classes['order-confirmation']}>
      <h1>Your order</h1>
      {data.length === 0 && (
        <p className={classes['order-empty-cart']}>Your cart is empty</p>
      )}
      {data.length !== 0 &&
        data.map((item) => (
          <div key={item.id} className={classes['order-details']}>
            <img src={item.image} alt={item.name} />
            <div>
              <p>{item.name}</p>
              <p>
                {`$${item.price}`} x {`${item.quantity}`}
                <span className={classes['total-price']}>
                  ${+item.price * +item.quantity}
                </span>
              </p>
            </div>
            <img
              src={Delete}
              alt="delete"
              onClick={() => removeItemHandler(item.id)}
            />
          </div>
        ))}
      {data.length !== 0 && (
        <p className={classes['order-total']}>
          Total: $
          {data
            .map((item) => item.price * item.quantity)
            .reduce((prevVal, currVal) => {
              return +prevVal + +currVal;
            })
            .toFixed(2)}
        </p>
      )}
      {data.length !== 0 && <CustomerForm />}
    </div>
  );
};

export default OrderConfirmation;
