import {requestHos} from '@/utils/http'
import { type } from 'os'


// 1.请求分页列表函数接收的参数类型
export interface typeReqHosInfoParams{
    page:number,
    limit:number,
    hosname:string,
    hoscode:string
}

// 2.医院列表的每一项的类型
export interface typeHosListItem{
    id:number,
    createTime:string,
    updateTime:string,
    isDeleted:number,
    param:object,
    hosname:string,
    hoscode:string,
    apiUrl:string,
    signKey:string,
    contactsName:string,
    contactsPhone:string,
    status:number
}


// 3.医院列表的类型
export type typeHosList = typeHosListItem[]



export interface typeHosListInfo{
    // 数据列表
    records:typeHosList,
    // 数据总条数
    total:number,
    // 当前页条数
    size:number,
    // 当前页
    current:number,
    orders:any[],
    hitCount:boolean,
    searchCount:boolean,
    pages:number
}


// 1.发送医院列表的分页列表请求
export const reqHospitalListInfo = ({
    page = 1,
    limit = 3,
    hosname = '',
    hoscode = ''

}:typeReqHosInfoParams)=>{
    return requestHos.get<any,typeHosListInfo>(`/admin/hosp/hospitalSet/${page}/${limit}`,{
        params:{
            hosname,
            hoscode
        }
    })
}