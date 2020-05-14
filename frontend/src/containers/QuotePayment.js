import React from 'react'


import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { Layout, Row, Col, Typography } from 'antd';
import QuotePayForm from './QuotePaymentForm';
const stripePromise = loadStripe(process.env.STRIPE_KEY)

function StripeMain() {
    const { Content } = Layout;
    return (
        <Content>
            <div className='container'>
                <Row justify='center'>
                    <Col md={15}>
                        <Typography.Title title={1}>
                            Payment Details
                        </Typography.Title>
                        <Elements stripe={stripePromise}>
                            <QuotePayForm />
                        </Elements>
                    </Col>
                </Row>
            </div>
        </Content>
    )

}
export default StripeMain;