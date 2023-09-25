import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import elementStyle from './burger-element.module.css';

interface Props {
    isLocked: boolean;
    name: string;
    price: number;
    img: string;
    isActive: boolean;
    isPadding: boolean;
}

export const BurgerElement = ({isLocked, name, price, img, isActive, isPadding}: Props) => {
    return (
        <div className={`${elementStyle.element} ${isPadding ? 'pl-6' : ''}`}>
            {isActive && <DragIcon type="primary" />}
            <ConstructorElement
              isLocked={isLocked}
              text={name}
              price={price}
              thumbnail={img}
            />
        </div>
    );
}
