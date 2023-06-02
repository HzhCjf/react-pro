import React, { useEffect } from 'react'
import { reqAddHospital, reqHosDetailById, reqUpdateHos } from '@/api/hospitalSet'
import type { typeAddHosParams } from '@api/hospitalSet'
import { Button, Form, Input, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'antd/es/form/Form'

export default function AddOrUptateHospital() {
  // 获取form组件
  const [form] = useForm()

  // 拿到编程式路由导航的方法
  const navigate = useNavigate()

  // 拿到组件接收的路由params传值
  const { id } = useParams()

  // 初始化请求修改医院时的回填数据
  useEffect(() => {
    if (!id) return
    const getHosDetailById = async () => {
      const result = await reqHosDetailById(+id)
      console.log(result);
      form.setFieldsValue(result)
    }
    getHosDetailById()
  },[])

  // 方法1：添加医院,收集表单数据
  const addOrUpdateHos = async (hosDetail: typeAddHosParams) => {
    if (id) {
      try{
        await reqUpdateHos({...hosDetail,id:+id});
        navigate("/syt/hospital/hospitalSet")
        message.success('修改成功')
      }catch(e:any){
        message.error('修改失败,错误信息'+ e.message)
      }
    } else {
      try {
        await reqAddHospital(hosDetail);
        navigate('/syt/hospital/hospitalSet')
        message.success('新增成功')
      } catch (e: any) {
        message.error('新增失败,错误信息' + e.message)
      }
    }


  }

  return (
    <div>
      <Form labelCol={{ span: '2' }} name="" onFinish={addOrUpdateHos} form={form} >
        <Form.Item name="hosname" label="医院名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="hoscode" label="医院编号" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="apiUrl" label="api基础路径" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="contactsName" label="联系人姓名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="contactsPhone" label="联系人电话" rules={[{ required: true }, { pattern: /^1[0-9]{10}$/g, message: '手机号不符合规范' }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ margin: '20px 20px 0 60px' }}>
            {id ? '修改' : '保存'}
          </Button>
          <Button htmlType="button" onClick={() => navigate('/syt/hospital/hospitalSet')}>
            返回
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
