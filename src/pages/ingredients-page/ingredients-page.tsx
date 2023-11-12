import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import { HEIGHT_WITHOUT_HEADER } from '../../constants/constants';
import styles from './ingredients-page.module.css';

export const IngredientsPage = () => {
  return (
    <section className={`${styles.section}`} style={{ height: HEIGHT_WITHOUT_HEADER }}>
      <p className='text text_type_main-large'>
        Детали ингредиента
      </p>
      <div>
        <IngredientDetails />
      </div>
    </section>
  );
};
