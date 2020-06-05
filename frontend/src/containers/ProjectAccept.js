import React from 'react';
import { Typography, Form, Input, Rate, Row, Col, Button } from 'antd';
import { ButtonBack } from '../components/buttons';
import * as actions from '../actions';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRequest } from '../utils/requests';

function ProjectAccept(props) {
    const [state, setState] = React.useState(null);
    const { id } = useParams();
    React.useEffect(() => {
        getRequest({
            auth: true,
            url: `/api/projects/${id}`
        }).then(res => {
            if (res) {
                setState(res)
            }
        })
    }, [])


    const onFinish = values => {
        console.log(values);
        const data = {
            project_id: id,
            project_name: state.project_name,
            ...values
        }

        if (props.handlePublicProjectAdd(data)) {
            props.history.push('/projects')
        }

    }

    return (
        <section id='project-accept-view' className='mt-1'>
            <div className='container'>

                <Row>
                    <Col md={16}>
                        <ButtonBack />
                        <Typography.Title className='mt-1' level={1}>Design Feedback</Typography.Title>
                        <Typography.Text>
                            Before you continue, Please leave a short feedback on the finished design.
                        </Typography.Text>

                        <Form
                            initialValues={{ rate: 0 }}
                            onFinish={onFinish}
                            className='mt-3' labelCol={{ span: 24 }}>
                            <Form.Item
                                name='rate'
                                label='Rating'>
                                <Rate className='large' />
                            </Form.Item>

                            <Form.Item
                                name='feedack'
                                label='Feedback'>
                                <Input.TextArea rows={6}>

                                </Input.TextArea>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType='submit' type="primary">Submit</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>

            </div>
        </section >
    )
}

export default connect(null, actions)(withRouter(ProjectAccept));