import ReactDOM from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import {useEffect} from 'react';
import modalStyle from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useParams } from 'react-router';
import React from 'react';

interface Props {
    closeModal?: () => void;
    children?: React.ReactNode;
}

const portal = document.getElementById('portal') as Element;

export const Modal = ({children=<></>}: Props) => {
    let navigate = useNavigate();
    let { id } = useParams<"id">();

    const onDismiss = () => {
        if (id) navigate(-1);
    }

    useEffect(() => {
        const close = (e: KeyboardEvent) => {
          if(e.key === 'Escape'){
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
                            {id ? 'Детали ингредиента' : ''}
                        </p>
                    </div>
                    <div className={`${modalStyle.exit}`}>
                        <CloseIcon type="primary" onClick={() => {onDismiss()}}/>
                    </div>
                </div>
                {children}
            </div>
            <ModalOverlay closeModal={() => {onDismiss()}}/>
        </>,
        portal
    );
}
