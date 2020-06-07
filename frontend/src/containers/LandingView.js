import React from 'react';
import {
    Typography,
    Row,
    Col,
    Button
} from 'antd';
import { connect } from 'react-redux';
import Spinner from '../components/accessories';
import { Link } from 'react-router-dom';

function LandingView(props) {
    const { servicesState, projectPublicState } = props;
    console.log(projectPublicState);

    if (servicesState.length <= 0 || !projectPublicState) {
        return <Spinner size='large' />
    }
    const project_public_len = projectPublicState.length;
    let placeholder = [];

    for (var i = 0; i < (6 - project_public_len); i++) {

        placeholder.push(i);
    }


    return (
        <>
            <section id='landing-view' className='py-10'>
                <div className='container'>
                    <Row justify='center'>
                        <Col md={23} className='text-center'>
                            <h1 className='color-white'>Freelance Graphic Designer</h1>
                            <Typography.Text className='color-white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nam faucibus lacinia congue. Mauris vehicula nibh leo, quis ornare est cursus non.
                            Fusce feugiat pretium diam vel tempus.</Typography.Text>

                            <div className='mt-4'>
                                <Button
                                    size='large'
                                    type='primary'>
                                    <Link to='/get-quote'>
                                        Get Started Now
                                </Link>
                                </Button>
                            </div>

                        </Col>
                    </Row>

                </div>
            </section>

            <section id='services-view' className='mt-5'>
                <div className='container'>
                    <div className='text-center'>
                        <Typography.Title level={2}>Services</Typography.Title>
                        <Typography.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography.Text>
                    </div>

                    <Row justify='space-between' className='my-4'>
                        {servicesState.map((service, index) =>
                            <Col className='text-center p-1' key={index} md={24 / 3}>
                                <Row justify='center' >
                                    <img src={service.image} />
                                </Row>

                                <Typography.Title className='mt-1' level={3}>
                                    {service.name} Design
                                </Typography.Title>
                                <div className='mb-1'>
                                    <Typography.Text >
                                        Starting price: €{Number(service.price)}
                                    </Typography.Text>
                                </div>

                                <Typography.Text >
                                    {service.description}
                                </Typography.Text>
                            </Col>
                        )}

                    </Row>
                </div>
            </section>

            <section id='projects'>
                <div className='container'>


                    <Typography.Title level={2}>Projects</Typography.Title>
                    <Typography.Text>Collection of previous projects.</Typography.Text>
                    <Row className='mt-2' justify='space-between'>
                        {projectPublicState.map((data, index) =>
                            <div className='placeholder'>
                                project
                            </div>
                        )}
                        {placeholder.map(() =>
                            <div className='placeholder'>

                            </div>
                        )}
                    </Row>
                </div>
            </section>

            <section
                id='get-quote-helper'
                className='py-5'
            >
                <div className='container'>
                    <Typography.Title level={4}>Are you ready to get your first graphic design?</Typography.Title>
                </div>
            </section>
        </>
    )
}
const mapStateToProps = state => {
    return {
        servicesState: state.servicesReducer,
        projectPublicState: state.projectsPublicReducer
    }
}
export default connect(mapStateToProps)(LandingView);