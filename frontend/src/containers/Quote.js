import React from 'react';
import { connect } from 'react-redux';
import {
    Steps,
    Select,
    Form,
    Input,
    Row,
    Col,
    InputNumber,
    Popconfirm
} from 'antd';

import {
    ProjectOutlined,
    ClockCircleOutlined,
    EuroCircleOutlined,
    SmileOutlined,
    PlusOutlined,

} from '@ant-design/icons';
import { Typography, Layout, Slider, Button, Modal } from 'antd';
import { onEditQuote } from '../actions';
import { SketchPicker } from 'react-color';

function Quote(props) {
    const { quoteState, onEditQuote } = props;

    const setColorChange = (color, event, index) => {
        let colorMutation = quoteState.colors;
        colorMutation.splice(index, 1, color.hex)
        onEditQuote({ ...quoteState, colors: colorMutation })
    }

    const [modalVisible, handleModalVisible] = React.useState(false)
    const { Step } = Steps;
    const { Title } = Typography;
    const { Content } = Layout;
    const { TextArea } = Input;
    const layout = {
        labelCol: { span: 24 }
    };

    return (

        <Content style={{ margin: '40px 0' }}>
            <div className='container'>
                <Typography>
                    <Title>Get your quote!</Title>
                </Typography>

                <Steps style={{ margin: '30px 0' }}>
                    <Step status="finish" title="Project info" icon={<ProjectOutlined />} />
                    <Step status="wait" title="Deadline" icon={<ClockCircleOutlined />} />
                    <Step status="wait" title="Pay" icon={<EuroCircleOutlined />} />
                    <Step status="wait" title="Pay" icon={<EuroCircleOutlined />} />
                    <Step status="wait" title="Done" icon={<SmileOutlined />} />
                </Steps>

                <Title level={4}>
                    Please fill out the project information.
                    </Title>
                <Form
                    {...layout}
                    style={{ marginTop: '20px' }}>

                    <Row justify='space-between'>
                        <Col md={10} >
                            <Form.Item label='Company name'>
                                <Input onChange={
                                    value => onEditQuote({
                                        ...quoteState,
                                        companyName: value
                                    })
                                } />
                            </Form.Item>
                            <Form.Item label="Project type">
                                <Select value={quoteState.type} name='type' onChange={value => onEditQuote({
                                    ...quoteState,
                                    type: value,
                                    width: quoteState.defaultWidth[value],
                                    height: quoteState.defaultHeight[value]

                                })}>
                                    <Select.Option value="icon">Icon</Select.Option>
                                    <Select.Option value="logo">Logo</Select.Option>
                                    <Select.Option value="poster">Poster</Select.Option>

                                </Select>
                            </Form.Item>




                            <Form.Item colon={false} label='How many concepts do you want?'>

                                <Slider
                                    onChange={
                                        value => {
                                            onEditQuote({
                                                ...quoteState,
                                                conceptAmount: value
                                            })
                                        }
                                    }
                                    value={quoteState.conceptAmount}
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
                            <Form.Item label='Colors'>
                                <Row>

                                    {quoteState.colors.map((x, index) =>
                                        <div key={index}>
                                            <div onClick={() => handleModalVisible(!modalVisible)} style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                backgroundColor: quoteState.colors[index],
                                            }}>

                                            </div>




                                        </div>
                                    )}
                                    <Modal
                                        onOk={() => handleModalVisible(false)}
                                        title="Select color"
                                        visible={modalVisible}>

                                        <SketchPicker width='96%' color={quoteState.colors[0]} onChange={(color, event) => setColorChange(color, event, 0)} />
                                    </Modal>


                                    <div>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            backgroundColor: '#eee',
                                            marginLeft: '10px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'

                                        }}>
                                            <PlusOutlined />
                                        </div>
                                    </div>
                                </Row>

                            </Form.Item>




                        </Col>




                        <Col md={12}>


                            <Form.Item label="Project size (width x height)" >
                                <InputNumber
                                    onChange={
                                        value => onEditQuote({
                                            ...quoteState,
                                            width: value
                                        })
                                    }
                                    value={quoteState.width}
                                    defaultValue={16}
                                    parser={value => value.replace('px', '')}
                                    formatter={value => `${value}px`} />

                                <span> x </span>

                                <InputNumber
                                    onChange={
                                        value => onEditQuote({
                                            ...quoteState,
                                            height: value
                                        })
                                    }
                                    value={quoteState.height}
                                    defaultValue={16}
                                    parser={value => value.replace('px', '')}
                                    formatter={value => `${value}px`} />
                            </Form.Item>


                            <Form.Item label='Description'>
                                <TextArea rows={6} />
                            </Form.Item>



                        </Col>
                    </Row>



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
        quoteState: state.quoteReducer
    }
}
export default connect(mapStateToProps, { onEditQuote })(Quote);





