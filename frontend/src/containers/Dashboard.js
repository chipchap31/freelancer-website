import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import {
    Typography,
    Row,
    Col,
    Card,
    Empty,
    Select,
    Form
} from 'antd';
import * as actions from '../actions';
function Dashboard(props) {
    const {
        profileState,
        history,
        projectsState,
        userState,

    } = props;
    useEffect(() => {
        props.handleProjectsFetch()
    }, [])




    return (
        <main>
            <div className='container'>
                <Typography.Title level={2}>
                    Welcome {profileState.first_name}
                </Typography.Title>

                <Row justify='end'>
                    <div className='flex'>
                        <Form.Item label='Filter by'>
                            <Select defaultValue="All">
                                <Select.Option>
                                    All
                        </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item className='ml-2' label='Sort by'>
                            <Select defaultValue="Newest">
                                <Select.Option value="Newest" >
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </div>


                </Row>
                <Row>
                    {projectsState.map((x, i) =>
                        <Col key={i} md={24 / 3}>
                            <Card className='m-1'
                                title={`${x.project_name} Project`}
                                extra={`Due ${moment(x.deadline_date).fromNow()}`}

                            >
                                {x.image &&
                                    (<img src={`http://localhost:8000${x.image}`} />)}
                                {!x.image &&
                                    (<Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        description='This project is not finished.'>
                                    </Empty>)}
                            </Card>
                        </Col>
                    )}


                </Row>
            </div>

        </main>
    )
}
const mapStateToProps = state => {
    return {
        profileState: state.profileReducer,
        projectsState: state.projectsReducer,
        userState: state.userReducer
    }
}

export default connect(mapStateToProps, actions)(withRouter(Dashboard))