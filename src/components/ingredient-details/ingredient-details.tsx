import detailsStyle from './ingredient-details.module.css';

interface Props {
    img: string;
    name: string;
    proteins: number
    fat: number
    carbohydrates: number
    calories: number
}

interface ISectionProps {
    name: string;
    params: number;
    padding: string;
}

const OneSection = ({name, params, padding}: ISectionProps) => (
    <section className={`${detailsStyle.section} ${padding}`}>
        <p className="text text_type_main-default text_color_inactive">
            {name}
        </p>
        <p className="text text_type_main-default text_color_inactive">
            {params}
        </p>
    </section>
)

export const IngredientDetails = ({img, name, proteins, fat, carbohydrates, calories}: Props) => {
    return (
        <div className={`${detailsStyle.card}`}>
            <img alt={name} src={img} className='mb-4'/>
            <div>
                <p className={` ${detailsStyle.header} text text_type_main-medium mb-8`} >
                    {name}
                </p>
            </div>
            <div className={`${detailsStyle.foodValue}`}>
                <OneSection name={'Калории,ккал'} params={calories} padding='mr-5'/>
                <OneSection name={'Белки, г'} params={proteins} padding='mr-5'/>
                <OneSection name={'Жиры, г'} params={fat} padding='mr-5'/>
                <OneSection name={'Углеводы, г'} params={carbohydrates} padding=''/>
            </div>
        </div>
    );
}
