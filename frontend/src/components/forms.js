import React, { useState } from 'react'
import { Form, Input, Select, Row, Col, Button } from 'antd'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { postRequest } from '../utils/requests';
function WaitingListForm(props) {

    const [email, setEmail] = useState('');
    const [type, setTtype] = useState('');
    const layout = { labelCol: { span: 24 } }
    return (
        <Form {...layout}>
            <Form.Item label="Project type">
                <Select
                    onChange={setTtype}
                    value={type}>
                    <Select.Option value="icon">Icon</Select.Option>
                    <Select.Option value="logo">Logo</Select.Option>
                    <Select.Option value="poster">Poster</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label='Email Address'>
                <Input value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Item>
        </Form>
    )
}

function StripeForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();
    const handleCardDetailsChange = ev => {
        ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
    };
    const handleSubmit = async ev => {
        ev.preventDefault();

        setProcessingTo(true);
        const cardElement = elements.getElement('card');

        try {
            const opt = {
                url: '/api/payment-intent',
                body: { amount: 100 }
            }
            const { client_secret } = await postRequest({ ...opt })
            console.log(client_secret)

            // amount: price * 100

            const paymentMethodReq = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: {
                    name: 'Jenny Rosen',
                }
            });
            if (paymentMethodReq.error) {
                console.log(paymentMethodReq.error)
                return;
            }
            const { error } = await stripe.confirmCardPayment(client_secret, {
                payment_method: paymentMethodReq.paymentMethod.id
            });

        } catch (error) {
            console.log(error);
        }




    }
    const cardElementOpts = {
        iconStyle: "solid",

        hidePostalCode: true
    }
    return (
        <form onSubmit={handleSubmit}>


            <Form.Item className='ant-input'>
                <CardElement options={cardElementOpts} onChange={handleCardDetailsChange} />
            </Form.Item>



            <Button htmlType="submit" type='primary' disabled={!stripe}>
                Pay
          </Button>
        </form>
    );
}

export {
    WaitingListForm,
    StripeForm
}