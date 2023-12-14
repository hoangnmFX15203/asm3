import React from 'react';
import {useSearchParams} from 'react-router-dom'
import usePagination from 'hook/usePagination';
import PagiItem from './PagiItem';

const Pagination = ({totalCount}) => {
    const [params] = useSearchParams()
    const pagination = usePagination(totalCount, 2)
    // const pagination = 
    return (
        <div className='flex items-center'>
            {pagination?.map(el => (
                <PagiItem key={el}>
                    {el}
                </PagiItem>
            ))}
        </div>
    )
}

export default Pagination