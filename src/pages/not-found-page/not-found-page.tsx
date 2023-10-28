import { HEIGHT_WITHOUT_HEADER } from '../../constants/constants';
import styles from './not-found-page.module.css';

export const NotFoundPage = () => {
    return (
        <div className={`${styles.info}`} style={{height: HEIGHT_WITHOUT_HEADER}}> NOT FOUND </div>
    );
}
