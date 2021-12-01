import React from 'react';
import { Ring } from 'react-spinners-css';

export function Loading() {
    return (
        <div 
            style={{height: '100vh',
                    display: 'flex',  
                    justifyContent:'center', 
                    alignItems:'center'}}>
            <Ring color="var(--primary-green)" size={80} />
        </div>
    )
}
