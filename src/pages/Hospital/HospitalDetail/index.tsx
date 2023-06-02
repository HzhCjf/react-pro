import { Button, Descriptions } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {reqHosDetail, tpyeHosDetail} from '@api/hospitalList'

export default function HospitalDetail() {
  const navigate = useNavigate()

  const {id} = useParams()

  // 数据1:医院详情
  const [hospitalDetail,setHospitalDetail] = useState<tpyeHosDetail | null>(null)


  // 副作用1:请求医院数据详情
  useEffect(()=>{
    const getHosDetail = async ()=>{
      const result = await reqHosDetail(id as string)
      setHospitalDetail(result)
    };
    getHosDetail()
  },[])

  return (
    <div>
      <Descriptions title='基本信息' bordered column={2}>
          <Descriptions.Item label='医院名称'>{(hospitalDetail as tpyeHosDetail)?.hospital.hosname}</Descriptions.Item>
          <Descriptions.Item label='医院logo'> {hospitalDetail && (
            <img
              width="100"
              src={`data:image/*;base64,${
                (hospitalDetail as tpyeHosDetail)?.hospital.logoData
              }`}
              alt=""
            />
          )}</Descriptions.Item>
          <Descriptions.Item label='医院编码'>{(hospitalDetail as tpyeHosDetail)?.hospital.hoscode}</Descriptions.Item>
          <Descriptions.Item label='医院地址'>{(hospitalDetail as tpyeHosDetail)?.hospital.param.fullAddress}</Descriptions.Item>
          <Descriptions.Item label='坐车路线' span={2}>{(hospitalDetail as tpyeHosDetail)?.hospital.route}</Descriptions.Item>
          <Descriptions.Item label='医院简介' span={2}>{(hospitalDetail as tpyeHosDetail)?.hospital.intro}</Descriptions.Item>
      </Descriptions>

      <Descriptions title='预约规则信息' bordered column={2} style={{marginTop:'30px'}}>
          <Descriptions.Item label='预约周期'>{(hospitalDetail as tpyeHosDetail)?.bookingRule.cycle}</Descriptions.Item>
          <Descriptions.Item label='放号时间'>{(hospitalDetail as tpyeHosDetail)?.bookingRule.releaseTime}</Descriptions.Item>
          <Descriptions.Item label='停挂时间'>{(hospitalDetail as tpyeHosDetail)?.bookingRule.stopTime}</Descriptions.Item>
          <Descriptions.Item label='退号时间'>{(hospitalDetail as tpyeHosDetail)?.bookingRule.quitTime}</Descriptions.Item>
          <Descriptions.Item label='预约规则' span={2}>{(hospitalDetail as tpyeHosDetail)?.bookingRule.rule.map((item)=>{
            return <p key={item}>{item}</p>
          })}</Descriptions.Item>
      </Descriptions>

      <Button style={{marginTop:'30px'}} onClick={()=>{
        navigate(`/syt/hospital/hospitalList`)
      }}>返回</Button>
    </div>
  )
}
