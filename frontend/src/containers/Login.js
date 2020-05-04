import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Layout, Col, Form, Input, Typography, Button } from 'antd';
import * as actions from '../actions'
import { connect } from 'react-redux';

function Login(props) {
    const [state, setState] = React.useState({
        username: '',
        password: ''
    })
    const layout = {
        labelCol: {
            span: 24
        }
    }
    const onSubmit = () => {


        props.handleLogin(state)
    }


    return (
        <main>
            <Layout.Content id='login' className='container'>
                <Row>

                    <Form {...layout} onFinish={onSubmit}>
                        <Typography.Title level={2}>
                            Login To Your Account
                        </Typography.Title>
                        <Form.Item
                            name='email'
                            rules={[
                                {
                                    required: true,
                                    message: 'Email is required!',
                                },
                            ]}
                            label='Email Address'>
                            <Input
                                type='email'

                                value={state.username}
                                onChange={({ target: { value } }) =>
                                    setState({ ...state, username: value })} />
                        </Form.Item>
                        <Form.Item label='Password'>
                            <Input
                                value={state.password}
                                onChange={({ target: { value } }) =>
                                    setState({ ...state, password: value })} />
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

export default connect(null, actions)(Login);