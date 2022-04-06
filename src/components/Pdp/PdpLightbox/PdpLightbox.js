import React, { useEffect } from 'react';

import classes from './PdpLightbox.module.scss';

import closeIcon from '../../../assets/icon-close.svg';
import previousIcon from '../../../assets/icon-previous.svg';
import nextIcon from '../../../assets/icon-next.svg';

const PdpLightbox = React.forwardRef(
  (
    {
      lightboxToggle,
      productImages,
      ProductOne,
      lightboxChangeHandler,
      previousHandler,
      nextHandler,
      imgIndex,
    },
    ref
  ) => {
    const { mainLighboxRef, imageRef } = ref;

    useEffect(() => {
      mainLighboxRef.current.src = imageRef.current[imgIndex].dataset.src;
      imageRef.current[imgIndex].className = 'active-image';
    }, []);

    return (
      <>
        <div
          className={classes['pdp-lightbox-background']}
          onClick={lightboxToggle}
        ></div>
        <div className={classes['pdp-lightbox-div']}>
          <img
            src={closeIcon}
            id={classes['close-icon']}
            onClick={lightboxToggle}
            alt="close"
          />
          <img
            src={ProductOne}
            id={classes['main-lightbox']}
            ref={mainLighboxRef}
          />
          <div className={classes['pdp-lightbox-teasers']}>
            {productImages.map((image, index) => (
              <img
                src={image.teaser}
                data-src={image.full}
                id={`${image.id}-lightbox`}
                key={image.key}
                onClick={lightboxChangeHandler}
                ref={(element) => (imageRef.current[index] = element)}
              />
            ))}
          </div>
          <button id={classes.previous} onClick={previousHandler}>
            <img src={previousIcon} />
          </button>
          <button id={classes.next} onClick={nextHandler}>
            <img src={nextIcon} />
          </button>
        </div>
      </>
    );
  }
);

export default PdpLightbox;
