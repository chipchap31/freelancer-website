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
import { Link } from 'react-router-dom';

function QuoteDeadline(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const { quoteState, handleQuoteChange } = props;
    const { Content } = Layout;
    const { Title, Text } = Typography;
    const renderMessage = () => message.error('You cannot select this date!');
    const handleSelectDate = date => setCurrentDate(date);
    const dataCellRender = value => {

        const isDisabled = moment().add(14, 'days') > value;

        switch (value.format('L')) {
            case moment().format('L'):
                return (
                    <div className={`cell current ${isDisabled ? 'disabled' : null}`}>
                        <Row justify='end'>
                            <Col>
                                {value.date()}
                            </Col>
                        </Row>
                    </div>
                )

            default:

                if (isDisabled) {
                    return (
                        <div onClick={renderMessage} className='cell disabled'>
                            <Row justify='end'>
                                <Col>
                                    {value.date()}
                                </Col>
                            </Row>
                        </div>
                    )
                } else if (quoteState.deadlineDate && quoteState.deadlineDate.format('L') == value.format('L')) {
                    return (
                        <div onClick={renderMessage} className='cell deadline'>
                            <Row justify='end'>
                                <Col>
                                    {value.date()}
                                </Col>
                            </Row>
                            <Badge status='error' text='Deadline' />
                        </div>
                    )
                }
                return (
                    <div onClick={
                        () => handleQuoteChange({
                            ...quoteState,
                            deadlineDate: value
                        })
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








    return (
        <>
            <Content >
                <Row>

                    <Col md={16}>
                        <Typography>
                            <Title level={2}>Deadline date</Title>
                            <Text>Please select a date after two weeks.</Text>
                        </Typography>
                        <div >
                            <Calendar
                                dateFullCellRender={dataCellRender}
                                fullscreen={true}
                                onSelect={handleSelectDate}
                            />
                        </div>
                        <Row style={{ marginTop: '20px' }}>
                            <Space><Button className='btn-back' type='primary'><Link to='/get-quote'>Back</Link></Button>
                                {!quoteState.deadlineDate &&
                                    (<Button onClick={() => setModalVisible(true)} type='primary'>Next</Button>)}
                                {quoteState.deadlineDate &&
                                    (<Button type='primary'><Link to='/get-quote/profile'>Next</Link></Button>)}



                            </Space>

                        </Row>
                    </Col>
                </Row>

            </Content>
            <Modal onCancel={() => setModalVisible(false)} visible={modalVisible}>

            </Modal>
        </>
    )
}
function mapStateToProps(state) {
    return {
        quoteState: state.quoteReducer
    }
}
export default connect(mapStateToProps, actions)(QuoteDeadline);

