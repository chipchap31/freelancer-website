import React, { useState } from 'react'
import {
    Col,
    Layout,
    Typography,
    Row,
    Button,
    Modal,
    Form,
    Input, Card
} from 'antd'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { postRequest } from '../utils/requests'
/**
    * @module QuoteResult
    * @description this module shows the calculated price of the 
    * @since we are using the modal as the submit button, dont use
    *  the form onFinish as the trigger
    */

function QuoteResult(props) {
    const { quoteState, history, userState } = props;

    const [modalState, setModalState] = useState(false);
    const [loginState, setLoginState] = useState({
        username: quoteState.email || '',
        password: ''
    });


    const onClickButton = () => {
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
                    return setModalState(true)
                }
            }).catch(error => {

                // if caugth any error means the user does not exist 
                // continue with the payment process
                if (error) {
                    history.push('/get-quote/payment')
                }
            })

        }
        if (userState.authenticated) {
            history.push('/get-quote/payment')
        }



    }

    const onModalCancel = () => {
        setModalState(false)
    }
    const onFinishLogin = () => {
        if (props.handleLogin(loginState)) {
            history.push('/get-quote/payment')
        }
    }

    const title = quoteState.project_type.charAt(0).toUpperCase() + quoteState.project_type.slice(1)
    return (
        <Layout.Content>
            <Row justify='center'>

                <Col md={11} className='text-center border border-circle'>
                    <Card>
                        <Typography.Title level={3}>{title} Estimated Price</Typography.Title>

                        <Typography.Title level={1}>€{quoteState.quote_price}</Typography.Title>
                        <Button onClick={onClickButton} type='primary'>
                            Pay Now
                        </Button>
                        <Button className='btn-back ml-2' onClick={() => history.goBack()} type='primary'>
                            Back
                        </Button>

                    </Card>
                </Col>

            </Row>
            <Modal
                title="Your account already exist"
                visible={modalState}
                onCancel={onModalCancel}
                onOk={onFinishLogin}
                okText='Login'
            >
                <Form

                    labelCol={{ span: 24 }}>
                    <Form.Item
                        name='username'

                        label='Email Address'>
                        <Input
                            defaultValue={quoteState.email || ''}
                            type='email'
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
                </Form>
            </Modal>
        </Layout.Content>
    )
}


export default connect(({ quoteReducer, userReducer }) =>
    ({
        quoteState: quoteReducer,
        userState: userReducer
    }), actions)(withRouter(QuoteResult));