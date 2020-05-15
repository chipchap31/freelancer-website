import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { WidgetButton } from '../components/buttons';
import {
    Typography,
    Row,
    Col,
    Card,
    Empty,
    Carousel,
    Calendar,
    Badge,
    Modal,
    List
} from 'antd';

import * as actions from '../actions';
import { ClockCircleOutlined } from '@ant-design/icons';

function Dashboard(props) {
    const {
        profileState,
        history,
        projectsState,
        userState,
        servicesState

    } = props;

    const [modal_state, setModalState] = useState(false);
    const [modal_data, setModalData] = useState([])
    const [selected_date, setSelectedDate] = useState(null)
    useEffect(() => {
        props.handleProjectsFetch()
    }, [])


    const dataCellRender = value => {
        // if date has a deadline increase the value of badge
        // const now = moment(new Date()).format('L');
        // const target = moment(value).format('L');
        // let badge = [];
        // let with_deadline = false;
        // const project_deadline = projectsState.map(project => {
        //     return {
        //         id: project.id,
        //         deadline_date: moment(project.deadline_date).format('L'),

        //     }

        // })
        // for (var i = 0; i < project_deadline.length; i++) {
        //     if (target === project_deadline[i].deadline_date) {
        //         console.log('true');
        //         badge.push(project_deadline[i])
        //         with_deadline = true;
        //     }
        // }
        // if (now === target) {
        //     // render a red dot on the cell if the date is today
        //     return (
        //         <div className='cell current'>
        //             <Row justify='end'>
        //                 <Col >
        //                     <span className='current-value'>{value.date()}</span>
        //                 </Col>
        //             </Row>
        //         </div>
        //     )

        // } else if (with_deadline) {
        //     return (
        //         <div className='cell' onClick={() => {
        //             setModalState(true);
        //             setSelectedDate(value)
        //         }}>
        //             <Row justify='end'>
        //                 <span className='mr-1'>{value.date()}</span>
        //             </Row>
        //             <Row justify='center '>
        //                 {badge.length > 0 ? <Badge count={badge.length} className='mt-1'>
        //                     <ClockCircleOutlined style={{ fontSize: '22px' }} /></Badge> : null}
        //             </Row>

        //         </div>
        //     )
        // } else {
        //     return (
        //         <div className='cell'>
        //             <Row justify='end'>
        //                 <span className='mr-1'>{value.date()}</span>
        //             </Row>

        //         </div>


        //     )
        // }

        // I want to loop through the project reducer.
        // format the deadline date so that it can be an identifier
        // render a now cell and then stop the loop
        const now = moment(new Date()).format('L');
        const target = moment(value).format('L');

        for (const obj of projectsState) {
            const deadline_date = moment(obj.deadline_date).format('L');

            if (now === target) {

                return value.date()
            }
        }
    }

    return (
        <main>
            <WidgetButton />
            <div className='container'>
                <Typography.Title level={1}>
                    My Dashboard
                </Typography.Title>
                <Row justify='space-between' className='mb-3'>

                    <Col md={15}>
                        <Card>
                            <Calendar
                                dateFullCellRender={dataCellRender}
                                fullscreen={false} />
                        </Card>
                    </Col>

                    <Col md={7}>

                        <Typography.Title level={3}>
                            Your top projects
                        </Typography.Title>
                        <Card>
                            <DashCarousel data={[]} />
                        </Card>
                    </Col>
                </Row>

            </div>
            <Modal
                title={selected_date ? moment(selected_date).format('MMMM Do YYYY') : null}
                onCancel={() => setModalState(false)}
                visible={modal_state}>
                <List
                    header={<div>Header</div>}

                    dataSource={modal_data}
                    renderItem={item => (
                        <List.Item>
                            <Typography.Text mark>[ITEM]</Typography.Text> {item}
                        </List.Item>
                    )}
                />
            </Modal>
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

export default connect(mapStateToProps, actions)(withRouter(Dashboard));






function DashCarousel({ data }) {
    if (data.length <= 0) {
        return (
            <>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='You have no accepted projects yet'>

                </Empty>
            </>
        )
    }
    return (
        <Carousel autoplay>
            <Card>
                <h3>1</h3>
            </Card>
            <div>
                <h3>2</h3>
            </div>
            <div>
                <h3>3</h3>
            </div>
            <div>
                <h3>4</h3>
            </div>
        </Carousel>
    )
}
