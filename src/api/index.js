import request from '@/utils/request'

// http://192.168.3.66:8088

// 消息 http://47.104.20.233:8089/cnfs-platform/messageManage/add
export function messageAdd(data) {
  return request({
    url: '/cnfs-platform/messageManage/add',
    method: 'post',
    data
  })
}

// //47.104.20.233:8089/cnfs-platform/messageManage/update
export function messageManageUpdate(data) {
  return request({
    url: '/cnfs-platform/messageManage/update',
    method: 'put',
    data
  })
}

// 走马灯
export function getMarquee(data) {
  return request({
    url: '/cnfs-platform/marquee/getAll',
    method: 'post',
    data: {
      sortType: 'pubDate',
      ...data
    }
  })
}

// 新增走马灯 //47.104.20.233:8089/cnfs-platform/marquee/add
export function marqueeAdd(data) {
  return request({
    url: `/cnfs-platform/marquee/add`,
    method: 'post',
    data
  })
}

// http://47.104.20.233:8089/cnfs-platform/marquee/update
export function marqueeUpdate(data) {
  return request({
    url: '/cnfs-platform/marquee/update',
    method: 'put',
    data
  })
}

// 删除走马灯 http://47.104.20.233:8089/cnfs-platform/marquee/delete
export function marqueeDelete(data) {
  return request({
    url: `/cnfs-platform/marquee/delete`,
    method: 'delete',
    data
  })
}

// http://47.104.20.233:8089/cnfs-platform/banner/getAll
export function getBanner(data) {
  return request({
    url: '/cnfs-platform/banner/getAll',
    method: 'post',
    data: {
      sortType: 'pubDate',
      ...data
    }
  })
}

// http://47.104.20.233:8089/cnfs-platform/banner/delete?id=11
export function bannerDelete(id) {
  return request({
    url: `/cnfs-platform/banner/delete?id=${id}`,
    method: 'delete'
  })
}

// http://47.104.20.233:8089/cnfs-platform/information/getAll
export function informationGetAll(data) {
  return request({
    url: '/cnfs-platform/information/getAll',
    method: 'post',
    data: {
      sortType: 'pubDate',
      ...data
    }
  })
}

// information/update
export function informationUpdate(data) {
  return request({
    url: '/cnfs-platform/information/update',
    method: 'put',
    data
  })
}

// http://47.104.20.233:8089/cnfs-platform/messageManage/getAll //47.104.20.233:8089/cnfs-platform/messageManage/getAll
export function getMessageManage(data) {
  return request({
    url: '/cnfs-platform/messageManage/getAll',
    method: 'post',
    data
  })
}

// http://47.104.20.233:8089/cnfs-platform/information/add
export function informationAdd(data) {
  return request({
    url: '/cnfs-platform/information/add',
    method: 'post',
    data
  })
}

// //47.104.20.233:8089/cnfs-platform/information/delete?id=3
export function deleteInfo(id) {
  return request({
    url: `/cnfs-platform/information/delete?id=${id}`,
    method: 'delete'
  })
}

// http://47.104.20.233:8089/cnfs-platform/banner/add
export function bannerAdd(data) {
  return request({
    url: `/cnfs-platform/banner/add`,
    method: 'post',
    data
  })
}

// //47.104.20.233:8089/cnfs-platform/banner/update
export function bannerUpdate(data) {
  return request({
    url: `/cnfs-platform/banner/update`,
    method: 'put',
    data
  })
}

// http://47.104.20.233:8089/cnfs-platform/verify/getVerify
export function getVerify(data) {
  return request({
    url: `/cnfs-platform/verify/getVerify`,
    method: 'get'
  })
}

// 城市合伙人 //47.104.20.233:8089/cnfs-platform/platform/getAll
export function platformGetAll(data) {
  return request({
    url: `/cnfs-platform/platform/getAll`,
    method: 'post',
    data
  })
}

// http://47.104.20.233:8089/cnfs-platform/platform/getAllProvinceCityCooper
export function getAllProvinceCityCooper(data) {
  return request({
    url: `/cnfs-platform/platform/getAllProvinceCityCooper`,
    method: 'post',
    data
  })
}

// 上传 http://47.104.20.233:8089/cnfs-platform/file/upload
export function fileUpload(data) {
  return request({
    url: `/cnfs-platform/file/upload`,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })
}

// //47.104.20.233:8089/cnfs-platform/platform/add
export function platformAdd(data) {
  return request({
    url: `/cnfs-platform/platform/add`,
    method: 'post',
    data
  })
}

// //47.104.20.233:8089/cnfs-platform/platform/update
export function platformUpdate(data) {
  return request({
    url: `/cnfs-platform/platform/update`,
    method: 'put',
    data
  })
}

// http://47.104.20.233:8089/cnfs-platform/platform/delete?id=5
export function platformDelete(id) {
  return request({
    url: `/cnfs-platform/platform/delete?id=${id}`,
    method: 'delete'
  })
}

// 社区奖励模块 : 社区奖励模块 //47.104.20.233:8089/cnfs-platform/community/getAll
export function communityGetAll(data) {
  return request({
    url: `/cnfs-platform/community/getAll`,
    method: 'post',
    data
  })
}

// 推广奖励 //47.104.20.233:8089/cnfs-platform/promotion/getAll
export function promotionGetAll(data) {
  return request({
    url: `/cnfs-platform/promotion/getAll`,
    method: 'post',
    data
  })
}

// 各省数据 //47.104.20.233:8089/cnfs-platform/cNProvince/getAll
export function cNProvinceGetAll() {
  return request({
    url: `/cnfs-platform/cNProvince/getAll`,
    method: 'post'
  })
}

// 省对市 //47.104.20.233:8089/cnfs-platform/cNCity/getCityByProvinceCode?code=220000
export function getCityByProvinceCode(code) {
  return request({
    url: `/cnfs-platform/cNCity/getCityByProvinceCode?code=${code}`,
    method: 'post'
  })
}

// 市对区 //47.104.20.233:8089/cnfs-platform/cNArea/getAreaByCityCode?code=220600
export function getAreaByCityCode(code) {
  return request({
    url: `/cnfs-platform/cNArea/getAreaByCityCode?code=${code}`,
    method: 'post'
  })
}

// 区对街道 //47.104.20.233:8089/cnfs-platform/cNStreet/getStreetByAreaCode
export function getStreetByAreaCode(code) {
  return request({
    url: `/cnfs-platform/cNStreet/getStreetByAreaCode?code=${code}`,
    method: 'post'
  })
}

// 通过手机号查用户 http://47.104.20.233:8089/cnfs-platform/user/getUserByPhone
export function getUserByPhone(data) {
  return request({
    url: `/cnfs-platform/user/getUserByPhone?phone=${data.phone}`,
    method: 'post'
  })
}

// http://47.104.20.233:8089/cnfs-platform/cooperation/getAllCooperation
export function getAllCooperation(data) {
  return request({
    url: `/cnfs-platform/cooperation/getAllCooperation`,
    method: 'post',
    data
  })
}

// http://47.104.20.233:8089/cnfs-platform/platform/getCooperIsExist?street=
export function getCooperIsExist(code) {
  return request({
    url: `/cnfs-platform/platform/getCooperIsExist?street=${code}`,
    method: 'post'
  })
}

// //47.104.20.233:8089/cnfs-platform/userManage/getAll
export function userManageGetAll(data) {
  return request({
    url: `/cnfs-platform/userManage/getAll`,
    method: 'post',
    data
  })
}

// 未注册省 //47.104.20.233:8089/cnfs-platform/platform/getCooperProvinceListByLevelAndProvince
export function getCooperProvinceListByLevelAndProvince(data) {
  return request({
    url: `/cnfs-platform/platform/getCooperProvinceListByLevelAndProvince`,
    method: 'post',
    data
  })
}

// 未注册市 //47.104.20.233:8089/cnfs-platform/platform/getCooperProvinceListByLevelAndCity
export function getCooperProvinceListByLevelAndCity(data) {
  return request({
    url: `/cnfs-platform/platform/getCooperProvinceListByLevelAndCity`,
    method: 'post',
    data
  })
}

// 未注册区 //47.104.20.233:8089/cnfs-platform/platform/getCooperProvinceListByLevelAndArea
export function getCooperProvinceListByLevelAndArea(data) {
  return request({
    url: `/cnfs-platform/platform/getCooperProvinceListByLevelAndArea`,
    method: 'post',
    data
  })
}

// 未注册街道 //47.104.20.233:8089/cnfs-platform/platform/getCooperProvinceListByLevelAndStreet
export function getCooperProvinceListByLevelAndStreet(data) {
  return request({
    url: `/cnfs-platform/platform/getCooperProvinceListByLevelAndStreet`,
    method: 'post',
    data
  })
}

// 区一下 /platform/getAllCityAreaCooper
export function getAllCityAreaCooper(data) {
  return request({
    url: `/cnfs-platform/platform/getAllCityAreaCooper`,
    method: 'post',
    data
  })
}

// //47.104.20.233:8089/cnfs-platform/information/getInformationDetail?id=71
export function getInformationDetail(id) {
  return request({
    url: `/cnfs-platform/information/getInformationDetail?id=${id}`,
    method: 'get'
  })
}

// export function routerData() {
//   return request({
//     url: `./router.json`,
//     method: 'get'
//   })
// }

//  /file/word/export
export function wordExport(data) {
  return request({
    url: `/cnfs-platform/file/word/export`,
    method: 'post',
    data
  })
}

// http://47.104.20.233:8089/cnfs-platform/file/word/export/downLoad
export function exportDownLoad(data) {
  return request({
    url: `/cnfs-platform/file/word/export/downLoad`,
    method: 'post',
    data
  })
}

