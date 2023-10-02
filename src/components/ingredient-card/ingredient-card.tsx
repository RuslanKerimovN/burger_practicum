import { IBurgerIngredients } from '../../types/types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientCardStyle from './ingredient-card.module.css';
import { useState } from 'react';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { useModal } from '../../hooks/useModal';

interface Props {
    ingredient: IBurgerIngredients;
}

export const IngredientCard = ({ingredient}: Props) => {
    const {isModalOpen, openModal, closeModal} = useModal();

    return (
        <>
            <div className={`${ingredientCardStyle.card} pb-8`} onClick={openModal}>
                <Counter count={0} size="default"/>

                <img alt={ingredient.name} src={ingredient.image_large} className='pl-4 pr-4 mb-1' width={'220px'} />
                
                <p className="text text_type_digits-default mb-1">
                    <span className={`${ingredientCardStyle.price}`}>
                        {ingredient.price}<CurrencyIcon type="primary" />
                    </span>
                </p>
                
                <p className={`text text_type_main-default ${ingredientCardStyle.name}`}>
                    {ingredient.name}
                </p>
            </div>
            {isModalOpen && 
                <Modal
                    header={'Детали ингредиента'}
                    closeModal={closeModal}
                >
                    <IngredientDetails
                        ingredient={ingredient}
                    />
                </Modal>
            }
        </>
    );
};
