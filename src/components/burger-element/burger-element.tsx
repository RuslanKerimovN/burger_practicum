import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import elementStyle from './burger-element.module.css';

interface Props {
    isLocked: boolean;
    name: string;
    price: number;
    img: string;
}

export const BurgerElement = ({isLocked, name, price, img}: Props) => {
    return (
        <div className={`${elementStyle.element}`}>
            <DragIcon type="primary" />
            <ConstructorElement
              isLocked={isLocked}
              text={name}
              price={price}
              thumbnail={img}
            />
        </div>
    );
}
