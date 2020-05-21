import React, { useEffect } from 'react';
import QuoteProjectForm from './QuoteProjectForm';
import { connect } from 'react-redux';
import {
    Switch,
    Route,
    useRouteMatch,
    Redirect,
    withRouter
} from 'react-router-dom';
import {
    ProjectOutlined,
    ClockCircleOutlined,
    EuroCircleOutlined,
    SmileOutlined,
    UserOutlined
} from '@ant-design/icons';
import {
    Steps,
    Layout,


} from 'antd';
import QuoteDeadline from './QuoteDeadline';
import * as actions from '../actions';
import QuotePersonalForm from './QuotePersonalForm';
import Spinner from '../components/accessories';
import QuotePayment from './QuotePayment'
import QuoteResult from './QuoteResult';
import QuotePaid from './QuotePaid'
function QuoteRouter(props) {
    /* This is the main view for the Quote page */
    const { quoteState, acceptingProject: { isLoading, accept_project } } = props;
    const { Step } = Steps;
    const { Content } = Layout;
    const { path, url } = useRouteMatch();




    const ProtectedRoute = ({ component: Component, ...rest }) => (
        <Route
            {...rest}
            render={(props) => {
                if (isLoading) {
                    return <Spinner size='large' />;
                } else if (!accept_project && !isLoading) {
                    return <Redirect to="/waiting-list" />;
                } else {
                    return <Component {...props} />;
                }
            }}
        />
    );
    return (
        <Content className='mt-6'>
            <div className='container'>
                <div style={{ minHeight: '60vh' }}>
                    <Switch>
                        <ProtectedRoute exact path={path} component={QuoteProjectForm} />

                        <ProtectedRoute path={`${url}/deadline`} component={QuoteDeadline} />

                        <ProtectedRoute path={`${url}/user`} component={QuotePersonalForm} />

                        <ProtectedRoute path={`${url}/payment`} component={QuotePayment} />
                        <ProtectedRoute path={`${url}/result`} component={QuoteResult} />
                        <ProtectedRoute path={`${url}/paid`} component={QuotePaid} />
                    </Switch>
                </div>

                <div className='steps-wrapper mt-4'>
                    <Steps current={quoteState.current} size='small' style={{ margin: '30px 0' }}>
                        <Step title="Project" icon={<ProjectOutlined />} />
                        <Step title="Deadline" icon={<ClockCircleOutlined />} />
                        <Step title="Personal" icon={<UserOutlined />} />
                        <Step title="Result" icon={<EuroCircleOutlined />} />
                        <Step title="Payment" icon={<EuroCircleOutlined />} />
                        <Step title="Done" icon={<SmileOutlined />} />
                    </Steps>
                </div>

            </div>

        </Content>
    )
}
function mapStateToProps(state) {
    return {
        quoteState: state.quoteReducer,
        acceptingProject: state.projectConfigReducer
    }
}
export default connect(mapStateToProps, actions)(withRouter(QuoteRouter))






