import React from 'react';

import {
    Layout,
    Typography,
    Row,
    Col,
    Form,
    Input,
    Button,
    Space
} from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { QuoteButtonBack } from '../components/buttons';

function QuotePersonalForm(props) {

    // Display this form after the deadline has been chosen

    const { Content } = Layout;
    const layout = { labelCol: { span: 24 } };
    const { quoteState } = props;
    const onFinish = async values => {
        props.handleQuoteChange({ ...values, current: 3 })
        return props.history.push('/get-quote/result')
    };


    return (
        <>
            <Content>
                <Row justify='center'>
                    <Col md={16}>
                        <Typography.Title level={1}>Personal Information</Typography.Title >
                        <Form
                            initialValues={props.profileState}
                            {...layout}
                            onFinish={onFinish}>

                            <Row justify='space-between'>
                                <Col xs={24} md={11}>
                                    <Form.Item
                                        name='first_name'
                                        label='First Name'>
                                        <Input type='text' />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={11}>
                                    <Form.Item name='last_name' label='Last Name'>
                                        <Input type='text' />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row justify='space-between'>
                                <Col xs={24} md={11}>
                                    <Form.Item
                                        name='email'

                                        label='email'
                                        rules={[{ required: true, message: 'Please enter an email!' }]} label='Email Address'>
                                        <Input type='email' />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={11}>
                                    <Form.Item
                                        name="mobile"
                                        label="Mobile Number"

                                    >
                                        <Input type='text' />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                name='address_line1'
                                label='Address Line 1'>
                                <Input type='text' />

                            </Form.Item>
                            <Form.Item
                                name='address_line2'
                                label='Address Line 2 (Optional)'>
                                <Input type='text' />

                            </Form.Item>
                            <Row justify='space-between'>
                                <Col xs={24} md={11}>
                                    <Form.Item
                                        name='city'
                                        label='City'
                                    >
                                        <Input type='text' />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={11}>
                                    <Form.Item
                                        name="county"
                                        label="County"
                                    >
                                        <Input type='text' />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Space>
                                <Button htmlType="submit" type='primary'>Next</Button>
                                <QuoteButtonBack
                                    current={quoteState.current}
                                    handleQuoteChange={props.handleQuoteChange}
                                    link='/get-quote/deadline' />
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