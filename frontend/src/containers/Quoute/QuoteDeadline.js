import React, { useState } from 'react';
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
    Alert
} from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link, withRouter } from 'react-router-dom';
const { Content } = Layout;
const { Title, Text } = Typography;


function QuoteDeadline(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const { quoteState, history, handleQuoteChange } = props;
    const startOfFreeDays = moment().add(14, 'days');
    const { deadlineDate, meetingDate } = quoteState;
    const renderMessage = () => message.error('You cannot select this date!');

    const Cell = props => {
        const { value, classes, cb } = props;
        return (
            <div onClick={cb ? renderMessage : null} className={classes}>
                <Row justify='end'>
                    <Col style={{ marginRight: '10px' }}>
                        {value.date()}
                    </Col>
                </Row>
            </div>
        )
    }

    const onDoubleClickMeeting = value => {
        handleQuoteChange({ meetingDate: null, deadlineDate: value });


    }
    const dataCellRender = value => {

        const isDisabled = moment().add(14, 'days') > value;
        const now = moment().format('L');
        const target = value.format('L');



        if (now === target) {

            return (
                <div onClick={renderMessage} className={`cell current ${isDisabled ? 'disabled' : null}`}>
                    <Row justify='end'>
                        <Col style={{ marginRight: '10px' }}>
                            <span className='current-value'>{value.date()}</span>

                        </Col>
                    </Row>


                </div>
            )

        } else if (meetingDate && meetingDate.format('L') === target) {
            return (
                <div className='cell meeting'>
                    <Row justify='end'>
                        <Col style={{ marginRight: '10px' }}>
                            {value.date()}
                        </Col>
                    </Row>
                    <Row justify='start'>
                        <div style={{ marginLeft: '20px' }}>
                            <Badge status='default' color='#69ffe4' text='Meeting' />
                        </div>

                    </Row>
                </div>
            )
        } else if (
            deadlineDate &&
            target < deadlineDate.format('L') &&
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
                    onClick={() => handleQuoteChange({ meetingDate: value })}
                >
                    <Row justify='end'>
                        <Col style={{ marginRight: '10px' }}>
                            {value.date()}
                        </Col>
                    </Row>

                </div>
            )
        } else if (
            isDisabled ||
            value.format('dddd') === 'Sunday' ||
            value.format('dddd') === 'Saturday' ||
            deadlineDate && deadlineDate.format('L') !== target

        ) {
            return <Cell cb={renderMessage} classes='cell disabled' value={value} />

        } else if (
            deadlineDate &&
            deadlineDate.format('L') == target
        ) {
            return (
                <div onClick={renderMessage} className='cell deadline selected'>
                    <Row justify='end'>
                        <Col style={{ marginRight: '10px' }}>
                            {value.date()}
                        </Col>
                    </Row>
                    <Row justify='start'>
                        <div style={{ marginLeft: '20px' }}>
                            <Badge status='default' color='#FFDA5C' text='Deadline' />
                        </div>

                    </Row>

                </div>
            )
        } else {
            return (
                <div onClick={() => handleQuoteChange({ deadlineDate: value })} className='cell'>
                    <Row justify='end'>
                        <Col style={{ marginRight: '10px' }}>
                            {value.date()}
                        </Col>
                    </Row>
                </div>
            )
        }


    }
    const onClickNext = () => {

        if (!deadlineDate) {
            return setModalVisible(true)
        }
        return history.push('/get-quote/user')
    }
    const cellDefaultValue = () => {
        if (meetingDate) {
            return meetingDate;
        } else if (deadlineDate) {

            return deadlineDate;
        } else {
            return startOfFreeDays;
        }
    }
    const onClickResetButton = () => {
        handleQuoteChange({ deadlineDate: null, meetingDate: null })
    }



    return (
        <>
            <Content>
                <Typography>
                    <Title level={2}>
                        {quoteState.type.charAt(0).toUpperCase()
                            + quoteState.type.slice(1) + ' '}
                        project timeline.</Title>
                    {!deadlineDate && (<Text>Please select a suitable deadline for your project.</Text>)}
                    {deadlineDate && (<Text>Please select a date if you want to meet. </Text>)}

                </Typography>

                <Row justify='space-between'>


                    <Col md={16}>


                        <div>
                            <Calendar
                                dateFullCellRender={dataCellRender}
                                fullscreen={true}
                                defaultValue={cellDefaultValue()}

                            />
                        </div>
                        <Row justify='space-between' style={{ marginTop: '20px' }}>
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
                    </Col>


                </Row>

            </Content>
            <Modal
                title='Deadline missing!'
                onCancel={() => setModalVisible(false)} visible={modalVisible}
                onOk={() => history.push('/get-quote/user')}
                okText='Yes'
            >
                Are you sure you don't want to set the deadline?
            </Modal>
        </>
    )
}
function mapStateToProps(state) {
    return {
        quoteState: state.quoteReducer
    }
}
export default connect(mapStateToProps, actions)(withRouter(QuoteDeadline));



