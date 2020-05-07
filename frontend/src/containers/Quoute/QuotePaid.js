import React from 'react';
import { Row, Typography, Layout, Col, Button } from 'antd';
import { connect } from 'react-redux';
import { useLocation, Link } from "react-router-dom";
/** 
    * @module AccountCreated
    * @description Module that inform user that their account has been created 
    */
function QuotePaid(props) {
    const { quoteState: { project_type }, quoteState } = props;
    const { authenticated, account_new } = useLocation();




    const RenderInfo = () => {
        if (account_new) {
            return (
                <Col md={15} className='text-center mb-10'>
                    <Typography.Text>
                        Please check your email in order to obtain your login details.
                    </Typography.Text>

                    <Typography.Text>
                        Didn't get an email? <a href='#'>Resend email</a>
                    </Typography.Text>
                </Col>
            )
        }
        return (
            <Col md={15} className='text-center mb-10'>
                <Typography.Text>
                    You have successfully purchase {project_type} design.
                    Please login to your account in order to see the progress of your project. <Link to='/login'>Login Now</Link>
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
