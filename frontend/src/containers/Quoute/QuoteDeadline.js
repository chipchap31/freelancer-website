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
    const renderMessage = () => message.error('You cannot select this date!');
    const Cell = props => {
        const { value, classes } = props;
        return (
            <div className={classes}>
                <Row justify='end'>
                    <Col style={{ marginRight: '10px' }}>
                        {value.date()}
                    </Col>
                </Row>
            </div>
        )
    }
    const dataCellRender = value => {

        const isDisabled = moment().add(14, 'days') > value;
        const now = moment().format('L');
        const target = value.format('L');
        const { deadlineDate } = quoteState
        if (now === target) {

            const classes = `cell current ${isDisabled ? 'disabled' : null}`;

            return <Cell classes={classes} value={value} />

        } else if (isDisabled) {
            return <Cell classes='cell disabled' value={value} />

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
                <div onClick={
                    () => handleQuoteChange({ deadlineDate: value })
                } className='cell'>
                    <Row justify='end'>
                        <Col>
                            {value.date()}
                        </Col>
                    </Row>
                </div>
            )
        }



    }
    const onClickNext = () => {

        if (!quoteState.deadlineDate) {
            return setModalVisible(true)
        }
        return history.push('/get-quote/user')
    }
    return (
        <>
            <Content>
                <Row>
                    <Col md={16}>
                        <Typography>
                            <Title level={2}>Deadline date</Title>
                            <Text>Please select a date after two weeks.</Text>
                        </Typography>
                        <div>
                            <Calendar
                                dateFullCellRender={dataCellRender}
                                fullscreen={true}

                            />
                        </div>
                        <Row style={{ marginTop: '20px' }}>
                            <Space>
                                <Button className='btn-back' type='primary'><Link to='/get-quote'>Back</Link></Button>
                                <Button onClick={onClickNext} type='primary'>Next</Button>
                            </Space>

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

