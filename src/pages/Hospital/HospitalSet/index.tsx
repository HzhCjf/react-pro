import React, { useEffect, useState } from "react";
import { Button, Form, Input, Table, message } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { reqHospitalListInfo, typeHosList, typeReqHosInfoParams } from "@/api/hospitalSet";
import Search from "antd/es/transfer/search";
import { typeFormSearchData } from "./tpyes";

export default function HospitalSet() {
  // 获取form实例
  const [form ]= Form.useForm()

  // 数据1：请求数据列表参数数据
  const [requestParams,setRequestParams] = useState<typeReqHosInfoParams>({
    page:1,
    limit:3,
    hosname:'',
    hoscode:''
  });

  // 数据2：医院列表的数据
  const [hospitalList,setHospitalList] = useState<typeHosList>([])


  // 数据3：表格的loading状态
  const [loading,setLoading] = useState(false)

  // 数据4：表格数据的总条数
  const [total,setTotal] = useState(0)

  // 副作用1：初始化请求列表数据
  useEffect(()=>{
    const getHospitalListInfo = async ()=>{
      // 只要马上开始发送请求，则设置loading为true
      setLoading(true)
      try{
        const result = await reqHospitalListInfo(requestParams)

        // 只要请求发送完成，则把loading变成false
        setLoading(false)
  
        // 把医院列表设置给状态
        setHospitalList(result.records)

        // 把数据总条数设置给状态
        setTotal(result.total)
      }catch(e:any){
        message.error(`请求医院列表数据${e.message}`)
        setLoading(false)
      }
     
    }
    getHospitalListInfo()
  },[requestParams])
  
  // 方法1：页码改变的事件回调函数
  const pageChange = (page:number,limit:number) =>{
    // 拿到参数的新页码和新的pageSize
    setRequestParams({...requestParams,page,limit})
  }

  // 方法2:表单查询的回调函数
  const searchFinsh = (value:typeFormSearchData)=>{
    // onFinish事件函数默认接收一个参数,就是表单收集的值
    console.log(value);
    //可以通过useForm Hook获取form表单的实例,通过实例的getFieldsValue方法获取form的收集的数据
    // console.log(form.getFieldsValue());

    //改变保存请求参数的 状态，从而重新发送请求
    setRequestParams({...requestParams,...value})
  }

  //表格的列的设置
  const columns = [
    {
      title: "序号",
      render(_: any, __: any, index: number) {
        return index + 1;
      },
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
    },{
      title: "更新时间",
      dataIndex: "updateTime",
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
    },
    {
      title: "签名",
      dataIndex: "signKey",
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
    },
    {
      title: "联系人电话",
      dataIndex: "contactsPhone",
    },
    {
      title: "操作",
      render() {
        return (
          <div>
            <Button icon={<EditOutlined />} type="primary"></Button>
            <Button icon={<DeleteOutlined />} type="primary" danger></Button>
          </div>
        );
      },
      fixed: "right" as "right",
    },
  ];

  return (
    <div>
      {/*                    表单实例       获取表单收集的值 */}
      <Form layout="inline" form={form} onFinish={searchFinsh} >
        <Form.Item name={'hosname'}>
          <Input placeholder="医院名称" />
        </Form.Item>
        <Form.Item name={'hoscode'}>
          <Input placeholder="医院编号" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
            查询
          </Button>
        </Form.Item>
        <Form.Item>
          <Button>清空</Button>
        </Form.Item>
      </Form>
      <div style={{ margin: "20px 0" }}>
        <Button type="primary" style={{ marginRight: "20px" }}>
          添加
        </Button>
        <Button type="primary" danger>
          删除
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={hospitalList}
        bordered
        rowSelection={{}}
        rowKey={(row) => {
          return row.id;
        }}
        scroll={{ x: 3000 }}
        pagination={{
          // 当前页
          current:requestParams.page,
          // 每页条数
          pageSize:requestParams.limit,
          // 指定每页可以显示多少条
          pageSizeOptions:[3,5,7,9],
          // 是否可以快速跳转至某页
          showQuickJumper:true,
          // 是否展示pageSize切换器
          showSizeChanger:true,
          // 数据总条数
          total:total,
          onChange:pageChange
        }}
        loading={loading}
        
      ></Table>
    </div>
  );
}
