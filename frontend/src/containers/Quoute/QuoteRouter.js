import React, { useEffect } from 'react';
import QuoteHome from './QuoteHome';
import { connect } from 'react-redux';
import {
    Switch,
    useLocation,
    Route,
    useRouteMatch
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
    Typography,

} from 'antd';
import QuoteDeadline from './QuoteDeadline';
import * as actions from '../../actions';
import { quoteRoutes } from './QuoteHelpers';
function QuoteRouter(props) {
    /* This is the main view for the Quote page */
    const { quoteState, handleQuoteChange, } = props;

    const { Title } = Typography;
    const { Step } = Steps;
    const { Content } = Layout;
    const { path, url } = useRouteMatch();
    const location = useLocation();
    useEffect(() => {


        switch (location.pathname) {
            case quoteRoutes.home:

                handleQuoteChange({
                    ...quoteState,
                    current: 0
                })
                break;
            case quoteRoutes.deadline:

                handleQuoteChange({
                    ...quoteState,
                    current: 1
                })
                break;

            default:
                handleQuoteChange({
                    ...quoteState,
                    current: 0
                })
                break;
        }


    }, [])

    return (
        <Content>
            <div className='container'>
                <Switch>
                    <Route exact path={path}>
                        <QuoteHome />
                    </Route>
                    <Route path={`${url}/deadline`}>
                        <QuoteDeadline />
                    </Route>
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
        quoteState: state.quoteReducer
    }
}
export default connect(mapStateToProps, actions)(QuoteRouter)


