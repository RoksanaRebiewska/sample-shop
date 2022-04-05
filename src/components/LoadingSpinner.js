import classes from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={classes['spinner-div']}>
      <div className={classes.ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
