import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Layout, Form, Input, Typography, Button, Alert } from 'antd';
import * as actions from '../actions'
import { connect } from 'react-redux';

function Login(props) {
    const { userState, history } = props;
    const layout = {
        labelCol: {
            span: 24
        }
    }
    const onSubmit = values => {
        props.handleLogin(values)
    }
    useEffect(() => {
        if (userState.authenticated) {
            history.push('/dashboard')
        }

    }, [userState.authenticated])

    return (
        <main>
            <Layout.Content id='login' className='container'>
                <Row>

                    <Form {...layout} onFinish={onSubmit}>

                        <Typography.Title level={2}>
                            Login To Your Account
                            </Typography.Title>



                        {userState.error && <Alert message={userState.error} type="error" />}

                        <Form.Item
                            name='username'

                            rules={[
                                {
                                    required: true,
                                    message: 'Email is required!',
                                },
                            ]}
                            label='Email Address'>
                            <Input
                                type='email'
                            />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label='Password'>
                            <Input
                                type='password'
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit' type='primary'>Login</Button>
                        </Form.Item>
                    </Form>
                </Row>
            </Layout.Content>
        </main>
    )
}

export default connect(({ userReducer }) =>
    ({ userState: userReducer }), actions)(withRouter(Login));