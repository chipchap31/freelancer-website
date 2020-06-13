import React from 'react';
import { Typography, Row, Col, Empty, Card } from 'antd';
import { StarFilled } from '@ant-design/icons';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { ButtonBack } from '../components/buttons'
function WorkDetailed(props) {

    const { state } = props.history.location;


    const stars = [];
    for (var i = 0; i < state.rate; i++) {
        stars.push(<StarFilled className='ml-1 star' />);
    }
    for (var i = 0; i < (5 - state.rate); i++) {
        stars.push(<StarFilled className='ml-1 star-placeholder' />)
    }

    return (
        <section id='work-detailed'>
            <div className='container py-3'>
                <div className='mb-2'>
                    <ButtonBack />
                </div>
                <Typography.Title>{state.project_name} Design</Typography.Title>
                <Typography.Text >Approved {moment(state.published_at).fromNow()} by {state.owner_name}</Typography.Text>
                <Row className='mt-2' justify='space-between'>
                    <Col xs={24} sm={11} md={11} className='mb-2'>
                        <img src={state.image_url} alt='work-detailed-image' />
                    </Col>
                    <Col xs={24} sm={11} md={11} className='mb-2'>

                        <Typography.Title level={4}>
                            Feedback {stars}
                        </Typography.Title>

                        <Card>
                            <Typography.Text>{state.feedback ? state.feedback :
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description='No feedback given.' />}</Typography.Text></Card>

                    </Col>
                </Row>
            </div>

        </section>

    )

}
export default withRouter(WorkDetailed);