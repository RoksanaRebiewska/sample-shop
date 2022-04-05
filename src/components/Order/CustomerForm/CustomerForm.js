import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../../store/cart-slice';

import ApiService from '../../../Api.service';

import classes from './CustomerForm.module.scss';

const CustomerForm = () => {
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.cart.items);

  const history = useHistory();

  const nameRef = useRef('');
  const addressRef = useRef('');
  const phoneRef = useRef('');
  const emailRef = useRef('');

  const [nameError, setNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [nameIsValid, setNameIsValid] = useState(false);
  const [addressIsValid, setAddressIsValid] = useState(false);
  const [phoneIsValid, setPhoneIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);

  const sendOrderHandler = async (data) => {
    try {
      await ApiService.httpPost('shop-order.json', data);
      history.push('/thank-you');
      dispatch(cartActions.clearCart());
    } catch (error) {
      history.push('/error');
    }
  };

  const nameChangeHandler = () => {
    setNameError(false);
  };

  const addressChangeHandler = () => {
    setAddressError(false);
  };

  const phoneChangeHandler = () => {
    setPhoneError(false);
  };

  const emailChangeHandler = () => {
    setEmailError(false);
  };

  const orderHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredAddress = addressRef.current.value;
    const enteredPhone = phoneRef.current.value;
    const enteredEmail = emailRef.current.value;

    if (enteredName.trim() === '') {
      setNameError(true);
    }

    if (!nameError) {
      setNameIsValid(true);
    }

    if (enteredAddress.trim() === '') {
      setAddressError(true);
    }

    if (!addressError) {
      setAddressIsValid(true);
    }

    if (!enteredEmail.includes('@')) {
      setEmailError(true);
    }

    if (!emailError) {
      setEmailIsValid(true);
    }

    if (enteredPhone.length !== 9) {
      setPhoneError(true);
    }

    if (!phoneError) {
      setPhoneIsValid(true);
    }

    if (!nameIsValid || !addressIsValid || !phoneIsValid || !emailIsValid) {
      return;
    }

    const customerData = {
      name: enteredName,
      address: enteredAddress,
      phone: enteredPhone,
      email: enteredEmail,
    };

    const data = [orderData, customerData];

    sendOrderHandler(data);
  };

  return (
    <>
      <h2 className={classes['form-header']}>Your delivery data</h2>
      <form onSubmit={orderHandler} className={classes['customer-form']}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          onChange={nameChangeHandler}
          className={nameError ? `${classes['error']}` : ''}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          ref={addressRef}
          onChange={addressChangeHandler}
          className={addressError ? `${classes['error']}` : ''}
        />
        <label htmlFor="phone">Phone number</label>
        <input
          type="number"
          id="phone"
          ref={phoneRef}
          onChange={phoneChangeHandler}
          className={phoneError ? `${classes['error']}` : ''}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          ref={emailRef}
          onChange={emailChangeHandler}
          className={emailError ? `${classes['error']}` : ''}
        />
        <button id={classes.order} type="submit">
          Order
        </button>
      </form>
    </>
  );
};

export default CustomerForm;
