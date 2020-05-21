import React from 'react';
import { Row, Typography, Layout, Col, Button, Card } from 'antd';
import { connect } from 'react-redux';
import { useLocation, Link } from "react-router-dom";
import Spinner from '../components/accessories';
/** 
    * @module AccountCreated
    * @description Module that inform user that their account has been created 
    */
function QuotePaid(props) {
    const { quoteState } = props;
    const location = useLocation();


    const { authenticated } = location.state
    if (!quoteState) {
        return <Spinner size='large' />
    }


    const RenderInfo = (props) => {
        if (!authenticated) {
            return (
                <Row justify='center'>
                    <Col md={16} className='text-center '>
                        <Typography.Text>
                            You have successfully purchase {quoteState.project_type} design. Please check your email {" "}
                            <Typography.Text underline>{quoteState.email}</Typography.Text> in order to obtain your login details.
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
                </Row>
            )
        }
        return (
            <>
                <Row justify='center' className='mb-4'>
                    <Col md={15} className='text-center'>
                        <Typography.Text>
                            You have successfully purchase {quoteState.project_type} design.
                    Please click below to go back to your dashboard.
                    </Typography.Text>

                    </Col>

                </Row >
                <Row justify='center'>
                    <Button type='primary'><Link to='/projects'>Projects</Link></Button>
                    <Button className='ml-2 btn-secondary' ><Link to='/dashboard'>Dashboard</Link></Button>
                </Row>
            </>
        )
    }
    return (
        <Layout.Content className='container'>
            <Row justify='center'>
                <Col md={16}>
                    <Card className='mt-10'>
                        <Row justify='center '>
                            <Col className='text-center'>
                                <Typography.Title level={1}>
                                    Successful Payment
                    </Typography.Title>
                            </Col>
                        </Row>

                        <RenderInfo />
                    </Card>
                </Col>
            </Row>

        </Layout.Content>

    )
}

const mapStateToProps = state => {
    return {
        quoteState: state.quoteReducer
    }
}
export default connect(mapStateToProps)(QuotePaid);
