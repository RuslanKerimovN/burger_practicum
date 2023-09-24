import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import positionStyle from './burger-element.module.css';

interface Props {
    type: 'top' | 'bottom' | undefined;
    isLocked: boolean;
    name: string;
    price: number;
    img: string;
    isActive: boolean;
    isPadding: boolean;
}

export const BurgerElement = ({type, isLocked, name, price, img, isActive, isPadding}: Props) => {
    return (
        <div 
            style={{display: 'flex', alignItems: 'center'}}
            className={`${isPadding ? 'pl-6' : ''}`}
        >
            {isActive && <DragIcon type="primary" />}
            <ConstructorElement
              type={type}
              isLocked={isLocked}
              text={name}
              price={price}
              thumbnail={img}
            />
        </div>
    );
}
