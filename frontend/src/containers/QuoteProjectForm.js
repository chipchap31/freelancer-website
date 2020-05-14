import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
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

    Input,
    Slider
} from 'antd';
import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';

/** 
    * @module QuoteHome 
    * 
    */
function QuoteProjectForm(props) {
    const {
        quoteState,
        servicesState,
        handleQuoteChange,
        history } = props;
    const { Title } = Typography;
    const [color, setColor] = useState("#EEEE")
    const layout = { labelCol: { span: 24 } }
    const [visibleModal, setVisibleModal] = useState(false);
    const [colorTarget, setColorTarget] = useState(0)

    const handleColorChange = (color, event) => setColor(color.hex);

    const onPickColor = () => {
        let colorMutation = [...quoteState.colors]
        colorMutation.splice(colorTarget, 1, color)

        handleQuoteChange({ colors: colorMutation });
        setVisibleModal(false)
    }
    const onColorDelete = i => {
        // removes the color from the color copy via index
        // the copy then becomes the new color array
        let colorMutation = [...quoteState.colors];
        colorMutation.splice(i, 1, '#EEEE');
        handleQuoteChange({ colors: colorMutation })
    }
    const [state, setState] = useState({
        description: '',
        colors: []
    })
    const onClickNext = () => {
        handleQuoteChange({ description: state.description, current: 1 })
        history.push('/get-quote/deadline');

    }


    const ColorPick = props => {
        if (props.color !== '#EEEE') {
            return (
                <Popconfirm
                    title="Are you sure delete this color?"
                    okText="Yes"
                    onConfirm={() => onColorDelete(props.i)}
                    key={props.i}
                >
                    <div
                        className='color-circle'
                        style={{ backgroundColor: quoteState.colors[props.i] }} >
                    </div>
                </Popconfirm>
            )
        }
        return (
            <div
                onClick={() => {
                    setVisibleModal(!visibleModal);
                    setColorTarget(props.i)
                }
                }
                className='color-circle'
                style={{ backgroundColor: quoteState.colors[props.i] }} >
                <PlusCircleOutlined />

            </div>
        )
    }
    const marks = { 1: 'One', 2: 'Two', 3: 'Three' }


    return (
        <>
            <Form {...layout}>
                <Row justify='center'>
                    <Col md={15}>

                        <Typography>
                            <Title level={1}>Project Details</Title>
                        </Typography>



                        <Row justify='space-between'>
                            <Col md={11}>
                                <Form.Item label="Project type">
                                    <Select
                                        onChange={value => handleQuoteChange({
                                            project_type: value,
                                            width: quoteState.default_width[value],
                                            height: quoteState.default_height[value]
                                        })}
                                        value={quoteState.project_type}>
                                        {servicesState.map((x, i) =>
                                            <Select.Option key={`services${i}`} value={x.name}>{x.name}</Select.Option>
                                        )}

                                    </Select>
                                </Form.Item>


                                <Form.Item label="Select colors">
                                    <Row>
                                        {quoteState.colors.map((o, i) => <ColorPick key={'color' + i} color={o} i={i} />)}
                                    </Row>

                                </Form.Item>
                            </Col>

                            <Col md={11}>
                                <Form.Item label='How many concepts do you want?'>
                                    <Slider
                                        min={1}
                                        marks={marks}
                                        onAfterChange={value => handleQuoteChange({
                                            concept_amount: value
                                        })}
                                        defaultValue={quoteState.concept_amount}
                                        max={3} />

                                </Form.Item>

                                <Form.Item label="Project size (width x height)" >
                                    <InputNumber
                                        onChange={value => handleQuoteChange({ width: value })}
                                        value={quoteState.width}
                                        parser={value => value.replace('px', '')}
                                        formatter={value => `${value}px`} />

                                    <span> x </span>

                                    <InputNumber
                                        onChange={value => handleQuoteChange({ height: value })}
                                        value={quoteState.height}
                                        parser={value => value.replace('px', '')}
                                        formatter={value => `${value}px`} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label='Description'>
                            <Input.TextArea
                                value={state.description}
                                rows={8}
                                onChange={e => setState({ ...state, description: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={() => onClickNext()} type="primary">
                                Next
    </Button>
                        </Form.Item>


                    </Col>
                </Row>








            </Form>

            <Modal
                onCancel={() => setVisibleModal(false)}
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
        quoteState: state.quoteReducer,
        servicesState: state.servicesReducer
    }
}

export default connect(mapStateToProps, actions)(withRouter(QuoteProjectForm));