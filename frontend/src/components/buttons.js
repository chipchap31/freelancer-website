import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';


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
ButtonBack = withRouter(ButtonBack);

function QuoteButtonBack(props) {

    const onClickBack = () => {

        props.handleQuoteChange({ current: props.current - 1 })

        return props.history.push(props.link)
    }
    return (
        <Button
            className='btn-back'
            onClick={onClickBack}
            type='primary'>
            Back
        </Button>
    )

}

QuoteButtonBack = withRouter(QuoteButtonBack);
export { QuoteButtonBack, ButtonBack };

