import React from 'react'
import { Typography, Layout } from 'antd'

function Footer(props) {
    return (

        <Layout.Footer >
            <div className='container'>
                <div className='my-3'>
                    <Typography.Text>Site created by <a href='https://github.com/chipchap31'>Jomari Alang</a></Typography.Text>
                </div>

            </div>
        </Layout.Footer>

    )
}


export default Footer;