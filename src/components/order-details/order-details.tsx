import { SvgOrder } from '../../images/svg-order';
import detailsStyle from './order-details.module.css';

interface Props {
    id: string;
}

export const OrderDetails = ({id}: Props) => {
    return (
        <div className={`${detailsStyle.card}`}>
            <div>
                <p className={`${detailsStyle.text} text text_type_digits-large mb-8`}>
                    {id}
                </p>
            </div>

            <div>
                <p className={`${detailsStyle.text} text text_type_main-medium mb-15`}>
                    идентификатор заказа
                </p>
            </div>

            <div className="mb-15">
                <SvgOrder />
            </div>
            
            <section>
                <p className={`${detailsStyle.text} text text_type_main-default mb-2`}>
                    Ваш заказ начали готовить
                </p>
                <p className={`${detailsStyle.text} text text_type_main-default text_color_inactive mb-15`}>
                    Дождитесь готовности на орбитальной станции
                </p>
            </section>
        </div>
    );
}
