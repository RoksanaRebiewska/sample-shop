import classes from './SomethingWentWrong.module.scss';

const SomethingWentWrong = () => {
  return (
    <section className={classes['something-wrong']}>
      <h1>Something went wrong, please try again</h1>
    </section>
  );
};

export default SomethingWentWrong;
