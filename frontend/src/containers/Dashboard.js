import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Typography, Row, Col } from 'antd'
import { withRouter } from 'react-router-dom'
function Dashboard(props) {
    const {
        profileState,
        history
    } = props;







    return (
        <main>
            <div className='container'>
                <Typography.Title level={2}>
                    Welcome {profileState.first_name}
                </Typography.Title>

                <Row>

                    <Col>

                    </Col>
                </Row>
            </div>

        </main>
    )
}
const mapStateToProps = state => {
    return {
        profileState: state.profileReducer,
        projectsState: state.projectsReducer
    }
}

export default connect(mapStateToProps)(withRouter(Dashboard))