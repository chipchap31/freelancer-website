import React from 'react';
import QuoteHome from './QuoteHome';
import { connect } from 'react-redux';
import {
    Switch,
    useRouteMatch,
    Route
} from 'react-router-dom';
import {
    ProjectOutlined,
    ClockCircleOutlined,
    EuroCircleOutlined,
    SmileOutlined
} from '@ant-design/icons';
import {
    Steps,
    Layout,
    Typography,

} from 'antd';
import QuoteDeadline from './QuoteDeadline';


function QuoteRouter(props) {
    /* This is the main view for the Quote page */
    const { quoteState } = props;
    const match = useRouteMatch;
    const { Title } = Typography;
    const { Step } = Steps;
    const { Content } = Layout;
    let { path, url } = useRouteMatch();
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
                <Steps current={quoteState.current} style={{ margin: '30px 0' }}>
                    <Step title="Project info" icon={<ProjectOutlined />} />
                    <Step title="Deadline" icon={<ClockCircleOutlined />} />
                    <Step title="Pay" icon={<EuroCircleOutlined />} />
                    <Step title="Pay" icon={<EuroCircleOutlined />} />
                    <Step title="Done" icon={<SmileOutlined />} />
                </Steps>
            </div>

        </Content>
    )
}
function mapStateToProps(state) {
    return {
        quoteState: state.quoteReducer
    }
}
export default connect(mapStateToProps)(QuoteRouter)


