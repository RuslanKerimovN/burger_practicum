import ReactDOM from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { useEffect } from 'react';
import styles from './modal-status.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface Props {
    header: string;
    closeModal: () => void;
}

const portal = document.getElementById('portal') as Element;

export const ModalStatus = ({ header, closeModal }: Props) => {

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if(e.key === 'Escape'){
        closeModal();
      }
    };
    window.addEventListener('keydown', close);
    return () => {
      window.removeEventListener('keydown', close);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal} pl-10 pr-10 pt-10 pb-15`}>
        <div className={`${styles.header}`}>
          <div className={`${styles.exit}`}>
            <CloseIcon type="primary" onClick={closeModal}/>
          </div>
        </div>
        <h1 className={`${styles.text}`}>{header}</h1>
      </div>
      <ModalOverlay closeModal={closeModal}/>
    </>,
    portal
  );
};
