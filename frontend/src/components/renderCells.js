import React from 'react';
import moment from 'moment';
import {
    Row,
    Col
} from 'antd';
export default function renderCells(value, props) {


    // CalendarCells is the component for every cell in the deadline calendar
    const isDisabled = moment().add(14, 'days') > value; // disable date if two weeks from now
    const target = value.format('L');
    const now = moment().format('L');

    if (target == now) { // target is current date
        return (
            <div className={`cell current ${isDisabled ? 'disabled' : null}`}>
                <Row justify='end'>
                    <Col>
                        {value.date()}
                    </Col>
                </Row>
            </div>
        )
    } else if (isDisabled) {

    }

}


