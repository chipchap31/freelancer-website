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
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
function QuotePersonalForm(props) {

    // Display this form after the deadline has been chosen


    const { Content } = Layout;
    const { Title } = Typography;
    const { history, quoteState } = props;
    const layout = { labelCol: { span: 24 } };
    const [state, setState] = useState({
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        address_line1: '',
        address_line2: '',
        city: '',
        county: ''
    });

    const onFinish = () => {
        // run this block when the next button is pressed 
        // move on payment if no error
        const {
            deadline_date,
            meeting_date,
            colors,
            height,
            width,
            description,
            concept_amount,
            project_type
        } = quoteState;

        const newData = {
            ...state,
            deadline_date: deadline_date ? deadline_date.format('YYYY-MM-DD') : null,
            meeting_date: meeting_date ? meeting_date.format('YYYY-MM-DD') : null,
            colors: colors.join(','),
            height,
            width,
            description,
            concept_amount,
            project_type,

        }
        props.handleQuoteRequest(history, newData)

        props.handleQuoteChange({ ...state })
    };

    return (
        <Content>
            <Col md={12}>
                <Title level={2}>Personal Information</Title>
                <Form  {...layout} onFinish={onFinish}>

                    <Row justify='space-between'>
                        <Col md={11}>
                            <Form.Item
                                label='First name'>
                                <Input
                                    onChange={({ target: { value } }) => setState({
                                        ...state,
                                        first_name: value
                                    })}
                                    value={state.first_name} />
                            </Form.Item>
                        </Col>
                        <Col md={11}>
                            <Form.Item label='Last name'>
                                <Input
                                    onChange={({ target: { value } }) => setState({
                                        ...state,
                                        last_name: value
                                    })}
                                    value={state.last_name} />
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
                                address_line1: value
                            })}
                            value={state.address_line1} />

                    </Form.Item>
                    <Form.Item
                        label='Address Line 2 (Optional)'>
                        <Input
                            onChange={({ target: { value } }) => setState({
                                ...state,
                                address_line2: value
                            })}
                            value={state.address_line2} />

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

function mapStateToProps(state) {
    return {
        quoteState: state.quoteReducer
    }
}
QuotePersonalForm = connect(mapStateToProps, actions)(QuotePersonalForm)
export default withRouter(QuotePersonalForm);