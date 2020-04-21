import React from 'react'
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
import { withRouter } from 'react-router-dom';

function QuoteUserForm(props) {

    // Display this form after the deadline has been chosen


    const { Content } = Layout;
    const { Title } = Typography;
    const { history } = props;
    const layout = { labelCol: { span: 24 } };
    const onFinish = values => {
        // run this block when the next button is pressed 
        history.push('/get-quote/payment'); // move on payment if no error
    };
    return (
        <Content>
            <Col md={16}>
                <Title level={2}>About you</Title>
                <Form {...layout} onFinish={onFinish}>
                    <Row justify='space-between'>
                        <Col md={11}>
                            <Form.Item
                                name='companyname'
                                rules={[{ required: true, message: 'Please enter your company name!' }]}
                                label='Company Name'>
                                <Input />
                            </Form.Item>
                        </Col >
                        <Col md={11}>
                            <Form.Item label='Company ame'>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify='space-between'>
                        <Col md={11}>
                            <Form.Item
                                name='firstname'
                                label='First name'>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={11}>
                            <Form.Item label='Last name'>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify='space-between'>
                        <Col md={11}>
                            <Form.Item
                                name='email'
                                label='email'
                                rules={[{ required: true, message: 'Please enter an email!' }]} label='Email Address'>
                                <Input type='email' />
                            </Form.Item>
                        </Col>
                        <Col md={11}>
                            <Form.Item
                                name="phone"
                                label="Phone Number"

                            >
                                <Input addonBefore='+353' style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Space>
                        <Button className='btn-back' type='primary' onClick={() => history.goBack()}>Back</Button>
                        <Button htmlType="submit" type='primary'>Next</Button>

                    </Space>
                </Form>

            </Col>

        </Content>
    )
}

export default withRouter(QuoteUserForm);