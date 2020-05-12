import React from 'react';
import { Row, Typography, Layout, Col, Button } from 'antd';
import { connect } from 'react-redux';
import { useLocation, Link } from "react-router-dom";
/** 
    * @module AccountCreated
    * @description Module that inform user that their account has been created 
    */
function QuotePaid(props) {
    const { quoteState: { project_type } } = props;
    const location = useLocation();
    const { authenticated } = location.state



    const RenderInfo = () => {
        if (!authenticated) {
            return (
                <Col md={15} className='text-center mb-10'>
                    <Typography.Text>
                        You have successfully purchase {project_type} design. Please check your email in order to obtain your login details.
                    </Typography.Text>
                    <Typography.Text>
                        Didn't get an email? <a href='#'>Resend email</a>
                    </Typography.Text>
                    <div className='mt-4'>
                        <Button type='primary' size='large'>
                            <Link to='/login'>Login</Link>
                        </Button>
                    </div>

                </Col>
            )
        }
        return (
            <Col md={15} className='text-center mb-10'>
                <Typography.Text>
                    You have successfully purchase {project_type} design.
                    Go back to <Link to='/dashboard'>Dashboard</Link>
                </Typography.Text>
            </Col>
        )
    }
    return (
        <Layout.Content className='container'>
            <Row justify='center mt-10'>
                <Col className='text-center'>
                    <Typography.Title level={2}>
                        Successful Payment
                    </Typography.Title>
                </Col>
            </Row>
            <Row justify='center'>
                <RenderInfo />
            </Row>
        </Layout.Content>

    )
}


export default connect(({ quoteReducer }) =>
    ({ quoteState: quoteReducer }))(QuotePaid);
