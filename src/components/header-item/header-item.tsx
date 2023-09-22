import React from 'react';

interface Props {
    children: React.ReactNode;
    styleItem: string;
    text: string;
}

export const HeaderItem = ({children, styleItem, text}: Props) => {
    return (
        <div
            className='p-5 mr-2'
            style={{
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'center',
                maxWidth: '180px',
                borderRadius: '40px'
            }}
        >
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
