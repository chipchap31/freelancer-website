import React from 'react';
import {
    Typography,
    Form,
    Input,
    Row,
    Col,
    Button,
    Modal
} from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { WidgetButton } from '../components/buttons';
import * as actions from '../actions';
function ProfileView(props) {


    const [modal_state, setModalState] = React.useState(false);
    return (
        <>
            <section id='profile-view' className='my-4'>
                <div className='container'>
                    <Row justify='center'>
                        <Col md={16}>
                            <Typography.Title level={1}>Profile</Typography.Title>


                            <Form
                                initialValues={props.profileState}
                                labelCol={{ span: 24 }}>
                                <Row justify='space-between'>
                                    <Col md={11}>
                                        <Form.Item
                                            name='first_name'
                                            label='First Name'>
                                            <Input type='text' />
                                        </Form.Item>

                                    </Col>

                                    <Col md={11}>
                                        <Form.Item
                                            name='last_name'
                                            label='Last Name'>
                                            <Input type='text' />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row justify='space-between'>
                                    <Col md={11}>
                                        <Form.Item
                                            name='email'
                                            label='Email Address'>
                                            <Input type='text' />
                                        </Form.Item>

                                    </Col>

                                    <Col md={11}>
                                        <Form.Item
                                            name='mobile'
                                            label='Mobile Number'>
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
                                    label='Address Line 2'>
                                    <Input type='text' />
                                </Form.Item>

                                <Row justify='space-between'>
                                    <Col md={11}>
                                        <Form.Item
                                            name='city'
                                            label='City'>
                                            <Input type='text' />
                                        </Form.Item>

                                    </Col>

                                    <Col md={11}>
                                        <Form.Item
                                            name='county'
                                            label='County'>
                                            <Input type='text' />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item>
                                    <Row justify='space-between'>
                                        <Button type="primary">Save Changes</Button>
                                        <Button type='danger' onClick={() => setModalState(true)}>Delete Account</Button>
                                    </Row>

                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>

                </div>
            </section>
            <Modal
                okText='Confirm'
                onOk={() => props.handleAccountDelete(props.history)}
                onCancel={() => setModalState(false)}
                visible={modal_state} title='Delete Account'>
                Are you sure you want to delete your account?
            </Modal>
            <WidgetButton />
        </>
    )
}

const mapStateToProps = state => {
    return {
        profileState: state.profileReducer
    }
}
export default connect(mapStateToProps, actions)(withRouter(ProfileView));