import React, { useState } from 'react';
import moment from 'moment';
import {
    Layout,
    Row,
    Col,
    Calendar,
    Typography,
    Modal,
    Badge
} from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

function QuoteDeadline(props) {
    const { Content } = Layout;
    const { Title, Text } = Typography;
    const [modal, setModal] = useState(false);
    const [currentDate, setCurrentDate] = useState(moment.now())
    function handleSelectDate(date) {
        setCurrentDate(date)

    }

    function dataCellRender(value) {
        const disableCurrent = moment().add(14, 'days') > moment.now()

        switch (value.calendar()) {

            case moment().calendar():
                return (
                    <div className={`cell current ${disableCurrent ? 'disabled' : null}`}>
                        <Row justify='end'>
                            <Text>
                                {value.date()}
                            </Text>

                        </Row>

                    </div >
                )

            case moment(currentDate).calendar():
                return (
                    <div className='cell selected'>
                        <Row justify='end'>
                            <Text>
                                {value.date()}
                            </Text>
                        </Row>

                    </div>
                )



            default:
                if (moment().add(14, 'days') > value) {
                    return (
                        <div className='cell disabled'>
                            <Row justify='end'>
                                <Text>
                                    {value.date()}
                                </Text>
                            </Row>

                        </div>
                    )
                }
                return (
                    <div className='cell'>
                        <Row justify='end'>
                            <Text>
                                {value.date()}
                            </Text>
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
                            <Title level={3}>Deadline date</Title>
                            <Text>Please select a date after two weeks.</Text>
                        </Typography>
                        <div >
                            <Calendar
                                dateFullCellRender={dataCellRender}
                                fullscreen={true}
                                onSelect={handleSelectDate}
                            />
                        </div>

                    </Col>
                </Row>

            </Content>
            <Modal
                title={moment(currentDate).format("MMM Do YY")}
                visible={modal}
                onCancel={() => setModal(false)}
            >

            </Modal>
        </>
    )
}

export default QuoteDeadline;

