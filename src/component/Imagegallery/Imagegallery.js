import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './imagegallery.css';
import PhotoApiServer from '../api-server/api-server';
import ImageGalleryItem from '../ImageGalleryItem/Imagegalleryitem';
import Button from '../Button/Button';
import InputMessage from '../InputMessage/InputMesage';
import Error from '../Error/Error';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
const photoApiServer = new PhotoApiServer();

export default function ImageGallery({ onClick, imageName }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  function updateImages() {
    photoApiServer
      .fetchImages()
      .then(result => {
        if (result.hits.length > 0) {
          updateImagesArray(result.hits);
          photoApiServer.incrementPage();
          scroll();
          return;
        }
        throw new Error(`Sorry, but not found images ${imageName}`);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }

  useEffect(() => {
    if (!imageName) return;
    setStatus(Status.PENDING);
    photoApiServer.resetPage();
    photoApiServer.query = imageName;
    updateImages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageName]);

  const updateImagesArray = update => {
    if (photoApiServer.page === 1) {
      setImages(update);
      setStatus(Status.RESOLVED);
    }
    setImages([...images, ...update]);
    setStatus(Status.RESOLVED);
  };

  const scroll = () => {
    if (images.length > 12) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
    return;
  };

  const addImage = () => {
    updateImages('');
    setError(Status.PENDING);
  };

  if (status === Status.IDLE) {
    return <InputMessage />;
  }

  if (status === Status.PENDING) {
    return (
      <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={300}
        width={300}
        timeout={3000}
      />
    );
  }

  if (status === Status.REJECTED) {
    return <Error message={error.message} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        <ul className="ImageGallery" onClick={onClick}>
          {images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                src={image.webformatURL}
                bigImg={image.largeImageURL}
                description={image.tag}
                imageName={imageName}
              />
            );
          })}
        </ul>

        <Button onClick={addImage} />
      </>
    );
  }
}

ImageGallery.propType = {
  onClick: PropTypes.func,
  imageName: PropTypes.string,
};
