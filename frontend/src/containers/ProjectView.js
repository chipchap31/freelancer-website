import React, { useEffect, useState } from 'react';
import {
    Row,
    Typography,
    Empty,
    Col,
    Alert,
    notification,
    Card,
    Button,
    Table,
    Carousel,
    Modal,
    Select,
    Form,
    Input
} from 'antd';
import { useParams, Link } from 'react-router-dom';
import { getRequest, postAuth } from '../utils/requests';
import Spinner from '../components/accessories';
import moment from 'moment';
import { ButtonBack } from '../components/buttons';
import { CloseOutlined } from '@ant-design/icons';


function ProjectView(props) {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [image_source_modal, setImageSource] = useState(null);
    const [change_state, setChangeState] = useState(null);
    const [change_list, setChangeList] = useState([]);
    const [form] = Form.useForm();

    // fetch projects when the document is fully loaded
    useEffect(() => {
        getRequest({
            auth: true,
            url: `/api/projects/${id}`
        }).then(res => {
            if (!res) {
                return
            }
            return setProject(res)
        });

        getRequest({
            url: `/api/projects/change/${id}/list`,
            auth: true
        }).then(res => {

            if (!res) {
                return
            }
            setChangeList(res)
        })
    }, [])



    if (!project) {
        return <Spinner size='large' />
    }


    const color_list = project.colors.split(',');
    const ordered_at = moment(project.ordered_at).format('DD/MM/YYYY')
    const concept_amount = Number(project.concept_amount);
    let table_data = [];


    for (var i = 0; i < concept_amount; i++) {

        table_data.push({
            id: i,
            img_url: project[`image${i + 1}`],
            size: `${Number(project.width)}px x  ${Number(project.height)}px`,
            name: 'Concept ' + (i + 1)
        })
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'img_url',
            key: 'img_url',
            render: (text, record) => <span>{record.name}</span>,
        },
        {
            title: 'Size',
            dataIndex: "size",
            key: "size"
        },
        {
            title: 'Actions',
            dataIndex: "img_url",
            key: "img_url",
            render: (text, record) => {
                return (
                    <>
                        <Button disabled={!text} onClick={() => setImageSource(record)}>View</Button>
                        <Button className='ml-1' type='primary' disabled={!text || project.approved}><Link to={`/projects/accept/${id}/concept/${record.id + 1}`}>Accept</Link></Button>

                    </>
                )
            }
        }

    ];
    const onOk = async () => {
        const form_values = await form.validateFields();
        try {
            const response = await postAuth({
                token: sessionStorage.getItem('token'),
                url: `/api/projects/change/${id}`,
                body: form_values
            })
            setChangeState(false);

            setChangeList([...change_list, response])
        } catch (error) {
            console.log(error)
        }
    }

    const onClickDeleteChange = change_id => {
        // we run this code when user wants to delete a change.
        let change_list_duplicate = [...change_list];
        change_list_duplicate = change_list_duplicate.filter(obj => obj.id !== change_id);
        getRequest({
            url: `/api/projects/change/${change_id}/destroy`,
            auth: true
        }).then(res => {
            console.log(res);

        }).catch(error => {
            console.log(error);
        })
        return setChangeList(change_list_duplicate);

    }

    console.log(project)

    return (
        <>

            <Modal
                title={image_source_modal ? image_source_modal.name : null}
                className='image-modal'
                onOk={() => setImageSource(null)}
                onCancel={() => setImageSource(null)}
                visible={image_source_modal}>
                {image_source_modal && <img src={image_source_modal.img_url} alt='current-image-target' />}
            </Modal>

            <Modal
                title="Request Changes"
                visible={change_state}
                okText="Submit Request"
                onOk={onOk}
                onCancel={() => setChangeState(false)}
            >
                <Form
                    form={form}
                    initialValues={{
                        concept_number: 1
                    }}
                    labelCol={{ span: 24 }}>
                    <Form.Item

                        name='concept_number'
                        label="Which concept would you like to make changes?">
                        <Select>
                            {table_data.map((data, index) =>
                                <Select.Option key={index} value={index + 1}>
                                    {data.name}
                                </Select.Option>
                            )}

                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='description'
                        label='Describe the change you want to make.'
                    >
                        <Input.TextArea
                            rows={6}
                        >

                        </Input.TextArea>
                    </Form.Item>


                </Form>
            </Modal>

            <section id='project-veiw' >

                <div className='container'>
                    {project.approved && <Alert
                        className='my-2'
                        message="You can no longer ask for changes for this project, as you already accepted it"
                        type="warning"
                        closable

                    />}
                    <div className='mt-1'>
                        <ButtonBack />
                    </div>

                    <Row>
                        <Col md={24}>
                            <Typography.Title className='mt-2' level={1}>{project.project_name} Design</Typography.Title>
                            <Typography.Text>Ordered at {ordered_at}</Typography.Text>
                            <Row justify='space-between content-center'>

                                <div className='flex mt-1'>
                                    {color_list.map((color, index) => <div className='color-circle' key={index} style={{ backgroundColor: color }}></div>)}
                                </div>
                                <div className='mt-1'>

                                    <Button onClick={() => setChangeState(true)} disabled={!project.finished || project.approved}>Request Changes</Button>
                                </div>


                            </Row>
                            <Row className='mt-3' justify='center'>
                                <Col md={17}>
                                    <ImageCarousel
                                        carousel_data={table_data}
                                        deadline={project.deadline_date}
                                        finished={project.finished} />
                                </Col>
                            </Row>

                            <Table
                                rowKey={record => record.id}
                                className='mt-2'
                                pagination={false}
                                columns={columns}
                                dataSource={table_data} />
                            <div className='my-3'>
                                <Typography.Title level={2}>
                                    Changes Request
                                </Typography.Title>
                                {change_list.map((change, index) =>
                                    (
                                        <Card className='mt-1' key={`change_${index}`}>

                                            <Row justify='space-between'>
                                                <Typography.Title level={3}>
                                                    {index + 1}. Concept {Number(change.concept_number)}
                                                </Typography.Title>
                                                <CloseOutlined className='clickable' onClick={() => onClickDeleteChange(change.id)} />
                                            </Row>
                                            <Typography.Text>Requested  {moment(change.requested_at).fromNow()} </Typography.Text>
                                            <div className='mt-1'>
                                                <Typography.Text>{change.description}</Typography.Text>
                                            </div>

                                        </Card>
                                    ))
                                }
                                {change_list.length <= 0 && (
                                    <Empty
                                        description='No request here!'
                                    ></Empty>
                                )}
                            </div>

                        </Col>
                    </Row>

                </div>
            </section>
        </>
    )

}

export default ProjectView;








function ImageCarousel(props) {
    const deadline = props.deadline ? `Due ${moment(props.deadline).fromNow()}` : "No deadline"
    if (!props.finished) {
        return (

            <Card className='mt-2'><Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={deadline}
            /></Card>


        )
    }
    return (
        <Card className='project-view-card'>
            <Carousel autoplay className='project-view-carousel'>
                {props.carousel_data.map((x, i) =>
                    <img key={i} alt="carousel-image" src={x.img_url} />
                )}

            </Carousel>
        </Card>
    )
}