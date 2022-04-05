import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Pdp.module.scss';
import PdpDescription from '../PdpDescription/PdpDescription';
import PdpGallery from '../PdpGallery/PdpGallery';
import PdpLightbox from '../PdpLightbox/PdpLightbox';

const Pdp = ({ data }) => {
  const params = useParams();

  const paramsArray = data.map((item) => item.id.indexOf(params.productId));
  const itemIndex = paramsArray.indexOf(0);

  const {
    images,
    id,
    collection,
    name,
    description,
    price,
    discount,
    standardPrice,
    mainImage,
  } = data[itemIndex];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const mainImageRef = useRef();
  const mainLighboxRef = useRef();
  const imageRef = useRef([]);

  const lightboxToggleHandler = () => {
    setLightboxOpen((prevState) => !prevState);
  };

  useEffect(() => {
    imageRef.current.forEach((el) => (el.className = ''));
    imageRef.current[imgIndex].className = 'active-image';
  }, [imgIndex]);

  const imageChangeHandler = (event) => {
    const index = imageRef.current.indexOf(event.target);
    mainImageRef.current.src = imageRef.current[index].dataset.src;
    setImgIndex(index);
  };

  const lightboxChangeHandler = (event) => {
    const index = imageRef.current.indexOf(event.target);
    mainLighboxRef.current.src = imageRef.current[index].dataset.src;
    setImgIndex(index);
  };

  let i = imgIndex;

  const backFromFirst = (name) => {
    name.current.src =
      imageRef.current[imageRef.current.length - 1].dataset.src;
    setImgIndex(imageRef.current.length - 1);
  };

  const back = (name) => {
    name.current.src = imageRef.current[--i].dataset.src;
    setImgIndex(i);
  };

  const previousHandler = () => {
    if (imgIndex === 0) {
      backFromFirst(mainImageRef);
    } else {
      back(mainImageRef);
    }
  };

  const previousLightboxHandler = () => {
    if (imgIndex === 0) {
      backFromFirst(mainLighboxRef);
    } else {
      back(mainLighboxRef);
    }
  };

  const forward = (name) => {
    name.current.src = imageRef.current[++i].dataset.src;
    setImgIndex(i);
  };

  const forwardFromLast = (name) => {
    name.current.src = imageRef.current[0].dataset.src;
    setImgIndex(0);
  };

  const nextHandler = () => {
    imageRef.current.forEach((el) => (el.className = ''));
    if (i < imageRef.current.length - 1) {
      forward(mainImageRef);
    } else {
      forwardFromLast(mainImageRef);
    }
  };

  const nextLightboxHandler = () => {
    imageRef.current.forEach((el) => (el.className = ''));
    if (i < imageRef.current.length - 1) {
      forward(mainLighboxRef);
    } else {
      forwardFromLast(mainLighboxRef);
    }
  };

  return (
    <section className={classes['pdp-section']}>
      <PdpGallery
        productImages={images}
        lightboxToggle={lightboxToggleHandler}
        ref={{ mainImageRef, imageRef }}
        imageChangeHandler={imageChangeHandler}
        previousHandler={previousHandler}
        nextHandler={nextHandler}
      />
      {lightboxOpen && (
        <PdpLightbox
          productImages={images}
          lightboxToggle={lightboxToggleHandler}
          ref={{ mainLighboxRef, imageRef }}
          lightboxChangeHandler={lightboxChangeHandler}
          previousLightboxHandler={previousLightboxHandler}
          nextLightboxHandler={nextLightboxHandler}
          imgIndex={imgIndex}
        />
      )}
      <PdpDescription
        id={id}
        collection={collection}
        name={name}
        description={description}
        price={price}
        discount={discount}
        standardPrice={standardPrice}
        image={mainImage}
      />
    </section>
  );
};

export default Pdp;
