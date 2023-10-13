import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { SvgOrder } from '../../images/svg-order';
import { postOrder } from '../../services/slices/restaurantSlice';
import detailsStyle from './order-details.module.css';
import { useEffect } from "react";


interface Props {
    ids: string[];
}

export const OrderDetails = ({ids}: Props) => {
    const dispatch = useAppDispatch();
    const {isError, isLoading, order} = useAppSelector(state => state.restaurantSlice);

    useEffect(() => {
        dispatch(postOrder(ids));
    }, []); 

    return (
        <>
            {isLoading
                ?   <h1>Loading....</h1>
                :   isError ? <h1>Ошибка сервера, попробуйте еще раз!</h1>
                    :
                        <div className={`${detailsStyle.card}`}>
                            <div>
                                <p className={`${detailsStyle.text} text text_type_digits-large mb-8`}>
                                    {order.order.number}
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
            }
        </>
    );
}
