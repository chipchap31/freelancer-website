import React from 'react'
import { Spin } from 'antd'

function Spinner(props) {
    return (
        <div className='spinner-wrapper'>
            <Spin {...props} />
        </div>
    )
}

export default Spinner;