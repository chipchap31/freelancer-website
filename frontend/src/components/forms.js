import React, { useState } from 'react'
import { Form, Input, Select } from 'antd'

function WaitingListForm(props) {

    const [email, setEmail] = useState('');
    const [type, setTtype] = useState('');
    const layout = { labelCol: { span: 24 } }
    return (
        <Form {...layout}>
            <Form.Item label="Project type">
                <Select
                    onChange={setTtype}
                    value={type}>
                    <Select.Option value="icon">Icon</Select.Option>
                    <Select.Option value="logo">Logo</Select.Option>
                    <Select.Option value="poster">Poster</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label='Email Address'>
                <Input value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Item>
        </Form>
    )
}




export {
    WaitingListForm,

}