import { Button, Form, Input, Layout } from 'antd'
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function AddHospital() {
  // 方法1：添加医院,收集表单数据
  const addHos = (values:any)=>{
    console.log(values);
    
  }

  return (
    <div>
      <Form labelCol={{span:'2'}} name="" onFinish={addHos} >
        <Form.Item name="hosname" label="医院名称" rules={[{required:true}]}>
          <Input />
        </Form.Item>
        <Form.Item name="hoscode" label="医院编号" rules={[{required:true}]}>
          <Input />
        </Form.Item>
        <Form.Item name="apiUrl" label="api基础路径" rules={[{required:true}]}>
          <Input />
        </Form.Item>
        <Form.Item name="contactsName" label="联系人姓名" rules={[{required:true}]}>
          <Input />
        </Form.Item>
        <Form.Item name="contactsPhone" label="联系人电话" rules={[{required:true},{pattern: /^1[0-9]{10}$/g,message:'手机号不符合规范'}]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{margin:'20px 20px 0 60px'}}>
            提交
          </Button>
          <Button htmlType="button" onClick={()=> {}}>
            返回
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
