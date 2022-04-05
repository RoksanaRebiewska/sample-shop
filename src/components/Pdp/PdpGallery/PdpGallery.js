import React from 'react';

import classes from './PdpGallery.module.scss';
import previousIcon from '../../../assets/icon-previous.svg';
import nextIcon from '../../../assets/icon-next.svg';

const PdpGallery = React.forwardRef(
  (
    {
      productImages,
      lightboxToggle,
      imageChangeHandler,
      previousHandler,
      nextHandler,
    },
    ref
  ) => {
    const { mainImageRef, imageRef } = ref;

    return (
      <section className={classes['pdp-gallery-section']}>
        <img
          src={productImages[0].full}
          id={classes.main}
          onClick={lightboxToggle}
          alt={productImages[0].id}
          ref={mainImageRef}
        />
        <div className={classes['pdp-gallery-teasers']}>
          {productImages.map((image, index) => (
            <img
              src={image.teaser}
              data-src={image.full}
              id={image.id}
              key={image.id}
              onClick={imageChangeHandler}
              alt={image.id}
              ref={(element) => (imageRef.current[index] = element)}
            />
          ))}
        </div>
        <button id={classes['previous-mobile']} onClick={previousHandler}>
          <img src={previousIcon} alt="previous icon" />
        </button>
        <button id={classes['next-mobile']} onClick={nextHandler}>
          <img src={nextIcon} alt="next icon" />
        </button>
      </section>
    );
  }
);

export default PdpGallery;
