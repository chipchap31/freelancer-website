import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { postRequest, postAuth } from '../../utils/requests';
import { Form, Input, Typography, Button } from 'antd';
import { connect } from 'react-redux';
import Spinner from '../../components/accessories';
import * as actions from '../../actions';
function QuotePayForm(props) {
    const stripe = useStripe();
    const elements = useElements();

    const {
        quoteState,
        userState,
        handleQuoteChange,
        history } = props;


    const [full_name, setFullName] = useState(`${quoteState.first_name || ''} ${quoteState.last_name || ''}`);
    const [isProcessing, setProcessingTo] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const handleCardDetailsChange = ev => {
        ev.error ? setPaymentError(ev.error.message) : setPaymentError();
    };
    const onCheckoutComplete = async () => {
        const { authenticated } = userState;

        console.log(authenticated);

        let user;
        if (!authenticated) {

            // when the user is not logged in
            try {
                user = await postRequest({
                    url: '/api/auth/register',
                    body: quoteState
                })
                console.log(user.token);


                await postAuth({
                    token: user.token,
                    url: '/api/order/new',
                    body: quoteState
                })
                return history.push('/get-quote/paid')
            } catch (error) {
                console.log(error);
            }
        }





    }
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
                setProcessingTo(false)
                setPaymentError(paymentMethodReq.error.message)
                return;
            }


            const opt = {
                url: '/api/payment/intent',
                body: { email: quoteState.email }
            }
            const intent = await postRequest({ ...opt })


            const { error } = await stripe.confirmCardPayment(intent.client_secret, {
                payment_method: paymentMethodReq.paymentMethod.id
            });
            if (error) {
                setPaymentError(error.message);
                setProcessingTo(false);
                return;
            }

            onCheckoutComplete()

        } catch (error) {
            setPaymentError(error);
        }




    }
    const cardElementOpts = {
        iconStyle: "solid",
        hidePostalCode: true
    }

    return (
        <>
            {isProcessing && <Spinner tip="Don't leave until the payment is finished" />}
            <Form labelCol={{ span: 24 }} onFinish={handleSubmit}>

                <Form.Item label='Name on the card'>
                    <Input onChange={({ target: { value } }) => setFullName(value)} value={full_name} size='large' />
                </Form.Item>

                <Form.Item

                    validateStatus="error"
                    className={paymentError ? 'ant-input error' : 'ant-input'}>

                    <CardElement options={cardElementOpts} onChange={handleCardDetailsChange} />
                </Form.Item>
                <div>
                    {paymentError && <Typography.Text type='danger'>{paymentError}</Typography.Text>}

                </div>

                <Button
                    htmlType="submit"
                    disabled={!elements || !stripe || isProcessing}
                    className='mt-2'
                    size="large"
                    type='primary'>
                    Pay €{quoteState.quote_price}
                </Button>
            </Form>
        </>
    );
}

export default connect(({ quoteReducer, userReducer }) =>
    ({
        quoteState: quoteReducer,
        userState: userReducer
    }), actions)(withRouter(QuotePayForm));