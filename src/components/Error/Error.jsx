import { Alert } from 'antd';
import React from 'react'

function Error({errorText}) {
    return (
        <div className='mx-auto'>
            <b className='text-center text-red-500'>{errorText}</b>
        </div>
    )
}

export default Error