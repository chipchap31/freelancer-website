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
    Table,
    Tag
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


    useEffect(() => {
        props.handleProjectsFetch()


    }, [])


    return (
        <main>
            <div className='container'>
                <Row className='mb-3'>
                    <Col md={10}>
                        <Typography.Title level={1}>
                            My Dashboard
                            </Typography.Title>
                    </Col>
                </Row>

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