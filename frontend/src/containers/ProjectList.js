
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
import { WidgetButton } from '../components/buttons';
function ProjectList(props) {
    const {

        history,
        projectsState,
        servicesState
    } = props;
    const [state, setState] = React.useState([])
    useEffect(() => {
        props.handleProjectsFetch();
        setState(projectsState)
    }, [])


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',

        },
        {
            title: 'Type',
            dataIndex: 'project_name',
            key: 'project_name',
            render: text => <span>{text} Design</span>
        },
        {
            title: 'Status',
            key: 'finished',
            dataIndex: 'finished',

            render: (text, record) => {
                if (record.approved) {
                    return <Tag color='success'>Approved</Tag>
                } else if (record.finished) {
                    return <Tag color='error'>Finished</Tag>
                }
                else {
                    return <Tag color="warning">In progress</Tag>
                }
            },
        },
        {
            title: 'Requested Date',
            dataIndex: 'ordered_at',
            key: 'ordered_at',
            render: text => <span>{text ? moment(text).format('DD/MM/YYYY') : "No Deadline"}</span>,

            sorter: (a, b) => new Date(a.ordered_at) - new Date(b.ordered_at),
        }






    ]

    const filterData = target => {


        if (target == 'All') {
            return setState(projectsState)
        }
        const data_new = projectsState.filter((item, index) => {
            return item.project_name === target;
        })

        setState(data_new)

    }


    return (
        <>
            <div className='container'>
                <Row className='mb-3 mt-4'>
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
                                onChange={value => filterData(value)}
                                className='dropdown'
                                defaultValue="All">
                                <Select.Option value='All'>
                                    All
                                </Select.Option>

                                {servicesState.map((service, service_index) =>
                                    <Select.Option value={service.name} key={service_index}>
                                        {service.name}
                                    </Select.Option>
                                )}
                            </Select>
                        </Form.Item>

                    </div>


                </Row>
                <Row>
                    <Col md={24}>
                        <Table


                            showSorterTooltip
                            className='hoverable'
                            size="small"
                            rowKey={record => record.id}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: () => {
                                        history.push(`/projects/${record.id}`)
                                    }

                                };
                            }}
                            columns={columns}
                            dataSource={state} />
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
            <WidgetButton />
        </ >
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

export default connect(mapStateToProps, actions)(withRouter(ProjectList))