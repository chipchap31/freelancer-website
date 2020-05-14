import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
    Layout,
    Row,
    Col,
    Calendar,
    Typography,
    message,
    Button,
    Badge,
    Space,
    Modal,

} from 'antd';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link, withRouter } from 'react-router-dom';
const { Content } = Layout;
const { Title, Text } = Typography;


function QuoteDeadline(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const {
        quoteState,
        userState,
        handleQuoteChange,
        handleQuoteRequest,
        history,
    } = props;

    const startOfFreeDays = moment().add(14, 'days');
    const { deadline_date, meeting_date } = quoteState;
    const renderMessage = () => message.error('You cannot select this date!');

    const Cell = props => {
        const { value, classes, cb } = props;
        return (
            <div onClick={cb ? renderMessage : null} className={classes}>
                <Row justify='end'>
                    <Col className='mr-1'>
                        {value.date()}
                    </Col>
                </Row>
            </div>
        )
    }

    const onDoubleClickMeeting = value => {
        handleQuoteChange({ meeting_date: null, deadline_date: value });


    }
    const dataCellRender = value => {

        const isDisabled = moment().add(14, 'days') > value;
        const now = moment().format('L');
        const target = value.format('L');



        if (now === target) {

            return (
                <div onClick={renderMessage} className={`cell current ${isDisabled ? 'disabled' : null}`}>
                    <Row justify='end'>
                        <Col className='mt-1'>
                            <span className='current-value'>{value.date()}</span>

                        </Col>
                    </Row>


                </div>
            )

        } else if (meeting_date && meeting_date.format('L') === target) {
            return (
                <div className='cell meeting'>
                    <Row justify='end'>
                        <Col className='mr-1'>
                            {value.date()}
                        </Col>
                    </Row>
                    <Row justify='start'>
                        <div className='ml-1'>
                            <Badge status='default' color='#69ffe4' text='Meeting' />
                        </div>

                    </Row>
                </div>
            )
        } else if (
            deadline_date &&
            target < deadline_date.format('L') &&
            target > now &&
            // prevent picking saturday and sunday
            value.format('dddd') !== 'Sunday' &&
            value.format('dddd') !== 'Saturday' &&
            // prevent user from picking the first two
            // days from the current day
            moment(new Date).add(2, 'day') < value
        ) {
            return (
                <div className='cell meeting'
                    onDoubleClick={() => {
                        onDoubleClickMeeting({ value })
                    }}
                    onClick={() => handleQuoteChange({ meeting_date: value })}
                >
                    <Row justify='end'>
                        <Col className='mr-1'>
                            {value.date()}
                        </Col>
                    </Row>

                </div>
            )
        } else if (
            isDisabled ||
            value.format('dddd') === 'Sunday' ||
            value.format('dddd') === 'Saturday' ||
            deadline_date && deadline_date.format('L') !== target

        ) {
            return <Cell cb={renderMessage} classes='cell disabled' value={value} />

        } else if (
            deadline_date &&
            deadline_date.format('L') == target
        ) {
            return (
                <div onClick={renderMessage} className='cell deadline selected'>
                    <Row justify='end'>
                        <Col className='mr-1'>
                            {value.date()}
                        </Col>
                    </Row>
                    <Row justify='start'>
                        <div className='ml-1'>
                            <Badge status='default' color='#FFDA5C' text='Deadline' />
                        </div>

                    </Row>

                </div>
            )
        } else {
            return (
                <div onClick={() => handleQuoteChange({ deadline_date: value })} className='cell'>
                    <Row justify='end'>
                        <Col className='mr-1'>
                            {value.date()}
                        </Col>
                    </Row>
                </div>
            )
        }


    }
    const onClickNext = () => {

        // when deadline is not set render a modal to make sure
        // continue if it is set
        if (!deadline_date) {
            return setModalVisible(true)
        }
        handleQuoteRequest({
            ...quoteState,
            deadline_date: quoteState.deadline_date ? quoteState.deadline_date.format('M/D/YYYY') : null,
            meeting_date: quoteState.meeting_date ? quoteState.meeting_date.format('M/D/YYYY') : null,
            colors: quoteState.colors.join(','),


        });
        handleQuoteChange({ current: 2 })



        return history.push('/get-quote/user')

    }
    const cellDefaultValue = () => {
        if (meeting_date) {
            return meeting_date;
        } else if (deadline_date) {

            return deadline_date;
        } else {
            return startOfFreeDays;
        }
    }
    const onClickResetButton = () => {
        handleQuoteChange({ deadline_date: null, meeting_date: null })
    }


    return (
        <>
            <Content>
                <Typography>
                    <Title level={2}>
                        {quoteState.project_type.charAt(0).toUpperCase()
                            + quoteState.project_type.slice(1) + ' '}
                        project timeline.</Title>
                    {!deadline_date && (<Text>Please select a suitable deadline for your project.</Text>)}
                    {deadline_date && (<Text>Please select a date if you want to meet. </Text>)}

                </Typography>







                <div>
                    <Calendar
                        dateFullCellRender={dataCellRender}
                        fullscreen={true}
                        defaultValue={cellDefaultValue()}

                    />
                </div>
                <Row justify='space-between' className='mt-2'>
                    <Col>
                        <Space>
                            <Button className='btn-back' type='primary'><Link to='/get-quote'>Back</Link></Button>
                            <Button onClick={onClickNext} type='primary'>Next</Button>
                        </Space>
                    </Col>
                    <Col>
                        <Button onClick={onClickResetButton} type='danger'>Reset</Button>
                    </Col>
                </Row>

            </Content>
            <Modal
                title='Deadline missing!'
                onCancel={() => setModalVisible(false)} visible={modalVisible}
                onOk={() => {
                    handleQuoteRequest({
                        ...quoteState,
                        deadline_date: quoteState.deadline_date ? quoteState.deadline_date.format('M/D/YYYY') : null,
                        meeting_date: quoteState.meeting_date ? quoteState.meeting_date.format('M/D/YYYY') : null,
                        colors: quoteState.colors.join(',')
                    });
                    handleQuoteChange({ current: 2 })
                    history.push('/get-quote/user')
                }}
                okText='Yes'
            >
                Are you sure you don't want to set the deadline?
            </Modal>
        </>
    )
}
function mapStateToProps(state) {
    return {
        quoteState: state.quoteReducer,
        userState: state.userReducer
    }
}
export default connect(mapStateToProps, actions)(withRouter(QuoteDeadline));



