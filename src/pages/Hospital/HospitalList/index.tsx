import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Table } from "antd";
import { SearchOutlined } from '@ant-design/icons'
import { reqCityOrDistrict, reqHospitalListInfo, reqProvinceList, typeHosList, typeHosListItem, typeProvinceList } from '@api/hospitalList'

export default function HospitalList() {
  // 初始化form实例
  const [form] = Form.useForm()

  // 数据1:获取分页列表当前页
  const [page, setPage] = useState(1)

  // 数据2:分页列表每页条数
  const [limit, setLimit] = useState(5)

  // 数据3:表格的分页列表数据-医院列表
  const [hospitalList, setHospitalList] = useState<typeHosList>([])

  // 数据4:分页列表的数据的总条数
  const [total, setTotal] = useState(0)

  // 数据5:省份列表
  const [provinceList, setProvinceList] = useState<typeProvinceList>([])

  // 数据6:市列表
  const [cityList, setCityList] = useState<typeProvinceList>([])

  //数据7:区县列表
  const [districtList, setDistrictList] = useState<typeProvinceList>([])

  // 数据8:医院类型列表
  const [hospitalType,setHospitalType] = useState<typeProvinceList>([])

  // 方法0:获取医院列表
  const getHosListInfo = async () => {
    const result = await reqHospitalListInfo(page, limit)

    setHospitalList(result.content)
  };
  
  // 副作用1:获取医院列表
  useEffect(() => {
    getHosListInfo()
  }, [])

  // 副作用2:获取省份列表
  useEffect(() => {
    const getProvinceList = async () => {
     
      const result = await reqProvinceList()
      
      setProvinceList(result)
    };
    getProvinceList()
  }, [])

  // 副作用3:获取医院类型
  useEffect(()=>{
    const getHospitalType = async()=>{
        const result = await reqCityOrDistrict('10000')
        setHospitalType(result)
    }
    getHospitalType()
  },[])

  // 方法1:选择省份的事件回调函数
  const provinceChange = async (value: string) => {
    form.setFieldsValue({cityCode:null,districtCode:null})
    const result = await reqCityOrDistrict(value)
    setDistrictList([])
    setCityList(result)
  }

  // 方法2:选择市的事件回调
  const cityChange = async (value: string) => {
    form.setFieldsValue({districtCode:null})
    const result = await reqCityOrDistrict(value)
    setDistrictList(result)
  }

  const column = [
    {
      title: '序号',
      render(_: any, __: any, index: number) {
        return index + 1
      }
    },
    {
      title: '医院logo',
      dataIndex: 'logoData',
      render(data: string) {
        return <img width='100' src={'data:image/*;base64,' + data} />
      }
    },
    {
      title: '医院名称',
      dataIndex: 'hosname'
    },
    {
      title: '等级',
      dataIndex: 'param',
      render(data: any) {
        return data.hostypeString
      }
    },
    {
      title: '详细地址',
      dataIndex: 'param',
      render(data: any) {
        return data.fullAddress
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(status: number) {
        return status === 0 ? "未上线" : '已上线'
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '操作',
      width: 270,
      render(row: typeHosListItem) {
        return (
          <div>
            <Button type='primary' style={{ marginRight: '20px' }}>查看</Button>
            <Button type='primary' style={{ marginRight: '20px' }}>排班</Button>
            <Button type='primary'>下线</Button>
          </div>
        )
      }
    },
  ]
  return <div>
    <Form layout="inline" form={form}>
      <Form.Item style={{ width: '200px', marginBottom: '20px' }} className="item" name='provinceCode'>
        <Select placeholder='请选择省' onChange={provinceChange}>
          {provinceList.map((province) => {
            return (
              <Select.Option value={province.value} key={province.id}>
                {province.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item style={{ width: '200px', marginBottom: '20px' }} name='cityCode'>
        <Select placeholder='请选择市' onChange={cityChange}>
          {cityList.map((city) => {
            return (
              <Select.Option value={city.value} key={city.id}>
                {city.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item style={{ width: '200px', marginBottom: '20px' }} name='districtCode'>
        <Select placeholder='请选择区县'>
          {districtList.map((district) => {
            return (
              <Select.Option value={district.value} key={district.id}>
                {district.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item style={{ width: '200px', marginBottom: '20px' }} name='hosname'>
        <Input placeholder="医院名称" />
      </Form.Item>
      <Form.Item style={{ width: '200px', marginBottom: '20px' }} name='hoscode'>
        <Input placeholder="医院编号" />
      </Form.Item>
      <Form.Item style={{ width: '200px', marginBottom: '20px' }} name='hostype'>
        <Select placeholder='医院类型'>
          <Select.Option>xxx</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item style={{ width: '200px', marginBottom: '20px' }} name='status'>
        <Select placeholder='医院状态'>
          <Select.Option>xxx</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" icon={<SearchOutlined />} style={{ marginRight: '20px' }}>查询</Button>
        <Button>清空</Button>
      </Form.Item>
    </Form>

    <Table columns={column} dataSource={hospitalList} rowKey={(row) => row.id} bordered pagination={{
      current: page,
      pageSize: limit,
      pageSizeOptions: [3, 5, 7, 9],
      showQuickJumper: true,
      showSizeChanger: true,
      total: total
    }} ></Table>
  </div>
}