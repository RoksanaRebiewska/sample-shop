import { Link } from 'react-router-dom';

import classes from './Welcome.module.scss';
import LoadingSpinner from './LoadingSpinner';

const Welcome = ({ data }) => {
  const dataArray = Object.keys(data).map((item) => ({
    ...data[item],
    id: item,
  }));

  return (
    <section className={classes.welcome}>
      <h1>Welcome in Sneakers</h1>
      <p>Explore our limited collection</p>
      <div className={classes.listing}>
        {data.length === 0 ? (
          <LoadingSpinner />
        ) : (
          dataArray.map((item) => (
            <div key={item.id}>
              <Link to={`/products/${item.id}`}>
                <img src={item.mainImage} alt={item.name} />
                <h2>{item.name}</h2>
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Welcome;
