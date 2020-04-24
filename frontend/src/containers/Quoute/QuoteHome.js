import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { SketchPicker } from 'react-color';
import { withRouter } from 'react-router-dom';
import {
    Form,
    Row,
    Col,
    Typography,
    Select,
    Modal,
    Popconfirm,
    InputNumber,
    Button,


} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';



function QuoteHome(props) {
    const { quoteState, handleQuoteChange, history } = props;
    const { Title } = Typography;
    const [color, setColor] = useState("#EEEE")
    const layout = { labelCol: { span: 24 } }
    const [visibleModal, handleVisibleModal] = useState(false);
    const handleColorChange = (color, event) => setColor(color.hex);
    const onPickColor = () => {
        handleQuoteChange({ colors: [...quoteState.colors, color] });
        handleVisibleModal(false)
    }
    const onColorDelete = i => {
        // removes the color from the color copy via index
        // the copy then becomes the new color array
        let quoteStateColorsCopy = quoteState.colors;
        quoteStateColorsCopy.splice(i, 1);
        handleQuoteChange({ colors: quoteStateColorsCopy })
    }

    const onClickNext = () => {
        history.push('/get-quote/deadline');
        handleQuoteChange({ current: 1 })
    }



    return (
        <>
            <Form {...layout}>

                <Col md={16}>
                    <Typography>
                        <Title level={3}>Provide project information.</Title>
                    </Typography>
                    <Row justify='space-between'>

                        <Col md={11}>
                            <Form.Item label="Project type">
                                <Select
                                    onChange={value => handleQuoteChange({
                                        type: value,
                                        width: quoteState.defaultWidth[value],
                                        height: quoteState.defaultHeight[value]
                                    })}
                                    value={quoteState.type}>
                                    <Select.Option value="icon">Icon</Select.Option>
                                    <Select.Option value="logo">Logo</Select.Option>
                                    <Select.Option value="poster">Poster</Select.Option>
                                </Select>
                            </Form.Item>


                            <Form.Item label="Select colors">
                                <Row>
                                    {quoteState.colors.map((o, i) =>
                                        <Popconfirm
                                            title="Are you sure delete this color?"
                                            okText="Yes"
                                            onConfirm={() => onColorDelete(i)}
                                            key={i}
                                        >
                                            <div

                                                style={{
                                                    backgroundColor: quoteState.colors[i],
                                                    borderRadius: '50%',
                                                    width: '50px',
                                                    height: '50px',
                                                    marginLeft: i > 0 ? '10px' : null
                                                }} >

                                            </div>
                                        </Popconfirm>)}
                                    {quoteState.colors.length < 5 && (<div
                                        onClick={() => handleVisibleModal(!visibleModal)}
                                        style={{
                                            backgroundColor: '#EEEE',
                                            borderRadius: '50%',
                                            width: '50px',
                                            height: '50px',
                                            marginLeft: '10px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <PlusCircleOutlined />
                                    </div>)}

                                </Row>

                            </Form.Item>

                        </Col>
                        <Col md={11}>
                            <Form.Item label="Project size (width x height)" >
                                <InputNumber
                                    onChange={value => handleQuoteChange({ width: value })
                                    }
                                    value={quoteState.width}
                                    defaultValue={16}
                                    parser={value => value.replace('px', '')}
                                    formatter={value => `${value}px`} />

                                <span> x </span>

                                <InputNumber
                                    onChange={value => handleQuoteChange({ height: value })}
                                    value={quoteState.height}
                                    defaultValue={16}
                                    parser={value => value.replace('px', '')}
                                    formatter={value => `${value}px`} />
                            </Form.Item>

                        </Col>
                    </Row>

                    <Form.Item label='Description'>
                        <TextArea allowClear rows={8} />
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={() => onClickNext()} type="primary">
                            Next
                            </Button>
                    </Form.Item>
                </Col>
            </Form>
            <Modal
                onCancel={() => handleVisibleModal(false)}
                onOk={() => onPickColor(false)}
                title="Select color"
                visible={visibleModal}>

                <SketchPicker width='96%' color={color} onChange={(color, event) => handleColorChange(color, event)} />
            </Modal>
        </>
    )
}
function mapStateToProps(state) {
    return {
        quoteState: state.quoteReducer
    }
}

export default connect(mapStateToProps, actions)(withRouter(QuoteHome));