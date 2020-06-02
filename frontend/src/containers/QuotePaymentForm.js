import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { postRequest, postAuth } from '../utils/requests';
import { Form, Input, Typography, Button, Modal, Space } from 'antd';
import { connect } from 'react-redux';
import Spinner from '../components/accessories';
import * as actions from '../actions';
import { QuoteButtonBack } from '../components/buttons';

function QuotePayForm(props) {

    // load stripe card elements
    const stripe = useStripe();
    const elements = useElements();
    const {
        profileState,
        quoteState,
        userState,
        history } = props;



    const [full_name, setFullName] = useState(`${profileState.first_name || quoteState.first_name ||
        ''} ${profileState.last_name || quoteState.last_name || ''}`);
    const [isProcessing, setProcessingTo] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [modalState, setModalState] = useState(false);
    const [loginState, setLoginState] = useState({
        username: quoteState.email || '',
        password: ''
    });


    const handleCardDetailsChange = ev => {
        ev.error ? setPaymentError(ev.error.message) : setPaymentError();
    };
    const onCheckoutComplete = async () => {


        const data = {
            ...quoteState,
            deadline_date: quoteState.deadline_date ? quoteState.deadline_date.format('YYYY-MM-DD') : null,
            colors: quoteState.colors.join(','),
        }





        // when the user is not logged in
        if (!userState.authenticated) {


            const user = postRequest({
                url: '/api/auth/register',
                body: quoteState
            })

            user.then(res => {
                // when the user registration success 
                // extract the token  
                // create new order and token

                postAuth({
                    token: res.token,
                    url: '/api/order/new',
                    body: data
                })
                history.push({
                    pathname: '/get-quote/paid',
                    state: {
                        authenticated: false
                    }
                })
            }).catch(error => {
                console.log(error);

            })
        }
        if (userState.authenticated) {


            const order_new = postAuth({
                token: sessionStorage.getItem('token'),
                url: '/api/order/new',
                body: data
            })

            order_new.then(res => {
                if (res) {
                    history.push({
                        pathname: '/get-quote/paid',
                        state: {
                            authenticated: true
                        }
                    })
                }
            })
        }
        props.handleQuoteChange({ current: quoteState.current + 1 })
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


            if (!userState.authenticated) {
                // promise to check if the user exist
                const checkUserExist = postRequest({
                    url: '/api/user/check',
                    body: { email: quoteState.email }
                })
                checkUserExist.then(res => {
                    if (res) {
                        // then stop the payment process
                        // prompt a login modal
                        setProcessingTo(false);
                        return setModalState(true);
                    }
                })

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



    const onModalCancel = () => {
        setModalState(false);
    }
    const onFinishLogin = () => {
        props.handleLogin(loginState);

    }

    return (
        <>
            {isProcessing && <Spinner tip="Don't leave until the payment is finished" />}
            <Form
                labelCol={{ span: 24 }} onFinish={handleSubmit}>

                <Form.Item label='Cardholder Name'>
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

                <Space className='mt-3'>
                    <Button
                        htmlType="submit"
                        disabled={!elements || !stripe || isProcessing}


                        type='primary'>
                        Pay €{quoteState.quote_price}
                    </Button>
                    <QuoteButtonBack
                        current={quoteState.current}
                        handleQuoteChange={props.handleQuoteChange}
                        link='/get-quote/result' />
                </Space>


            </Form>
            <Form
                labelCol={{ span: 24 }}>
                <Modal
                    title="Your account already exist"
                    visible={modalState}
                    onCancel={onModalCancel}
                    onOk={onFinishLogin}
                    okButtonProps={{ htmlType: 'submit' }}
                >



                    <Form.Item
                        name='username'

                        label='Username'>
                        <Input
                            defaultValue={quoteState.email || ''}
                            type='text'
                            onChange={({ target: { value } }) => setLoginState({
                                ...loginState,
                                username: value
                            })}
                            value={loginState.password}
                        />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label='Password'>
                        <Input
                            onChange={({ target: { value } }) => setLoginState({
                                ...loginState,
                                password: value
                            })}
                            value={loginState.password}
                            type='password'
                        />
                    </Form.Item>

                </Modal>
            </Form>
        </>
    );
}
const mapStateToProps = state => {
    return {
        quoteState: state.quoteReducer,
        userState: state.userReducer,
        profileState: state.profileReducer
    }
}
export default connect(mapStateToProps, actions)(withRouter(QuotePayForm));