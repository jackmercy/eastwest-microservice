import { useState } from 'react';

/**
 * @function useModalState
 * @description A custom hook used for modal
 * @param {Boolean} status - initial default modal status
 */
const useModalState = (status = false) => {
  const [openModal, setModalStatus] = useState(status);

  const toggleModal = (state = undefined) => {
    setModalStatus(typeof state === 'boolean' ? state : !openModal);
  };

  return [openModal, toggleModal];
};

export default useModalState;
