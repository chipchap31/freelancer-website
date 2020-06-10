import React from 'react';
import { Typography, Row, Col, Rate, Card } from 'antd';
import { connect } from "react-redux";
import moment from 'moment';
import { Link } from 'react-router-dom';
function Works(props) {

    const works_len = props.works.length;
    let placeholder = [];

    for (var i = 0; i < (9 - works_len); i++) {
        placeholder.push(i);
    }
    console.log(props.works);


    return (
        <section id='works'>
            <div className='container py-4'>
                <Typography.Title level={1}>Works</Typography.Title>

                <Row className='mt-2' justify='space-between'>
                    {props.works.map((item, index) =>
                        <Card hoverable key={"work" + index} className='project-public'>
                            <Link to={`/works/${item.id}`}>
                                <img src={item.image_url} alt="work-image" />
                                <div className='work-info'>
                                    <Row justify='space-between'>
                                        <Typography.Title level={4}>{item.project_name} Design</Typography.Title>
                                        {moment(item.published_at).fromNow()}
                                    </Row>
                                    <Rate value={Number(item.rate)} disabled />
                                </div>
                            </Link>
                        </Card>

                    )}
                    {placeholder.map(() => <div className='project-placeholder'></div>)}
                </Row>
            </div>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        works: state.projectsPublicReducer
    }
}

export default connect(mapStateToProps)(Works);