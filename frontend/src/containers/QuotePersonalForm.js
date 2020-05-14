import React, { useState, useEffect } from 'react';

import {
    Layout,
    Typography,
    Row,
    Col,
    Form,
    Input,
    Button,
    Space,
    Modal
} from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { postRequest } from '../utils/requests';
function QuotePersonalForm(props) {

    // Display this form after the deadline has been chosen


    const { Content } = Layout;
    const { Title } = Typography;
    const { history, profileState, userState } = props;
    const layout = { labelCol: { span: 24 } };





    const onFinish = async values => {
        props.handleQuoteChange({ ...values, current: 3 })
        return history.push('/get-quote/result')
    };

    return (
        <>
            <Content>
                <Row justify='center'>
                    <Col md={15}>
                        <Title level={2}>Personal Information</Title>
                        <Form
                            initialValues={{
                                ['first_name']: profileState.first_name || '',
                                ['last_name']: profileState.last_name || '',
                                ['email']: profileState.email || '',
                                ['county']: profileState.county || '',
                                ['mobile']: profileState.mobile || '',
                                ['city']: profileState.city || '',
                                ['address_line1']: profileState.address_line1 || '',
                                ['address_line2']: profileState.address_line2 || '',

                            }}
                            {...layout} onFinish={onFinish}>

                            <Row justify='space-between'>
                                <Col md={11}>
                                    <Form.Item
                                        name='first_name'
                                        label='First name'>
                                        <Input

                                            type='text'


                                        />
                                    </Form.Item>
                                </Col>
                                <Col md={11}>
                                    <Form.Item name='last_name' label='Last name'>
                                        <Input
                                            type='text'


                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row justify='space-between'>
                                <Col md={11}>
                                    <Form.Item
                                        name='email'

                                        label='email'
                                        rules={[{ required: true, message: 'Please enter an email!' }]} label='Email Address'>
                                        <Input

                                            type='email'

                                        />
                                    </Form.Item>
                                </Col>
                                <Col md={11}>
                                    <Form.Item

                                        name="mobile"
                                        label="Phone Number"

                                    >
                                        <Input
                                            type='text'
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                name='address_line1'
                                label='Address Line'>
                                <Input
                                    type='text'

                                />

                            </Form.Item>
                            <Form.Item
                                name='address_line2'
                                label='Address Line 2 (Optional)'>
                                <Input


                                />

                            </Form.Item>
                            <Row justify='space-between'>
                                <Col md={11}>
                                    <Form.Item
                                        name='city'
                                        label='City'
                                    >
                                        <Input
                                            type='text' />
                                    </Form.Item>
                                </Col>
                                <Col md={11}>
                                    <Form.Item
                                        name="county"
                                        label="County"
                                    >
                                        <Input

                                            type='text' />
                                    </Form.Item>
                                </Col>
                            </Row>




                            <Space>
                                <Button className='btn-back' type='primary' onClick={() => history.goBack()}>Back</Button>
                                <Button htmlType="submit" type='primary'>Next</Button>

                            </Space>
                        </Form>

                    </Col>
                </Row>
            </Content>







        </>
    )
}

function mapStateToProps(state) {
    return {
        quoteState: state.quoteReducer,
        userState: state.userReducer,
        profileState: state.profileReducer
    }
}
QuotePersonalForm = connect(mapStateToProps, actions)(QuotePersonalForm)
export default withRouter(QuotePersonalForm);