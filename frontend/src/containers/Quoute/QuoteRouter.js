import React, { useEffect } from 'react';
import QuoteProjectForm from './QuoteProjectForm';
import { connect } from 'react-redux';
import {
    Switch,
    useLocation,
    Route,
    useRouteMatch,
    Redirect
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
import * as actions from '../../actions';
import QuotePersonalForm from './QuotePersonalForm';
import Spinner from '../../components/accessories';
import StripeMain from '../Stripe';
import QuoteResult from './QuoteResult';
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
        <Content>
            <div className='container'>
                <Switch>
                    <ProtectedRoute exact path={path} component={QuoteProjectForm} />

                    <ProtectedRoute path={`${url}/deadline`} component={QuoteDeadline} />

                    <ProtectedRoute path={`${url}/user`} component={QuotePersonalForm} />

                    <ProtectedRoute path={`${url}/payment`} component={StripeMain} />
                    <ProtectedRoute path={`${url}/result`} component={QuoteResult} />
                </Switch>
                <div className='steps-wrapper'>
                    <Steps current={quoteState.current} size='small' style={{ margin: '30px 0' }}>
                        <Step title="Project info" icon={<ProjectOutlined />} />
                        <Step title="Deadline" icon={<ClockCircleOutlined />} />
                        <Step title="Pay" icon={<UserOutlined />} />
                        <Step title="Pay" icon={<EuroCircleOutlined />} />
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
export default connect(mapStateToProps, actions)(QuoteRouter)






