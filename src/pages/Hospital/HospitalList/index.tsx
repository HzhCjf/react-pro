import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Table } from 'antd'
import { SearchOutlined } from "@ant-design/icons";
import { reqCityOrDistrict, reqHospitalListInfo, typeHosList, typeProvinceList, typeReqHosInfoParams,reqUpdateStatus } from '@/api/hospitalList';
import { typeHosListItem, reqProvinceList } from '@/api/hospitalList';
import { useNavigate } from 'react-router-dom';

export default function HospitalList() {
  const navigate = useNavigate()

  // 初始化form实例
  const [form] = Form.useForm()

  const { Option } = Select
  // 数据1:获取当前页
  const [page, setPage] = useState(1)

  // 数据2:获取每页条数
  const [limit, setLimit] = useState(5)

  // 数据3:表格的分页列表数据
  const [hospitalList, setHospitalList] = useState<typeHosList>([])

  // 数据4:获取总条数
  const [total, setTotal] = useState(0);

  // 数据5:省份列表
  const [provinceList, setProvinceList] = useState<typeProvinceList>([])

  // 数据6:市列表
  const [cityList, setCityList] = useState<typeProvinceList>([])

  // 数据7:区县列表
  const [districtList, setDistrictList] = useState<typeProvinceList>([])

  // 数据8:医院类型列表
  const [hospitalType, setHospitalType] = useState<typeProvinceList>([])

  // 数据9:loading
  const [loading,setLoading] = useState(false)

  // 数据10:
  const [searchParams,setSearchParams] = useState<typeReqHosInfoParams>({})


  // 方法0:获取医院列表
  const getHosListInfo = async () => {
    setLoading(true)
    const result = await reqHospitalListInfo(page, limit,searchParams);
    setLoading(false)
    // 设置医院列表数据
    setHospitalList(result.content)

    // 设置列表总条数
    setTotal(result.totalElements)
  }

  // 副作用1:获取医院列表
  useEffect(() => {
    getHosListInfo()
  }, [page,limit,searchParams])

  // 副作用2:获取省份列表
  useEffect(() => {
    const getProvinceList = async () => {
      const result = await reqProvinceList();
      setProvinceList(result)
    };
    getProvinceList()
  },[])

  // 副作用3:获取医院类型
  useEffect(() => {
    const getHospitalType = async () => {
      const result = await reqCityOrDistrict('10000')
      setHospitalType(result)
    }
    getHospitalType()
  },[])

  // 方法1:选择省份的事件回调函数
  const provinceChange = async (value: string) => {
    // 选择完省份之后,清空后面市和区县的表单
    form.setFieldsValue({ cityCode: null, districtCode: null })

    // Select组件上的onChange事件收集的就是当前Select的值
    // 发送城市列表请求
    const result = await reqCityOrDistrict(value)
    setCityList(result)

    // 选择完省份之后,需要把区县清空
    setDistrictList([])
  }

  // 方法2:选择市请求对应的区县
  const cityChange = async (value: string) => {
    // 选择完市之后,清空后边区县的表单
    form.setFieldsValue({ districtCode: null })

    // 发送区县列表请求
    const result = await reqCityOrDistrict(value)
    setDistrictList(result)
  }

  // 方法3:根据收集的数据查询医院
  const queryHospital = (value:typeReqHosInfoParams)=>{
    setSearchParams(value)
    setPage(1)
  }

  // 方法4:清空form
  const resetform = ()=>{
    form.resetFields()
    
    setSearchParams({})
    // 恢复页码
    setPage(1)
  }

  // 方法5:页码的回调函数
  const pageChange = (page:number,limit:number)=>{
    setPage(page);
    setLimit(limit)
  }

  // 方法6:修改状态
  const changeStatus = (id:string,status:number)=>{
    return async()=>{
      await reqUpdateStatus(id,status === 0 ? 1 : 0)

      // 重新发送数据列表请求
      getHosListInfo()
    }
  }

  // 表格的列选项
  const columns = [
    {
      title: '序号',
      render(_: any, __: any, index: number) {
        return index + 1
      }
    },
    {
      title: '医院logo',
      dataIndex: 'logoData',
      // 如果当前配置只有render,则render的第一个参数是整行数据
      // 如果render+dataIndex,则render的第一个参数是dataIndex的数据
      render(data: string) {
        return <img width="100" src={"data:image/*;base64," + data} />;
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
        return status === 0 ? '未上线' : '已上线'
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
            <Button type="primary" style={{ marginRight: "20px" }} onClick={()=>{
              navigate(`/syt/hospital/hospitalDetail/${row.id}`)
            }}>
              查看
            </Button>
            <Button type="primary" style={{ marginRight: "20px" }} onClick={()=>{
              navigate(`/syt/hospital/hospitalSchedule/${row.hoscode}`)
            }}>
              排班
            </Button>
            <Button type="primary" onClick={changeStatus(row.id,row.status)}>{row.status === 1 ? '下线' : '上线'}</Button>
          </div>
        )
      }
    }
  ]
  return (
    <div>
      <Form layout='inline' form={form} onFinish={queryHospital}>
        <Form.Item style={{ width: '200px', marginBottom: '20px' }} name='provinceCode' className='item'>
          <Select placeholder='请选择省' onChange={provinceChange}>
            {provinceList.map((province) => {
              return (
                <Option value={province.value} key={province.id}>{province.name}</Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item style={{ width: '200px', marginBottom: '20px' }} name='cityCode'>
          <Select placeholder='请选择市' onChange={cityChange}>
            {cityList.map((city) => {
              return (
                <Option value={city.value} key={city.id}>{city.name}</Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item style={{ width: '200px', marginBottom: '20px' }} name='districtCode'>
          <Select placeholder='请选择区/县'>
            {districtList.map((district) => {
              return (
                <Option value={district.value} key={district.id}>{district.name}</Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item style={{ width: '200px', marginBottom: '20px' }} name='hosname'>
          <Input placeholder='医院名称' />
        </Form.Item>

        <Form.Item style={{ width: '200px', marginBottom: '20px' }} name='hoscode'>
          <Input placeholder='医院编号' />
        </Form.Item>

        <Form.Item style={{ width: '200px', marginBottom: '20px' }} name='hostype'>
          <Select placeholder='医院类型'>
            {hospitalType.map((hospital) => {
              return (
                <Option value={hospital.value} key={hospital.id}>{hospital.name}</Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item style={{ width: '200px', marginBottom: '20px' }} name='status'>
          <Select placeholder='医院状态'>
            <Option value={0}>未上线</Option>
            <Option value={1}>已上线</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type='primary' icon={<SearchOutlined />} style={{ marginRight: '20px' }} htmlType='submit'>查询</Button>
          <Button onClick={resetform}>清空</Button>
        </Form.Item>
      </Form>

      <Table columns={columns} dataSource={hospitalList} bordered
        rowKey={(row) => row.id}
        loading={loading}
        pagination={{
          // 当前页
          current: page,
          // 每页条数
          pageSize: limit,
          // 指定每页可以显示多少条
          pageSizeOptions: [3, 5, 7, 9],
          // 是否可以快速跳转至某页
          showQuickJumper: true,
          // 是否展示pageSize切换器
          showSizeChanger: true,
          // 数据总条数
          total: total,
          onChange:pageChange
        }} style={{ marginTop: '20px' }}>

      </Table>
    </div>
  )
}
