import React, { Profiler } from 'react'
import { connect } from 'react-redux'
import { Typography } from 'antd'
function Dashboard(props) {
    const { profileState } = props;


    return (
        <main>
            <div className='container'>
                <Typography.Title level={2}>
                    Welcome {profileState.first_name}
                </Typography.Title>

            </div>

        </main>
    )
}


export default connect(({ profileReducer }) =>
    ({ profileState: profileReducer }))(Dashboard)