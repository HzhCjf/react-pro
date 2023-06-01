# 项目
## 文档地址
http://xxpromise.gitee.io/syt-admin-docs/

## 接口地址
http://139.198.34.216:8212/swagger-ui.html

http://139.198.34.216:8201/swagger-ui.html


http://139.198.34.216:8202/swagger-ui.html#/




## 医院列表-表单静态书写
- 在Hospital文件夹里面新建文件夹HospitalList文件夹,然后在HospitalList文件夹里面新建文件index.tsx
    index.tsx:
        * 暴露组件HospitalList 返回表单组件,书写基础布局,如选择的下拉列表,和输入框和按钮,下拉列表选择Select组件,里面的内容用Select.Option组件,Form组件里面要用layout属性来把里面的组件变成行内,
        Form.Item组件可以自主设置样式,查询按钮组件需要用到type属性的样式,可以使用primary值,以及icon属性来放入图标,建议使用SearchOutlined图标组件,来自@ant-design/icons,其余样式自定

## 医院列表-表格的静态书写*&&&表格数据的请求api封装
- 在api文件夹里面新建文件hospitalList.ts文件
    hospital.ts:
        * 引入ajax请求requestHos(封装) 使用测试接口获取到医院列表的参数(typeReqHosInfoParams ),医院列表的每一项的类型(typeHosListItem ),医院列表的类型是有每一项组成的数组(typeHosList ),还有请求医院列表信息的返回值类型(typeHosListInfo )

        开始请求医院列表:
         暴露请求reqHospitalListInfo,设置传入的值,以及类型和默认值,page,limit,params是可选的,类型是医院列表信息类型,然后开始返回请求,请求的类型为any和返回的类型,请求的第一个参数为接口地址,第二个参数为params

- 打开HospitalList里面的文件
    可以先在组件里面写好要请求的表格列表标题:columns,然后给省份的类名:item
    table组件里面要给列表的属性和样式,已经可以先给一个页码属性:pagination



## 医院列表-列表渲染

- 打开HospitalList里面的文件,前面已经将columns里面的title填好,现在开始填入dataIndex或者有的是render方法组成的.  
- 数据1:获取分页列表当前页
- 数据2:分页列表每页条数
- 数据3:表格的分页列表数据-医院列表(hospitalList)
- 数据4:分页列表的数据的总条数
- 现在可以写副作用1:useEffect 定义一个请求的方法getHosListInfo,用async使其为同步操作,用一个变量接收已经封装在hospital文件里面的请求医院列表数据的方法,然后上面数据里面的方法设置医院列表数据,设置列表总条数
- 开始Table组件里面的页面属性,如当前页,每页条数,pageSizeOptions(指定每页可以显示多少条),是否可以快速跳转至某页(showQuickJumper),是否展示pageSize切换器(showSizeChanger),以及total,以及和columns属性相配合的dataSource的数据渲染


## 三级分类-省份api请求封装
- 配置服务器代理:打开craco.config.js文件,封装一个服务器代理address,地址为http://139.198.34.216:8202

- 封装api:在http文件夹里面新建一个requestAdd.ts文件,请求地址为"/address"
- 然后在http文件夹里面的index文件里面引入,并且暴露
-在api文件夹里hospitalList.ts文件里面引入,并且暴露一份省份列表每一项的值类型(typeProvinceItem),还有请求省份列表的类型(typeProvinceList),为每一项组成的数组
- 开始请求所有省份,暴露请求reqProvinceList,返回requestAdd请求的get,请求地址固定为/admin/cmn/dict/findByDictCode/province


## 三级分类-省份列表渲染
- 数据5:省份列表(provinceList),值为一个空数组
- 副作用2:获取省份列表 请求:getProvinceList 变量接收请求reqProvinceList的数据,然后用数据里面的方法获取到变量里面的数据,最后请求调用
- 给省份的Form.Item添加name属性,值为provinceCode,然后Options组件去掉,{provinceList的map方法,返回Options组件,要value,id,name}


## 三级分类-根据省份列表请求城市列表渲染
- 直接封装市的api(reqCityOrDistrict),携带一个参数parenId,请求地址/admin/cmn/dict/findByParentId/${parentId}
- 打开HospitalList文件夹里面的文件,
- 数据6:市列表(cityList),几乎同省,为选择省添加一个onchange事件,方法名为provinceChange:选择省份的事件回调函数,async,接收一个value参数,为string类型,变量接收请求方法的value,然后用数据里的方法,
- 在市里的Form.Item里面与省的方法一样,name为cityCode,在Table组件里面添加属性 rowKey={(row) => row.id},指定唯一标识,以便更快定位具体的一行


## 三级分类-根据市选择对应的区县
- 数据7:区县列表(districtList)
- 为是添加onchang事件,方法名:cityChange,与市的方法差不多,然后改变区县的Select组件,同市,然后为区县添加name:districtCode


## 三级分类-重新选择省市的逻辑
- 初始化一个form实例
- 为Form组件添加上form属性
- 请求之前:在选择省份后把市和区县的表单清空,可以使用form.setFieldsValue方法
- 在省份请求完后,也要把区县清空
- 在请求市之前把区县清空


## .医院列表查询-完善表单
- 数据8:医院类型列表(hospitalType)
- 为Form.Item添加name,
- 副作用3:获取医院类型,请求:getHospitalType,async,变量接收请求reqCityOrDistrict,固定数值为10000,用数据里面的方法,实参为变量,
调用请求


## 医院列表查询-完成查询功能
- 先把方法1里面的获取医院列表分割出来,然后可以传入可选参数params,类型是typeReqHosInfoParams(医院列表信息类型),然后变量接收请求的时候后面要接收多接收一个params
- 为查询按钮添加onFinish属性,方法名为queryHospital,已经添加类型,submit
- 方法3:根据选项查询医院 ,参数值为params的类型,直接调用请求医院列表的方法(value)
- 数据9:表格加载中(loading),为Table组件添加loading属性,在请求之前调用加载中方法,请求之后消除


## 医院列表-完成页码
- 数据10:用户查询参数:(searchParams),类型为医院列表信息,初始值为一个对象,在获取医院列表的方法中,不需要再进行传参,但是请求中要添加接收searchParams参数,并且获取医院列表的副作用中,要添加依赖项,当前页面,每页条数,和searchParams
- 将查询医院里面的方法的获取医院列表的方法替换为数据里面的方法,将收集到的值设置给方法,然后进行查询
- 为Tbale里面的设置页码的属性,添加onChange属性,方法名(pageChange)
- 方法4:页面改变的事件回调,要传入当前页面和每页条数,用数据里面的方法进行改变


## 医院列表-清空查询
- 首先修复一个bug,因为在最后一页的时候,再查询会查询不到数据,所以在查询医院的时候把页码改为1
- 为清空按钮添加点击事件(resetSearch),首先调用form.resetFields方法清空输入框和下拉框里面的值,然后清空查询的状态,记住,它的初始值是一个对象,最后恢复页码


## 医院列表-上下线的修改
- 封装修改上下线状态的api(reqUpdateStatus),要传入两个参数,一个是id,一个是状态(status),这个要使用requestHos进行请求,没有返回值,请求接口为      /admin/hosp/hospital/updateStatus/${id}/${status}
- 先写一个方法6:修改状态(changeStatus),记住参数,这个要进行传参,所以要用高阶函数,开始返回函数,async,await 请求(id,如果状态一开始为下线(0),那就改为上线(1),反之),重新发送医院列表的请求
- 开始为下线按钮添加上点击事件,函数为刚刚的方法,要传入id和status,然后把按钮的字该成三元判断,要根据状态改变值,1就是下线,因为状态为1的时候,表示自己为上线状态,所以按钮要是下线,反之.


## 医院详情-路由搭建
- 在Hospital文件夹里面新建HospitalDetail文件夹,然后在里面新建index.tsx文件,直接rfc,组件名为HospitalDetail
- 打开routes文件夹里面的index文件,先进行懒加载详情文件,然后在路由里面创建子路由,地址为/syt/hospital/hospitalDetail


## 医院详情-静态搭建
- 打开HospitalDetail
- 用Descriptions组件进行静态搭建, title控制标题,bordered边框,column控制这有一行有几格,内容由Descriptions.Item组件控制,lable为表格的标题,span可以控制合并


## 医院详情-在详情组件中拿到id
- 给hospitalDetail路由地址后添加上/:id,可以进行接收id
- 在HospitalDetail里面用useParams方法获取id
- 在HospitalList里面使用useNavigate方法使查看按钮可以进行跳转到/syt/hospital/hospitalDetail/${row.id},row.id获取到这个数据体,然后进行跳转获取到这个数据的具体内容