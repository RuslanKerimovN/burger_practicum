import React from 'react';
import itemStyle from './header-item.module.css';

interface Props {
    children: React.ReactNode;
    text: string;
}

export const HeaderItem = ({ children, text }: Props) => {
  return (
    <div className={`${itemStyle.item} p-5 mr-2`}>
      <div className='mr-2'>
        {children}
      </div>
      <div>
        <p className='text text_type_main-default'>
          {text}
        </p>
      </div>
    </div>
  );
};
