import { requestHos, requestAdd } from "@/utils/http";

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
  bookingRule: {
    cycle: number;
    releaseTime: string;
    stopTime: string;
    quitDay: number;
    quitTime: string;
    rule: string[];
  };
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

//请求省份列表每一项的值类型
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

//请求省份列表的类型
export type typeProvinceList = typeProvinceItem[];

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

//2. 请求所有的省份
export const reqProvinceList = () => {
  return requestAdd.get<any, typeProvinceList>(
    `/admin/cmn/dict/findByDictCode/province`
  );
};

//3. 请求所有 市 或者 区县列表
export const reqCityOrDistrict = (parentId: string) => {
  return requestAdd.get<any, typeProvinceList>(
    `/admin/cmn/dict/findByParentId/${parentId}`
  );
};

//4. 修改上下线状态
export const reqUpdateStatus = (id: string, status: number) => {
  return requestHos.get<any, null>(
    `/admin/hosp/hospital/updateStatus/${id}/${status}`
  );
};
