import { Button, Form, Input } from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import React from 'react'
import { Outlet } from 'react-router-dom'
export default function HospitalSet() {
  return (
    <div>
       <Form layout='inline'>
            <Form.Item>
                <Input placeholder='医院名称'/>
            </Form.Item>
            <Form.Item>
                <Input placeholder='医院编号'/>
            </Form.Item>
            <Form.Item>
                <Button type='primary' icon={<SearchOutlined rev={undefined}/>}>查询</Button>
            </Form.Item>
            <Form.Item>
                <Button>清空</Button>
            </Form.Item>
        </Form>
        <div style={{marginTop:'20px'}}>
            <Button type='primary' style={{marginRight:'20px'}}>添加</Button>
            <Button type='primary' danger  disabled>删除</Button>
        </div>
    </div>
  )
}