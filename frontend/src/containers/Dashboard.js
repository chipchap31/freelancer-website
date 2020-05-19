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
    List,
    Tag

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
    console.log(projectsState);


    const [modal_data, setModalData] = useState([]);
    const [date_curr, setCurrDate] = useState(null);
    useEffect(() => {
        props.handleProjectsFetch()
    }, [])


    const dataCellRender = value => {

        // I want to loop through the project reducer.
        // format the deadline date so that it can be an identifier
        // render a now cell and then stop the loop
        const now = moment(new Date()).format('L');
        const target = moment(value).format('L');
        let deadline_data = [];
        let deadline_exist = false;

        for (let obj of projectsState) {
            const deadline_date = moment(obj.deadline_date).format('L');
            if (deadline_date === target) {
                deadline_data.push(obj);
                deadline_exist = true;
            }
        }



        if (now === target) {

            return (
                <div className='cell'>
                    <Row justify='end'>
                        <span className='mr-1 current-value'>{value.date()}</span>
                    </Row>
                </div>
            )
        } else if (deadline_exist) {
            return (
                <div className='cell' onClick={() => {
                    setModalData(deadline_data);
                    setCurrDate(value);


                }}>
                    <Row justify='end'>
                        <span className='mr-1'>{value.date()}</span>
                    </Row>
                    <Row justify='center '>
                        {deadline_data.length > 0 ? <Badge count={deadline_data.length} className='mt-1'>
                            <ClockCircleOutlined style={{ fontSize: '22px' }} /></Badge> : null}
                    </Row>

                </div>
            )
        } else {
            return (
                <div className='cell'>
                    <Row justify='end'>
                        <span className='mr-1'>{value.date()}</span>
                    </Row>
                </div>
            )
        }
    }
    const cellDefaultValue = () => {
        const init_deadline_date = projectsState.length > 0 ? projectsState[0].deadline_date : null;
        return moment(init_deadline_date)
    }
    return (
        <main>
            <WidgetButton />
            <div className='container'>
                <Typography.Title level={1}>
                    My Dashboard
                </Typography.Title>
                <Typography.Text>
                    Overview of all your projects.
                </Typography.Text>
                <Row justify='space-between' className='mb-3'>

                    <Col md={15}>

                        <Calendar
                            dateFullCellRender={dataCellRender}
                            fullscreen={false}
                            defaultValue={cellDefaultValue()}
                        />

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
                title={date_curr ?
                    date_curr.format('MMMM Do YYYY')
                    : null}
                onOk={() => setModalData([])}
                onCancel={() => setModalData([])}
                cancelText='close'
                visible={Boolean(modal_data.length)}>
                <List


                    dataSource={modal_data}
                    renderItem={item => (
                        <List.Item>

                            <Typography.Text strong>
                                {item.project_name} Design
                            </Typography.Text>



                            {item.finished ? <Tag color='success'>Finished</Tag> : <Tag color='error'>Unfinished</Tag>}

                            <Link to={`/projects/${item.id}`}>View</Link>


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
