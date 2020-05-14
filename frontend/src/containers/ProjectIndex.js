
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import {
    Typography,
    Row,
    Col,

    Empty,
    Select,
    Form,

    Button,
    Table,
    Tag
} from 'antd';
import * as actions from '../actions';
function ProjectIndex(props) {
    const {
        profileState,
        history,
        projectsState,

        servicesState

    } = props;
    console.log(projectsState);

    useEffect(() => {
        props.handleProjectsFetch()


    }, [])


    const columns = [
        {
            title: 'Name',
            dataIndex: 'project_name',
            key: 'project_name',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Concept Amount',
            dataIndex: 'concept_amount',
            key: 'concept_amount',
            render: text => <span>{`${Number(text)} requested`}</span>,
        },
        {
            title: 'Deadline Date',
            dataIndex: 'deadline_date',
            key: 'deadline_date',
        },

        {
            title: 'Requested Date',
            dataIndex: 'ordered_at',
            key: 'ordered_at',
        },
        {
            title: 'Status',
            key: 'finished',
            dataIndex: 'finished',
            render: finished => finished ? <Tag color="success">Success</Tag> : <Tag color="error">Unfinished</Tag>,
        }


    ]

    return (
        <main>
            <div className='container'>
                <Row className='mb-3'>
                    <Col md={10}>
                        <Typography.Title level={1}>
                            Projects
                    </Typography.Title>

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
                    <Col md={24}>
                        <Table
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: () => {
                                        history.push(`/projects/${record.id}`)
                                    }

                                };
                            }}
                            columns={columns}
                            dataSource={projectsState} />
                    </Col>


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

export default connect(mapStateToProps, actions)(withRouter(ProjectIndex))