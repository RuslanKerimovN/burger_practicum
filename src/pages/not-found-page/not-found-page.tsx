import { HEIGHT_WITHOUT_HEADER } from '../../constants/constants';
import styles from './not-found-page.module.css';
import { HOME } from "../../constants/path";
import { Link } from "react-router-dom";

export const NotFoundPage = () => (
  <div className={`${styles.info}`} style={{ height: HEIGHT_WITHOUT_HEADER }}>
    <p className="text text_type_main-large mb-5">
        Ошибка 404
    </p>
    <p className="text text_type_main-medium">
      {'Страница не найдена, '}
      <Link to={HOME} className={`${styles.text}`}>перейти на главную страницу!</Link>
    </p>
  </div>
);
