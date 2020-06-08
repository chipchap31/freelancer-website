import React from 'react'
import { Typography, Layout, Row } from 'antd';

function Footer(props) {
    return (

        <Layout.Footer >
            <div className='container'>
                <Row justify='center'>
                    <Typography.Text>Site created by
                        <a href='https://github.com/chipchap31'
                            target='_blank'
                        > Jomari Alang</a></Typography.Text>
                </Row>
            </div>
        </Layout.Footer>

    )
}


export default (Footer);