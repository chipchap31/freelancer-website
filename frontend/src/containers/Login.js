import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Layout, Form, Input, Typography, Button, Alert, Col } from 'antd';
import * as actions from '../actions'
import { connect } from 'react-redux';

function Login(props) {
    const { userState, history, profileState } = props;
    const layout = {
        labelCol: {
            span: 24
        }
    }
    useEffect(() => {
        if (userState.authenticated) {
            history.push('/dashboard')
        }
    }, [])
    const onSubmit = values => {
        const login_response = props.handleLogin(values);

        login_response.then(user_id => {
            if (user_id) {
                props.handleProfileFetch(user_id)
                history.push('/dashboard')
            }

        })
    }


    return (

        <section id='login' className='container'>
            <Row justify='center' className='pt-3'>
                <Col md={13}>
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
                </Col>

            </Row>
        </section>

    )
}
const mapStateToProps = state => {
    return {
        userState: state.userReducer,
        profileState: state.profileReducer
    }
}

export default connect(mapStateToProps, actions)(withRouter(Login));