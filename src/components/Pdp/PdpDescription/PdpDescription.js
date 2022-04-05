import { useDispatch, useSelector } from 'react-redux';

import { cartActions } from '../../../store/cart-slice';

import classes from './PdpDescription.module.scss';
import Minus from '../../../assets/icon-minus.svg';
import Plus from '../../../assets/icon-plus.svg';
import Cart from '../../../assets/icon-cart.svg';

const PdpDescription = ({
  collection,
  name,
  description,
  price,
  standardPrice,
  id,
  image,
}) => {
  const dispatch = useDispatch();

  const totalToBeAdded = useSelector((state) => state.cart.toBeAdded);

  const addOneHandler = () => {
    dispatch(cartActions.addOne());
  };

  const removeOneHandler = () => {
    dispatch(cartActions.removeOne());
  };

  const addToCartHandler = () => {
    dispatch(cartActions.addToCart({ name, price, totalToBeAdded, id, image }));
  };

  return (
    <section className={classes['pdp-description-section']}>
      <p className={classes.collection}>{collection}</p>
      <h1 className={classes['product-name']}>{name}</h1>
      <p className={classes['product-description']}>{description}</p>
      <div className={classes['product-price-div']}>
        <h2 className={classes['product-price']}>{`$${price.toFixed(2)}`}</h2>
        <p className={classes['product-discount']}>{`${(
          ((standardPrice - price) / standardPrice) *
          100
        ).toFixed(0)}%`}</p>
      </div>
      <h3 className={classes['standard-price']}>{`$${standardPrice.toFixed(
        2
      )}`}</h3>
      <div className={classes['cart']}>
        <div className={classes['amount-div']}>
          <button onClick={removeOneHandler}>
            <img src={Minus} />
          </button>
          <p>{totalToBeAdded}</p>
          <button onClick={addOneHandler}>
            <img src={Plus} />
          </button>
        </div>
        <button className={classes['add-to-cart']} onClick={addToCartHandler}>
          <img src={Cart} />
          Add to cart
        </button>
      </div>
    </section>
  );
};

export default PdpDescription;
