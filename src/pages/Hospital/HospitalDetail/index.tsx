import { Button, Descriptions } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function HospitalDetail() {
  const navigate = useNavigate()

  const {id} = useParams()

  return (
    <div>
      <Descriptions title='基本信息' bordered column={2}>
          <Descriptions.Item label='医院名称'>xxx</Descriptions.Item>
          <Descriptions.Item label='医院logo'>xxx</Descriptions.Item>
          <Descriptions.Item label='医院编码'>xxx</Descriptions.Item>
          <Descriptions.Item label='医院地址'>xxx</Descriptions.Item>
          <Descriptions.Item label='坐车路线' span={2}>xxx</Descriptions.Item>
          <Descriptions.Item label='医院简介' span={2}>xxx</Descriptions.Item>
      </Descriptions>

      <Descriptions title='预约规则信息' bordered column={2} style={{marginTop:'30px'}}>
          <Descriptions.Item label='预约周期'>xxx</Descriptions.Item>
          <Descriptions.Item label='放号时间'>xxx</Descriptions.Item>
          <Descriptions.Item label='停挂时间'>xxx</Descriptions.Item>
          <Descriptions.Item label='退号时间'>xxx</Descriptions.Item>
          <Descriptions.Item label='预约规则' span={2}>xxx</Descriptions.Item>
      </Descriptions>

      <Button style={{marginTop:'30px'}} onClick={()=>{
        navigate(`/syt/hospital/hospitalList`)
      }}>返回</Button>
    </div>
  )
}
