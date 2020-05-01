import React, { useState } from 'react'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { postRequest } from '../../utils/requests';
import { Form, Alert, Input, Typography, Col, Button } from 'antd';
import { connect } from 'react-redux';

function QuotePayForm(props) {
    const stripe = useStripe();
    const elements = useElements();
    const { quoteState } = props;

    const [full_name, setFullName] = useState(`${quoteState.first_name || ''} ${quoteState.last_name || ''}`);

    const [isProcessing, setProcessingTo] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const handleCardDetailsChange = ev => {
        ev.error ? setPaymentError(ev.error.message) : setPaymentError();
    };
    const handleSubmit = async () => {
        if (!stripe || !elements) {
            return;
        }

        setProcessingTo(true);
        const cardElement = elements.getElement('card');

        try {
            const opt = {
                url: '/api/payment-intent',
                body: { receipt_email: quoteState.email }
            }


            const paymentMethodReq = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: {
                    name: full_name,
                }
            });
            if (paymentMethodReq.error) {

                setPaymentError(paymentMethodReq.error.message)
                return;
            }
            const request_secret = await postRequest({ ...opt })

            if (request_secret.status !== 200) {
                return;
            }
            const { data } = request_secret;

            const confirmCard = await stripe.confirmCardPayment(data.client_secret, {
                payment_method: paymentMethodReq.paymentMethod.id
            });
            console.log(confirmCard);

            if (confirmCard.error) {
                setPaymentError(confirmCard.error);
            }

        } catch (error) {
            console.log(error);
        }




    }
    const cardElementOpts = {
        iconStyle: "solid",

        hidePostalCode: true
    }

    return (
        <Form labelCol={{ span: 24 }} onFinish={handleSubmit}>

            <Form.Item label='Name on the card'>
                <Input onChange={({ target: { value } }) => setFullName(value)} value={full_name} size='large' />
            </Form.Item>

            <Form.Item

                validateStatus="error"
                className={paymentError ? 'ant-input error' : 'ant-input'}>

                <CardElement options={cardElementOpts} onChange={handleCardDetailsChange} />
            </Form.Item>
            <div className=''>
                {paymentError && <Typography.Text type='danger'>{paymentError}</Typography.Text>}

            </div>

            <Button htmlType="submit" disabled={!elements || !stripe} className='mt-2' type='primary'>
                Pay
          </Button>
        </Form>
    );
}

export default connect(({ quoteReducer }) => ({ quoteState: quoteReducer }))(QuotePayForm);