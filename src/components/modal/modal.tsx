import ReactDOM from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { useEffect } from 'react';
import modalStyle from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useParams } from 'react-router';
import React from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
    closeModal?: () => void;
    children?: React.ReactNode;
}

const portal = document.getElementById('portal') as Element;

export const Modal = ({ closeModal = () => {}, children=<></> }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams<'id'>();
  const { pathname } = useLocation();

  const header: boolean = pathname.includes('ingredients');

  const onDismiss = () => {
    id ? navigate(-1) : closeModal();
  };

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if(e.key === 'Escape'){
        onDismiss();
      }
    };
    window.addEventListener('keydown', close);
    return () => {
      window.removeEventListener('keydown', close);
    };
  }, []);


  return ReactDOM.createPortal(
    <>
      <div className={`${modalStyle.modal} pl-10 pr-10 pt-10 pb-15`}>
        <div className={`${modalStyle.header}`}>
          <div >
            <p className="text text_type_main-large">
              {header ? 'Детали ингредиента' : ''}
            </p>
          </div>
          <div data-testId='icon_close' className={`${modalStyle.exit}`}>
            <CloseIcon type="primary" onClick={() => {onDismiss();}}/>
          </div>
        </div>
        {children}
      </div>
      <ModalOverlay closeModal={() => {onDismiss();}}/>
    </>,
    portal
  );
};
