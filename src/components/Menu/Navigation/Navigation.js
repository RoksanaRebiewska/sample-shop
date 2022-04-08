import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Logo from '../../../assets/logo.svg';
import Cart from '../../../assets/icon-cart.svg';
import Avatar from '../../../assets/image-avatar.png';
import LoadingSpinner from '../../LoadingSpinner';

import classes from './Navigation.module.scss';

import CartPopup from '../CartPopup/CartPopup';
import { cartPopupActions } from '../../../store/cartPopup-slice';

const Navigation = ({ data }) => {
  const dataArray = Object.keys(data).map((item) => ({
    ...data[item],
    id: item,
  }));

  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const dispatch = useDispatch();

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartVisible = useSelector((state) => state.cartPopup.cartVisible);

  const cartVisibleHandler = () => {
    dispatch(cartPopupActions.setCartVisible());
  };

  const hamburgerOpenHandler = () => {
    setHamburgerOpen((prevState) => !prevState);
  };

  return (
    <nav>
      <div className={classes['nav-links']}>
        <div
          className={
            hamburgerOpen
              ? `${classes.hamburger} ${classes.open}`
              : `${classes.hamburger}`
          }
          onClick={hamburgerOpenHandler}
        ></div>
        <NavLink to="/">
          <img src={Logo} alt="Sneakers logo" />
        </NavLink>
        <ul className={hamburgerOpen ? `${classes.open}` : ''}>
          {data.length === 0 ? (
            <LoadingSpinner />
          ) : (
            dataArray.map((item) => (
              <li>
                <NavLink
                  to={`/products/${item.id}`}
                  onClick={hamburgerOpenHandler}
                  activeClassName={classes.active}
                >
                  {item.shortName}
                </NavLink>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className={classes['cart-section']}>
        <div className={classes['cart-icon-section']}>
          <img src={Cart} alt="Cart icon" onClick={cartVisibleHandler} />
          {totalQuantity ? <p>{totalQuantity}</p> : null}
        </div>
        <img src={Avatar} alt="Avatar" className={classes.avatar} />
      </div>

      {cartVisible && <CartPopup />}
    </nav>
  );
};

export default Navigation;
