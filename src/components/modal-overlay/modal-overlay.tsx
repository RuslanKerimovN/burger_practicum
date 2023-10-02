import styleOverlay from './modal-overlay.module.css';

interface Props {
    closeModal: () => void;
}

export const ModalOverlay = ({closeModal}: Props) => {
    return (
        <div className={`${styleOverlay.window}`} onClick={closeModal}/>
    );
}
