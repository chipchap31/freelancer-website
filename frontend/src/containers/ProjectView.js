import React, { useEffect, useState } from 'react';
import { Row, Typography, Empty, Col, Badge, Card, Button, Table } from 'antd';
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
        i++
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
            render: text => <Button disabled={!text}><a href={text} download>Download</a></Button>
        }

    ];

    const onDownloadAll = async () => {
        // reuse the table_data
        let zip = new JSZip();
        const img = zip.folder("concepts");
        for (let obj of table_data) {


            try {
                const res = await fetch(obj.img_url);
                const res_to_blob = await res.blob();

                const file_name = obj.img_url.split('/').pop()


                img.file(file_name, res_to_blob, { base64: true })
            } catch (error) {
                console.log(error);

            }


        }
        const content = await zip.generateAsync({ type: 'blob' });

        saveAs(content, `${project.project_name}s - ${project.ordered_at}.zip`)
        // fetch('https://jomari-designs-2020.s3.amazonaws.com/media/media/icon.png')       // 1) fetch the url
        //     .then(function (response) {                       // 2) filter on 200 OK
        //         if (response.status === 200 || response.status === 0) {
        //             return Promise.resolve(response.blob());
        //         } else {
        //             return Promise.reject(new Error(response.statusText));
        //         }
        //     })
        //     .then(res => {
        //         const zip = new JSZip();
        //         const img = zip.folder("concepts");
        //         img.file("picture.png", res, { base64: true })
        //         zip.generateAsync({ type: "blob" })
        //             .then(content => {
        //                 saveAs(content, "designs.zip")
        //             })
        //     })
        //     /

    }
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

                            <Button type='primary' onClick={onDownloadAll} ><a >Download all</a></Button>

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