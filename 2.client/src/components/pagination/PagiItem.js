import React, {useEffect} from 'react';
import clsx from 'clsx';
import {useSearchParams} from 'react-router-dom'

const PagiItem = ({ children }) => {
    const [params] = useSearchParams()
    useEffect(() => {
        let param = [];
        for (let i of params.entries()) param.push(i);
    }, [params])
    return (
        <div
            className={clsx(
                'w-10 h-10 flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-gray-300',
                !Number(children) && 'items-end pb-2', Number(children) && 'items-center'
            )}
        >
            {children}
        </div>
    );
};

export default PagiItem;
