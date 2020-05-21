import React, { useEffect, useState } from 'react';
import {
    Row,
    Typography,
    Empty,
    Col,
    Badge,
    Card,
    Button,
    Table,
    Carousel
} from 'antd';
import { useParams } from 'react-router-dom';
import { getRequest } from '../utils/requests';
import Spinner from '../components/accessories';
import moment from 'moment';
import JSZip from 'jszip';
import { saveAs } from 'file-saver'


function ProjectView(props) {
    const { id } = useParams();
    const [project, setProject] = useState(null);


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
    console.log(project);


    const color_list = project.colors.split(',');
    const due_date = moment(project.deadline_date).format('DD/MM/YYYY')

    const concept_amount = Number(project.concept_amount);
    let table_data = []


    for (var i = 0; i < concept_amount; i++) {

        table_data.push({
            img_url: project[`image${i + 1}`],
            size: `${Number(project.width)}px x  ${Number(project.height)}px`

        })
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'img_url',
            key: 'img_url',
            render: () => <span>Image</span>,
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
            render: text => <Button disabled={!text}><a href={text} download>Download</a></Button>
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
    return (
        <section id='project-veiw' className='mt-2' >
            <div className='container'>
                <Row>
                    <Col md={24}>


                        <Typography.Title level={1}>{project.project_name} Design</Typography.Title>
                        <Typography.Text>Deadline date:  {due_date}</Typography.Text>


                        <Row justify='space-between mt-1 content-center'>
                            <div className='flex'>
                                {color_list.map((color, index) => <div className='color-circle' style={{ backgroundColor: color }}></div>)}
                            </div>

                            <Button type='primary' onClick={onDownloadAll} ><a >Download all</a></Button>

                        </Row>
                        <Row className='mt-3' justify='center'>
                            <Col md={17}>
                                <ImageCarousel carousel_data={table_data} finished={project.finished} />
                            </Col>
                        </Row>



                        <Table
                            className='mt-2'
                            pagination={false}
                            columns={columns}
                            dataSource={table_data} />




                    </Col>
                </Row>

            </div>
        </section>
    )


}

export default ProjectView;








function ImageCarousel(props) {
    if (!props.finished) {
        return (

            <Card className='mt-2'><Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="It's empty here!"
            /></Card>


        )
    }
    return (
        <Card className='project-view-card'>
            <Carousel autoplay className='project-view-carousel'>
                {props.carousel_data.map(x =>
                    <img src={x.img_url} />
                )}

            </Carousel>
        </Card>
    )
}