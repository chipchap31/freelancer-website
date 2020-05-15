import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';


export const WidgetButton = () => {

    return (

        <Link to='/get-quote'>
            <div className='widget'>
                <PlusOutlined />
            </div>
        </Link>

    )
}







