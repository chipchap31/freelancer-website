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
    Modal
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

            const classes = `cell current ${isDisabled ? 'disabled' : null}`;

            return <Cell classes={classes} value={value} />

        } else if (meetingDate && meetingDate.format('L') === target) {
            return (
                <div
                    className='cell meeting'

                >
                    <Row justify='end'>
                        <Col style={{ marginRight: '10px' }}>
                            {value.date()}
                        </Col>
                    </Row>
                    <Row justify='start'>
                        <Badge style={{ marginLeft: '10px' }} status='success' text='Meeting' />
                    </Row>
                </div>
            )
        } else if (
            deadlineDate &&
            target < deadlineDate.format('L') &&
            target > now &&
            value.format('dddd') !== 'Sunday' &&
            value.format('dddd') !== 'Saturday'

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
        }
        else if (isDisabled) {
            return <Cell cb={renderMessage} classes='cell disabled' value={value} />

        } else if (deadlineDate && deadlineDate.format('L') == target) {
            return (
                <div onClick={renderMessage} className='cell deadline'>
                    <Row justify='end'>
                        <Col style={{ marginRight: '10px' }}>
                            {value.date()}
                        </Col>
                    </Row>
                    <Row justify='start'>
                        <Badge style={{ marginLeft: '10px' }} status='error' text='Deadline' />
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
                <Row>
                    <Col md={16}>
                        <Typography>
                            <Title level={2}>Select a deadline for your {quoteState.type}.</Title>
                            <Text>Please select a date after two weeks.</Text>
                        </Typography>
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

