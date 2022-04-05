import classes from './Welcome.module.scss';

import { Link } from 'react-router-dom';

import ImageOne from '../assets/image-product-1.jpg';
import ImageTwo from '../assets/image-product-2.jpg';
import ImageThree from '../assets/image-product-3.jpg';
import ImageFour from '../assets/image-product-4.jpg';

const Welcome = () => {
  return (
    <section className={classes.welcome}>
      <h1>Welcome in Sneakers</h1>
      <p>Explore our limited collection</p>
      <div className={classes.listing}>
        <div>
          <Link to="/s1">
            <img src={ImageOne} alt="Fall Limited Edition Sneakers" />
            <h2>Fall Limited Edition Sneakers</h2>
          </Link>
        </div>
        <div>
          <Link to="/s2">
            <img src={ImageTwo} alt="Spring Limited Edition Sneakers" />
            <h2>Spring Limited Edition Sneakers</h2>
          </Link>
        </div>
        <div>
          <Link to="/s3">
            <img src={ImageThree} alt="Summer Limited Edition Sneakers" />
            <h2>Summer Limited Edition Sneakers</h2>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
