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
import TextArea from 'antd/lib/input/TextArea';

/** 
    * @module QuoteHome 
    * 
    */
function QuoteProjectForm(props) {
    const {
        quoteState,
        profileState,
        servicesState,
        handleQuoteChange,
        history } = props;
    const { Title } = Typography;
    const [color, setColor] = useState("#EEEE")
    const layout = { labelCol: { span: 24 } }
    const [visibleModal, setVisibleModal] = useState(false);
    const [colorTarget, setColorTarget] = useState(0)

    const handleColorChange = (color, event) => setColor(color.hex);
    const [state, setState] = useState({
        description: '',
        colors: ['#EEEE', '#EEEE', '#EEEE', '#EEEE', '#EEEE'],
        width: quoteState.width,
        height: quoteState.height

    })
    const onPickColor = () => {
        let colorMutation = [...state.colors]
        colorMutation.splice(colorTarget, 1, color)

        setState({ colors: colorMutation });
        setVisibleModal(false)
    }
    const onColorDelete = i => {
        // removes the color from the color copy via index
        // the copy then becomes the new color array
        let colorMutation = [...state.colors];
        colorMutation.splice(i, 1, '#EEEE');
        setState({ colors: colorMutation })
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
                        style={{ backgroundColor: state.colors[props.i] }} >
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
                style={{ backgroundColor: state.colors[props.i] }} >
                <PlusCircleOutlined />

            </div>
        )
    }
    const marks = { 1: '1', 2: '2', 3: '3' }

    const onFinish = values => {

        const data = {
            ...values,
            ...state
        }


        handleQuoteChange({ ...data, current: 1 })
        history.push('/get-quote/deadline');

    }

    return (
        <>
            <Form
                initialValues={{
                    ['project_type']: servicesState.length > 0 ? servicesState[0].name : null,
                    ['concept_amount']: 1
                }}
                onFinish={onFinish}
                {...layout}>
                <Row justify='center'>
                    <Col md={16}>

                        <Typography>
                            <Title level={1}>Project Details</Title>
                        </Typography>


                        <Row justify='space-between'>
                            <Col md={11}>
                                <Form.Item name='project_type' label="Project type">
                                    <Select

                                        value={state.project_type}>
                                        {servicesState.map((x, i) =>
                                            <Select.Option key={`services${i}`} value={x.name}>{x.name}</Select.Option>
                                        )}

                                    </Select>
                                </Form.Item>


                                <Form.Item
                                    name='colors'
                                    label="Select colors">
                                    <Row>
                                        {state.colors.map((o, i) => <ColorPick
                                            key={'color' + i}
                                            color={o} i={i} />)}
                                    </Row>

                                </Form.Item>
                            </Col>

                            <Col md={11}>
                                <Form.Item
                                    name="concept_amount"
                                    label='How many concepts do you want?'>
                                    <Slider
                                        min={1}
                                        marks={marks}
                                        max={3} />

                                </Form.Item>

                                <Form.Item

                                    label="Project size (width x height)" >
                                    <InputNumber
                                        value={state.width}
                                        onChange={
                                            value => setState({ ...state, width: value })
                                        }
                                        parser={value => value.replace('px', '')}
                                        formatter={value => `${value}px`} />

                                    <span> x </span>

                                    <InputNumber
                                        onChange={
                                            value => setState({ ...state, height: value })
                                        }
                                        value={state.height}
                                        parser={value => value.replace('px', '')}
                                        formatter={value => `${value}px`} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            name='description'
                            label='Description'>
                            <TextArea

                                rows={8}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit' type="primary">
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