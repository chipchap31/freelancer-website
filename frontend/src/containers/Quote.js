import React from 'react';
import { connect } from 'react-redux';
import { Steps, Select, Form, Input } from 'antd';
import moment from 'moment';
import {
    ProjectOutlined,
    SolutionOutlined,
    EuroCircleOutlined,
    SmileOutlined
} from '@ant-design/icons';
import { Typography, Layout, DatePicker, Slider, Button } from 'antd';
function Quote() {
    const { Step } = Steps;
    const { Title } = Typography;
    const { Content, Sider } = Layout;
    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 12 },
    };
    return (

        <Content style={{ margin: '40px 0' }}>
            <div className='container'>
                <Typography>
                    <Title>Get your quote!</Title>
                </Typography>

                <Steps style={{ margin: '30px 0' }}>
                    <Step status="finish" title="Project info" icon={<ProjectOutlined />} />
                    <Step status="wait" title="Verification" icon={<SolutionOutlined />} />
                    <Step status="wait" title="Pay" icon={<EuroCircleOutlined />} />
                    <Step status="wait" title="Done" icon={<SmileOutlined />} />
                </Steps>

                <Title level={4}>
                    Please fill out the project information.
                    </Title>
                <Form
                    {...layout}
                    style={{ marginTop: '20px' }}>




                    <Form.Item label="Type">
                        <Select >
                            <Select.Option value="logo">Logo</Select.Option>
                            <Select.Option value="poster">Poster</Select.Option>
                            <Select.Option value="web">Website</Select.Option>
                        </Select>
                    </Form.Item>



                    <Form.Item label="Size" >
                        <Select disabled>
                            <Select.Option value="logo">Logo</Select.Option>
                            <Select.Option value="poster">Poster</Select.Option>
                            <Select.Option value="web">Website</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Deadline">
                        <DatePicker showToday={false} disabledDate={current => {
                            const twoWeeks = moment().add(10, 'days').calendar();
                            return current < moment(twoWeeks);
                        }} />
                    </Form.Item>
                    <Form.Item colon={false} label='How many concepts do you want?'>

                        <Slider
                            min={1}
                            max={5}
                            marks={{
                                1: 'One',
                                2: 'Two',
                                3: 'Three',
                                4: 'Four',
                                5: 'Five'

                            }}
                        />
                    </Form.Item>



                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Next
                         </Button>

                    </Form.Item>
                </Form>

            </div>
        </Content >




    )
}
function mapStateToProps(state) {
    return {
        quote: state.quoteReducer
    }
}
export default connect(mapStateToProps)(Quote);





