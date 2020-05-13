import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import {
    Typography,
    Row,
    Col,
    Card,
    Empty,
    Select,
    Form,
    Badge,
    Button,

} from 'antd';
import * as actions from '../actions';
function Dashboard(props) {
    const {
        profileState,
        history,
        projectsState,
        userState,
        servicesState

    } = props;
    console.log(projectsState);

    useEffect(() => {
        props.handleProjectsFetch()


    }, [])

    const getDays = date => {

        return moment(date).diff(moment(new Date), 'days')
    }


    return (
        <main>
            <div className='container'>
                <Row className='mb-3'>
                    <Col md={10}>
                        <Typography.Title level={2}>
                            My Dashboard
                </Typography.Title>
                        <Typography.Text>
                            Hello {profileState.first_name}, this is your dashboard where you will see the status of your projects.
                </Typography.Text>
                    </Col>
                </Row>


                <Row justify='end'>
                    <div className='flex'>
                        <Form.Item label='Filter'>
                            <Select

                                className='dropdown'
                                defaultValue="All">
                                <Select.Option value='All'>
                                    All
                                </Select.Option>
                                <Select.Option value='Finish'>
                                    Finished
                                </Select.Option>
                                {servicesState.map((service, service_index) =>
                                    <Select.Option value={service.name} key={service_index}>
                                        {service.name}
                                    </Select.Option>
                                )}
                            </Select>
                        </Form.Item>
                        <Form.Item className='ml-2' label='Sort'>
                            <Select defaultValue="Newest">
                                <Select.Option value="Newest">
                                    Newest
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </div>


                </Row>
                <Row>

                    {projectsState.map((project, project_index) =>
                        <Col key={project_index} md={24 / 3}>
                            <Card

                                extra={`Due in ${getDays(project.deadline_date)} days`}
                                title={`${project.project_name} Design`}
                                className='m-1 project'
                                actions={
                                    [
                                        <Link to={`/projects/${project.id}`}>View</Link>,

                                        <a href={`http://localhost:8000${project.image1}`} target='_self' download>Download</a>


                                    ]
                                }>


                                {project.image1 ? <img alt="cover" src={`http://localhost:8000${project.image1}`} />
                                    : <Empty description='Not quite finish here!' image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                            </Card>

                        </Col>
                    )}



                </Row>
                {projectsState.length === 0 && (
                    <Row className='mt-5' justify='center'>
                        <Col className='text-center'>
                            <Empty description='You have no designs bought yet!' >

                            </Empty>

                            <Button className='mt-2' type='primary'>
                                <Link to='/get-quote'>
                                    Get a quote now!
                                </Link>

                            </Button>
                        </Col>

                    </Row>
                )}
            </div>

        </main >
    )
}
const mapStateToProps = state => {
    return {
        profileState: state.profileReducer,
        projectsState: state.projectsReducer,
        userState: state.userReducer,
        servicesState: state.servicesReducer
    }
}

export default connect(mapStateToProps, actions)(withRouter(Dashboard))