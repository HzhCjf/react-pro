import Hospital from "@/pages/Hospital";
import { requestHos } from "@/utils/http";

//1. 请求分页列表函数 接收的参数类型
export interface typeReqHosInfoParams {
  page: number;
  limit: number;
  hosname: string;
  hoscode: string;
}

//2. 医院列表的每一项的类型
export interface typeHosListItem {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: object;
  hosname: string;
  hoscode: string;
  apiUrl: string;
  signKey: string;
  contactsName: string;
  contactsPhone: string;
  status: number;
}

//3. 医院列表的类型
export type typeHosList = typeHosListItem[];

//
export interface typeHosListInfo {
  //数据列表
  records: typeHosList;
  //数据总条数
  total: number;
  //当前页条数
  size: number;
  //当前页
  current: number;
  orders: any[];
  hitCount: boolean;
  searchCount: boolean;
  //总页数
  pages: number;
}

// 5.新增医院数据的类型
export interface typeAddHosParams{
  hosname:string,
  hoscode:string,
  apiUrl:string,
  contactsName:string,
  contactsPhone:string,
  id?:number
}

//1. 发送医院列表的分页列表请求
export const reqHospitalListInfo = ({
  page = 1,
  limit = 3,
  hosname = "",
  hoscode = "",
}: typeReqHosInfoParams) => {
  return requestHos.get<any,typeHosListInfo>(`/admin/hosp/hospitalSet/${page}/${limit}`, {
    params: {
      hosname,
      hoscode,
    },
  });
};


// 2.发送新增医院的请求
export const reqAddHospital = (HosDetail:typeAddHosParams)=>{
  return requestHos.post<any,null>(`/admin/hosp/hospitalSet/save`,HosDetail)
}


// 3.根据id获取当前医院的详细数据
export const reqHosDetailById = (id:number)=>{
  return requestHos.get<any,typeHosListItem>(
    `/admin/hosp/hospitalSet/get/${id}`
  )
}


// 4.修改医院的请求
export const reqUpdateHos = (hosDetail:typeAddHosParams)=>{
  return requestHos.put<any,null>(`/admin/hosp/hospitalSet/update`,hosDetail)
}