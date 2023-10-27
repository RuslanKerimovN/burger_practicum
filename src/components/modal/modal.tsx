import ReactDOM from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import {useEffect} from 'react';
import modalStyle from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useParams } from 'react-router';
import React from 'react';
import { HOME } from '../../constants/path';

interface Props {
    header?: string;
    closeModal?: () => void;
    children?: React.ReactNode;
}

const portal = document.getElementById('portal') as Element;

export const Modal = ({header='', closeModal=() => {}, children=<></>}: Props) => {
    let navigate = useNavigate();
    // let { id } = useParams<"id">();
    // let image = getImageById(Number(id));
    // let buttonRef = React.useRef<HTMLButtonElement>(null);

    function onDismiss() {
        navigate(HOME);
      }

    useEffect(() => {
        const close = (e: KeyboardEvent) => {
          if(e.key === 'Escape'){
            closeModal();
            onDismiss();
          }
        }
        window.addEventListener('keydown', close)
        return () => {
            window.removeEventListener('keydown', close);
        }
    }, []);

    return ReactDOM.createPortal(
        <>
            <div className={`${modalStyle.modal} pl-10 pr-10 pt-10 pb-15`}>
                <div className={`${modalStyle.header}`}>
                    <div >
                        <p className="text text_type_main-large">
                            {header}
                        </p>
                    </div>
                    <div className={`${modalStyle.exit}`}>
                        <CloseIcon type="primary" onClick={() => {closeModal();  onDismiss()}}/>
                    </div>
                </div>
                {children}
            </div>
            <ModalOverlay closeModal={closeModal}/>
        </>,
        portal
    );
}
