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
import { getRequest } from '../utils/requests';
import Spinner from '../components/accessories';
import moment from 'moment';
import JSZip from 'jszip';
import { saveAs } from 'file-saver'
import { ButtonBack } from '../components/buttons';


function ProjectView(props) {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [on_accept_modal, setAcceptModal] = useState(false);
    const [image_source_modal, setImageSource] = useState(null)
    const [change_state, setChangeState] = useState(null)
    // fetch projects when the document is fully loaded
    useEffect(() => {
        getRequest({
            auth: true,
            url: `/api/projects/${id}`
        }).then(res => {
            if (res) {

                setProject(res)
            }
        })
    }, [])



    if (!project) {
        return <Spinner size='large' />
    }


    const color_list = project.colors.split(',');

    const ordered_at = moment(project.ordered_at).format('DD/MM/YYYY')

    const concept_amount = Number(project.concept_amount);
    let table_data = []


    for (var i = 0; i < concept_amount; i++) {

        table_data.push({
            id: `table_data${i}`,
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
                        <Button className='ml-1' type='primary' disabled={!text || project.approved}><Link to={`/projects/accept/${id}`}>Accept</Link></Button>

                    </>
                )
            }
        }

    ];

    const onDownloadAll = () => {

        let zip = new JSZip();
        let img = zip.folder("concepts");
        Promise.all(table_data.map(img =>
            fetch(img.img_url)

                .then(res => res.blob())
                .catch(error => {
                    console.log(error);
                })
        )).then(data => {

            data.map((x, i) => {
                const file_name = table_data[i].img_url.split('/').pop();

                img.file(file_name, x, { base64: true })
            })
            zip.generateAsync({ type: 'blob' }).then(content => {
                saveAs(content, `${project.project_name}s - ${project.ordered_at}.zip`)

            })
        })
    }
    const onAccept = () => {
        notification.open({
            message: "Notification",
            description: "You download should start in a few seconds",
        });

    }
    console.log(project);

    return (
        <>
            <Modal
                title='Accept Designs'
                onOk={onAccept}
                onCancel={() => setAcceptModal(false)}
                visible={on_accept_modal}>
                Are you sure you want to accept this design?
            </Modal>
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
                onCancel={() => setChangeState(false)}
            >
                <Form
                    labelCol={{ span: 24 }}>
                    <Form.Item label="Which concept would you like to make changes?">
                        <Select defaultValue={1}>
                            {table_data.map((data, index) =>
                                <Select.Option key={index} value={1}>
                                    {data.name}
                                </Select.Option>
                            )}

                        </Select>
                    </Form.Item>
                    <Form.Item
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