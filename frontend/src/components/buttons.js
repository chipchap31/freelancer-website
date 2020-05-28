import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';


export const WidgetButton = () => {

    return (

        <Link to='/get-quote'>
            <div className='widget'>
                <PlusOutlined />
            </div>
        </Link>

    )
}


function ButtonBack(props) {
    const { history } = props;
    return (
        <div className='btn-icon btn-back' onClick={() => history.goBack()}>
            <ArrowLeftOutlined />
        </div>
    )
}
ButtonBack = withRouter(ButtonBack)
export { ButtonBack };





