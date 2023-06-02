import { requestHos, requestAdd } from '@/utils/http';

//请求医院列表信息 的 参数类型
export interface typeReqHosInfoParams {
  hoscode?: string;
  hosname?: string;
  hostype?: string;
  provinceCode?: string;
  cityCode?: string;
  districtCode?: string;
  status?: number;
}

//医院列表的每一项的类型
export interface typeHosListItem {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    hostypeString: string;
    fullAddress: string;
  };
  hoscode: string;
  hosname: string;
  hostype: string;
  provinceCode: string;
  cityCode: string;
  districtCode: string;
  address: string;
  logoData: string;
  intro: string;
  route: string;
  status: number;
  bookingRule: tpyeHosDetailBooking | null;
}

//医院列表的类型
export type typeHosList = typeHosListItem[];

//请求医院列表信息的返回值类型
export interface typeHosListInfo {
  content: typeHosList;
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

// 请求省份列表每一项的值类型
export interface typeProvinceItem {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: object;
  parentId: number;
  name: string;
  value: string;
  dictCode: null;
  hasChildren: boolean;
}

// 请求省份列表的类型
export type typeProvinceList = typeProvinceItem[];

// 请求医院详情规则的类型
export interface tpyeHosDetailBooking {
  cycle: number;
  releaseTime: string;
  stopTime: string;
  quitDay: number;
  quitTime: string;
  rule: string[];
}

// 请求医院详情的返回值类型
export interface tpyeHosDetail {
  bookingRule: tpyeHosDetailBooking;
  hospital: typeHosListItem;
}

// 请求科室每一项的类型
export interface typeHosScheduleItem {
  depcode: string;
  depname: string;
  children: typeHosScheduleList;
  disabled :boolean;
}

// 科室返回类型
export type typeHosScheduleList = typeHosScheduleItem[];

// 科室
export interface typeBookingScheduleItem {
  workDate: string;
  workDateMd: null;
  dayOfWeek: string;
  docCount: number;
  reservedNumber: number;
  availableNumber: number;
  status: null;
}

export type typeBookingScheduleList = typeBookingScheduleItem[];

// 科室排班时间类型
export interface typeHosScheduleWorkDate {
  total: number;
  bookingScheduleList: typeBookingScheduleList;
  baseMap: {
    hosname: string;
  };
}

// 科室排班详情每一项的类型类型
export interface typeScheduleDetailItem {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    dayOfWeek: string;
    depname: string;
    hosname: string;
  };
  hoscode: string;
  depcode: string;
  title: string;
  docname: string;
  skill: string;
  workDate: string;
  workTime: number;
  reservedNumber: number;
  availableNumber: number;
  amount: number;
  status: number;
  hosScheduleId: string;
}

// 科室排班详情列表类型
export type typeScheduleDetailList = typeBookingScheduleItem[]

//1. 请求医院列表
export const reqHospitalListInfo = (
  page: number = 1,
  limit: number = 3,
  params?: typeReqHosInfoParams
) => {
  return requestHos.get<any, typeHosListInfo>(
    `/admin/hosp/hospital/${page}/${limit}`,
    {
      params,
    }
  );
};

// 2.请求所有的省份
export const reqProvinceList = () => {
  return requestAdd.get<any, typeProvinceList>(
    `/admin/cmn/dict/findByDictCode/province`
  );
};

// 3.请求所有市或者区县列表
export const reqCityOrDistrict = (parentId: string) => {
  return requestAdd.get<any, typeProvinceList>(
    `/admin/cmn/dict/findByParentId/${parentId}`
  );
};

// 4.修改上下线状态
export const reqUpdateStatus = (id: string, status: number) => {
  return requestHos.get<any, null>(
    `/admin/hosp/hospital/updateStatus/${id}/${status}`
  );
};

// 5.请求医院详情
export const reqHosDetail = (id: string) => {
  return requestHos.get<any, tpyeHosDetail>(`/admin/hosp/hospital/show/${id}`);
};

// 6.请求科室规则
export const reqHosSchedule = (hoscode: string) => {
  return requestHos.get<any, typeHosScheduleList>(
    `/admin/hosp/department/${hoscode}`
  );
};

// 7.请求科室排班时间
export const reqHosScheduleWorkDate = (
  page: number,
  limit: number,
  hoscode: string,
  depcode: string
) => {
  return requestHos.get<any, typeHosScheduleWorkDate>(
    `/admin/hosp/schedule/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`
  );
};


// 8.请求科室排班详情列表
export const reqHosScheduleDetailList = (hoscode:string,depcode:string,workDate:string)=>{
  return requestHos.get<any,typeScheduleDetailList>(`/admin/hosp/schedule/findScheduleList/${hoscode}/${depcode}/${workDate}`)
}