import { Alert } from 'antd';
import React from 'react'

function Error({errorText}) {
    return (
        <div className='mx-auto'>
            <Alert
                message="Error"
                description={errorText}
                type="error"
                showIcon
            />
        </div>
    )
}

export default Error