import { HEIGHT_WITHOUT_HEADER } from '../../constants/constants';
import styles from './status.module.css';

interface Props {
    status: string;
}

export const Status = ({ status }: Props) => {
  return (
    <div
      className={`${styles.status}`}
      style={{ height: HEIGHT_WITHOUT_HEADER }}
    >
      <p className="text text_type_main-large">{status}</p>
    </div>
  );
};
