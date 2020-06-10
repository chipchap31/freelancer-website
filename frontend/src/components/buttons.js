import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../actions';
function WidgetButton(props) {
    console.log(props);
    props.handleQuoteChange({ current: 0 })
    return (

        <Link to='/get-quote'>
            <div className='widget'>
                <PlusOutlined />
            </div>
        </Link>

    )
}
WidgetButton = connect(null, actions)(WidgetButton);


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
export { QuoteButtonBack, ButtonBack, WidgetButton };

