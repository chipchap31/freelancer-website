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
import {
    DribbbleOutlined,
    BehanceOutlined,
    TwitterOutlined,
    GithubOutlined
} from '@ant-design/icons';


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

            <section id='services-view' className='py-5 bg-orange'>
                <div className='container'>
                    <div className='text-center'>
                        <Typography.Title level={2}>Services</Typography.Title>
                        <Typography.Text className='color-white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography.Text>
                    </div>

                    <Row justify='space-between' className='my-4'>
                        {servicesState.map((service, index) =>
                            <Col
                                className='text-center p-1'
                                key={index}
                                md={24 / 3}>
                                <Row justify='center' >
                                    <img src={service.image} />
                                </Row>

                                <Typography.Title className='mt-1' level={3}>
                                    {service.name} Design
                                </Typography.Title>
                                <div className='mb-1'>
                                    <Typography.Text className='color-white'   >
                                        Starting price: €{Number(service.price)}
                                    </Typography.Text>
                                </div>

                                <Typography.Text className='color-white' >
                                    {service.description}
                                </Typography.Text>
                            </Col>
                        )}

                    </Row>
                </div>
            </section>

            <section id='projects' className='my-5'>
                <div className='container'>


                    <Typography.Title level={2}>Projects</Typography.Title>
                    <Typography.Text>Collection of previous projects.</Typography.Text>
                    <Row className='mt-2' justify='space-between'>
                        {projectPublicState.map((data, index) =>
                            <div style={{ backgroundImage: `url(${data.image_url})` }}
                                className='project-public'>

                            </div>
                        )}
                        {placeholder.map(() => <div className='project-placeholder'></div>)}
                    </Row>
                </div>
            </section>

            <section
                id='get-quote-helper'
                className='py-5 mt-5 bg-orange'
            >
                <div className='container  flex content-center'>
                    <Typography.Title level={4}>Are you ready to get your first design?</Typography.Title>

                    <Button type='primary' className='ml-3'><Link to='/get-quote'>Get a quote</Link></Button>
                </div>
            </section>



            <section id='useful-links' className='py-7 bg-blue'>
                <div className='container'>
                    <div className='text-center'>
                        <Typography.Title
                            className='color-white'
                            title={2}>jomarialang31@gmail.com</Typography.Title>
                        <Typography.Text className='color-white'>Don't hesitate to get in touch.</Typography.Text>
                    </div>

                    <Row justify='center' className='mt-3'>
                        <a className='icon-link color-white'
                            href='https://dribbble.com/jomarialang31'
                            target='_blank'
                        >
                            <DribbbleOutlined />
                        </a>
                        <a className='icon-link color-white'
                            href='https://www.behance.net/jomarialanc822'
                            target="_blank"
                        >
                            <BehanceOutlined />
                        </a>
                        <a className='icon-link color-white'
                            href='https://github.com/chipchap31'
                            target='_blank'>
                            <GithubOutlined />
                        </a>
                        <a className='icon-link color-white'
                            href='https://twitter.com/chipchap31'
                            target="_blank"
                        >
                            <TwitterOutlined />
                        </a>

                    </Row>
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