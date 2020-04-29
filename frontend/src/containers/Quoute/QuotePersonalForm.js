import React, { useState } from 'react'
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

function QuotePersonalForm(props) {

    // Display this form after the deadline has been chosen


    const { Content } = Layout;
    const { Title } = Typography;
    const { history } = props;
    const layout = { labelCol: { span: 24 } };
    const [state, setState] = useState({
        firstname: '',
        lastname: '',
        email: '',
        mobile: '',
        addressline1: '',
        addressline2: '',
        city: '',
        county: ''
    })
    const onFinish = () => {
        // run this block when the next button is pressed 
        // move on payment if no error

        console.log(state);

    };

    return (
        <Content>
            <Col md={12}>
                <Title level={2}></Title>
                <Form  {...layout} onFinish={onFinish}>

                    <Row justify='space-between'>
                        <Col md={11}>
                            <Form.Item
                                label='First name'>
                                <Input
                                    onChange={({ target: { value } }) => setState({
                                        ...state,
                                        firstname: value
                                    })}
                                    value={state.firstname} />
                            </Form.Item>
                        </Col>
                        <Col md={11}>
                            <Form.Item label='Last name'>
                                <Input
                                    onChange={({ target: { value } }) => setState({
                                        ...state,
                                        lastname: value
                                    })}
                                    value={state.lastname} />
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
                                    onChange={({ target: { value } }) => setState({
                                        ...state,
                                        email: value
                                    })}
                                    value={state.email} type='email' />
                            </Form.Item>
                        </Col>
                        <Col md={11}>
                            <Form.Item
                                name="phone"
                                label="Phone Number"

                            >
                                <Input
                                    onChange={({ target: { value } }) => setState({
                                        ...state,
                                        mobile: value
                                    })}
                                    value={state.mobile}
                                    addonBefore='+353' style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item

                        label='Address Line'>
                        <Input
                            onChange={({ target: { value } }) => setState({
                                ...state,
                                addressline1: value
                            })}
                            value={state.addressline1} />

                    </Form.Item>
                    <Form.Item
                        label='Address Line 2 (Optional)'>
                        <Input
                            onChange={({ target: { value } }) => setState({
                                ...state,
                                addressline2: value
                            })}
                            value={state.addressline2} />

                    </Form.Item>
                    <Row justify='space-between'>
                        <Col md={11}>
                            <Form.Item
                                name='city'
                                label='City'
                            >
                                <Input
                                    onChange={({ target: { value } }) => setState({
                                        ...state,
                                        city: value
                                    })}
                                    value={state.city} type='text' />
                            </Form.Item>
                        </Col>
                        <Col md={11}>
                            <Form.Item
                                name="county"
                                label="County"
                            >
                                <Input
                                    onChange={({ target: { value } }) => setState({
                                        ...state,
                                        county: value
                                    })}
                                    value={state.county} type='text' />
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

export default withRouter(QuotePersonalForm);