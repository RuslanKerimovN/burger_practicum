import React from 'react';
import itemStyle from './header-item.module.css';

interface Props {
    children: React.ReactNode;
    styleItem: string;
    text: string;
}

export const HeaderItem = ({children, styleItem, text}: Props) => {
    return (
        <div className={`${itemStyle.item} p-5 mr-2`}>
            <div className='mr-2'>
                {children}
            </div>
            <div>
                <p className={styleItem}>
                    {text}
                </p>
            </div>
        </div>
    )
};
