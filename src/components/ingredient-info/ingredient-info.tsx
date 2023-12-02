import styles from './ingredient-info.module.css';
interface ISectionProps {
    name: string;
    params: number;
    padding: string;
}
export const IngredientInfo = ({ name, params, padding }: ISectionProps) => (
  <section className={`${styles.section} ${padding}`}>
    <p className="text text_type_main-default text_color_inactive">
      {name}
    </p>
    <p className="text text_type_main-default text_color_inactive">
      {params}
    </p>
  </section>
);
