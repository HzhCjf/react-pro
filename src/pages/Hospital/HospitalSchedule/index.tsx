import { reqHosSchedule, reqHosScheduleDetailList, reqHosScheduleWorkDate, typeBookingScheduleList, typeHosScheduleList, typeScheduleDetailList } from '@/api/hospitalList'
import { Button, Col, Pagination, Row, Table, Tag, Tree } from 'antd'
import React, { Key, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function HospitalSchedule() {
    const navigate = useNavigate()

    // 接收hoscode
    const { hoscode } = useParams()
    // 数据1:科室列表
    const [hosSchedule, setHosSchedule] = useState<typeHosScheduleList>([])
    // 数据2:页码:当前页
    const [page, setPage] = useState(1)
    // 数据3:页码:每页条数
    const [pageSize, setPageSize] = useState(5)
    // 数据4:页码:每页总条数
    const [total, setTotal] = useState(0)
    // 数据5:科室时间
    const [bookingScheduleList, setBookingScheduleList] = useState<typeBookingScheduleList>([])
    // 数据6:保存科室
    const [depCode, setDepCode] = useState('')
    // 数据7:排班详情
    const [scheduleDetail, setScheduleDetail] = useState<typeScheduleDetailList>([])


    // 副作用1:请求科室数据
    useEffect(() => {
        const getHosSchedule = async () => {
            const result = await reqHosSchedule(hoscode as string)
            result.forEach((item) => {
                item.disabled = true;
            })
            setHosSchedule(result)
        }

        getHosSchedule()
    }, [])

    // 方法1:科室时间
    const ScheduleDate = async (SelectedKeys: Key[]) => {
        if (SelectedKeys.length <= 0) return;
        setDepCode(SelectedKeys[0] as string)
        const result = await reqHosScheduleWorkDate(
            page,
            pageSize,
            hoscode as string,
            SelectedKeys[0] as string
        )
        console.log(result);

        setBookingScheduleList(result.bookingScheduleList)
        setTotal(result.total)
    }
    // 方法2:根据页码重新渲染科室时间列表
    const pageChange = async (page: number, pageSize: number) => {
        setPage(page);
        setPageSize(pageSize);
        const result = await reqHosScheduleWorkDate(
            page,
            pageSize,
            hoscode as string,
            depCode
        )
        setBookingScheduleList(result.bookingScheduleList)
    }
    // 方法3:点击时间展示排班详情
    const ScheduleDetail = (workDate: string) => {
        return async () => {
            const result = await reqHosScheduleDetailList(hoscode as string, depCode, workDate)
            setScheduleDetail(result)
        }
    }

    // 表格列数据
    const columns = [
        {
            title: '序号',
            render(_: any, __: any, index: number) {
                return index + 1
            }
        },
        {
            title: '职称',
            dataIndex: 'title'
        },
        {
            title: '号源时间',
            dataIndex: 'workDate'
        },
        {
            title: '可预约数',
            dataIndex: 'reservedNumber'
        },
        {
            title: '剩余预约数',
            dataIndex: 'availableNumber'
        },
        {
            title: '挂号费(元)',
            dataIndex: 'amount'
        },
        {
            title: '擅长技能',
            dataIndex: 'skill'
        },
    ]

    return (
        <div>
            <Row gutter={20} >
                <Col span={4} style={{ height: '400px', border: '1px solid #333', overflow: "auto" }} >
                    <Tree treeData={hosSchedule as any} fieldNames={{ key: 'depcode', title: 'depname' }} defaultExpandedKeys={[hosSchedule[0]?.depcode]} onSelect={ScheduleDate}></Tree>
                </Col>
                <Col span={20}>
                    {
                        bookingScheduleList.length > 0 ?
                            <div>
                                <div>
                                    {bookingScheduleList.map((item) => {
                                        return (
                                            <Tag onClick={ScheduleDetail(item.workDate)} >
                                                <p>{item.workDate} {item.dayOfWeek}</p>
                                                <p>{item.availableNumber}/{item.reservedNumber}</p>
                                            </Tag>
                                        )
                                    })}
                                </div>
                                <Pagination
                                    style={{ margin: '20px 0' }}
                                    current={page}
                                    pageSize={pageSize}
                                    pageSizeOptions={[3, 5, 7, 9]}
                                    showQuickJumper
                                    showSizeChanger
                                    total={total}
                                    onChange={pageChange}
                                ></Pagination>

                                <Table columns={columns} dataSource={scheduleDetail} rowKey={(row) => row.id}></Table>
                            </div>:'暂无数据'
                    }

                </Col>
            </Row>
            <Button onClick={() => {
                navigate(`/syt/hospital/hospitalList`)
            }} style={{marginTop:'20px'}}>返回</Button>
        </div>
    )
}
