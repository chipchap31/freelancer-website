import React, { useEffect } from 'react'
import {
    Col,
    Layout,
    Typography,
    Row,
    Button
} from 'antd'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
/**
    * @module QuoteResult
    * @description this module shows the calculated price of the 
    */

function QuoteResult(props) {
    const { quoteState } = props;



    const title = quoteState.project_type.charAt(0).toUpperCase() + quoteState.project_type.slice(1)
    return (
        <Layout.Content>
            <Row justify='center'>
                <Col md={11} className='text-center border border-circle'>
                    <Typography.Title level={3}>{title} Estimated Price</Typography.Title>

                    <Typography.Title level={1}>€{quoteState.quote_price}</Typography.Title>

                    <Button size='large' type='primary'>
                        <Link to='/get-quote/payment'>Pay Now</Link>
                    </Button>
                </Col>
            </Row>

        </Layout.Content>
    )
}


export default connect(({ quoteReducer }) => ({ quoteState: quoteReducer }))(QuoteResult);