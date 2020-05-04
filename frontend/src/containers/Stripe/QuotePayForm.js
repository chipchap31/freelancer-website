import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { postRequest } from '../../utils/requests';
import { Form, Input, Typography, Button } from 'antd';
import { connect } from 'react-redux';

function QuotePayForm(props) {
    const stripe = useStripe();
    const elements = useElements();
    const { history } = props;
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


            const paymentMethodReq = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: {
                    name: full_name,
                    email: quoteState.email,
                    phone: quoteState.mobile,
                    address: {
                        city: quoteState.city,
                        state: quoteState.county,
                        line1: quoteState.address_line1,
                        line2: quoteState.address_line2
                    }


                }
            });
            if (paymentMethodReq.error) {

                setPaymentError(paymentMethodReq.error.message)
                return;
            }

            let request_data = {
                url: '/api/payment/intent',
                body: {
                    payment_method_id: paymentMethodReq.paymentMethod.id,
                    email: "jomarialang31@gmail.com"
                }
            }
            const confirmCard = await postRequest({ ...request_data })
            console.log(confirmCard.status === 400);

            if (confirmCard.status === 400) {
                // Status is 400 if the user already exist 
                // if exist redirect to login
                return history.push('/login');

            }


            return history.push('/account/created')

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

            <Button
                htmlType="submit"
                disabled={!elements || !stripe}
                className='mt-2'
                size="large"
                type='primary'>
                Pay €{quoteState.quote_price}
            </Button>
        </Form>
    );
}

export default connect(({ quoteReducer }) => ({ quoteState: quoteReducer }))(withRouter(QuotePayForm));