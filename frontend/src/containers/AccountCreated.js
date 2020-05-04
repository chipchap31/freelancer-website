import React from 'react';
import { Row, Typography, Layout, Col, Button } from 'antd';
import { connect } from 'react-redux';
/** 
    * @module AccountCreated
    * @description Module that inform user that their account has been created 
    */
function AccountCreated(props) {
    const { quoteState } = props;
    return (
        <Layout.Content className='container'>
            <Row justify='center'>
                <Col className='text-center'>
                    <Typography.Title level={2}>
                        Successful Payment For {quoteState.project_type} Design
</Typography.Title>
                    <Typography.Text>
                        Please check your email in order for the login details.
</Typography.Text>

                    <Typography.Text>
                        Didn't get an email? <Button type='link'>Resend email</Button>
                    </Typography.Text>
                </Col>


            </Row>
        </Layout.Content>

    )
}


export default connect(({ quoteReducer }) => ({ quoteState: quoteReducer }))(AccountCreated);
