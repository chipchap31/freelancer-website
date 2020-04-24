import React from 'react'


import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StripeForm } from '../../components/forms';
import { Layout, Row, Col } from 'antd';
const stripePromise = loadStripe(process.env.STRIPE_KEY)

function StripeMain(props) {
    const { Content } = Layout;
    return (
        <Content>
            <div className='container'>
                <Row>
                    <Col md={16}>
                        <Elements stripe={stripePromise}>
                            <StripeForm />
                        </Elements>
                    </Col>
                </Row>
            </div>
        </Content>
    )

}
export default StripeMain;