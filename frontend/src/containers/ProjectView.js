import React, { useEffect, useState } from 'react';
import { Row, Typography, Empty, Col, Badge, Card, Button, Table } from 'antd';
import { useParams } from 'react-router-dom';
import { getRequest } from '../utils/requests';
import Spinner from '../components/accessories';
import moment from 'moment';
function ProjectView(props) {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    useEffect(() => {
        getRequest({
            auth: true,
            url: `/api/projects/${id}`
        }).then(res => {
            if (res) {
                console.log(res);
                setProject(res)
            }
        })
    }, [])


    if (!project) {
        return <Spinner size='large' />
    }


    const color_list = project.colors.split(',');
    const due_date = moment(project.deadline_date).format('DD/MM/YYYY')

    const concept_amount = Number(project.concept_amount);
    let table_data = []


    for (var i = 0; i < concept_amount; i++) {
        table_data.push({
            img_url: project[`image${i}`],
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
            render: text => <a href={text} download>Download</a>
        }

    ];
    console.log(table_data);

    return (
        <main>
            <div className='container'>
                <Row>
                    <Col md={24}>


                        <Typography.Title level={1}>{project.project_name} Design</Typography.Title>
                        <Typography.Text>Deadline date:  {due_date}</Typography.Text>


                        <Row justify='space-between mt-1 content-center'>
                            <div className='flex'>
                                {color_list.map((color, index) => <div className='color-circle' style={{ backgroundColor: color }}></div>)}
                            </div>

                            <Button type='primary' disabled={!project.finished}><a >Download</a></Button>

                        </Row>

                        <ImageCarousel finished={project.finished} />




                        <Table
                            className='mt-2'
                            pagination={false}
                            columns={columns}
                            dataSource={table_data} />



                        <div className='mt-2'>
                            {project.description ? project.description : "This project does not have any description!"}
                        </div>
                    </Col>
                </Row>

            </div>
        </main>
    )


}

export default ProjectView;








function ImageCarousel(props) {
    if (!props.finished) {
        return (<Card className='mt-2'><Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="It's empty here!"
        /></Card>)
    }

}