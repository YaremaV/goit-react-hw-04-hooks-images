import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './imagegallaryitem.css';
import Modal from '../Modal/Modal';

export default function ImageGalleryItem({ src, description, bigImg }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <>
      <li className="ImageGalleryItem">
        <img
          src={src}
          alt={description}
          data-image={bigImg}
          onClick={toggleModal}
          className="ImageGalleryItem-image"
        />
      </li>

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={bigImg} alt={description} />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propType = {
  src: PropTypes.string,
  alt: PropTypes.string,
  data: PropTypes.string,
  onClick: PropTypes.func,
};
