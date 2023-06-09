import request from './../model/request'

/**
 * 登陆
 */

export const login = data => request('/admin/login', data, 'POST')

 /**
	* 退出
	*/
 
export const signout = () => request('/admin/signout')

/**
 * 获取用户信息
 */

export const getAdminInfo = () => request('/admin/info')

/**
 * api请求量
 */

export const apiCount = date => request('/statis/api/' + date + '/count')

/**
 * 所有api请求量
 */

export const apiAllCount = () => request('/statis/api/count')


/**
 * 所有api请求信息
 */

export const apiAllRecord = () => request('/statis/api/all')

/**
 * 用户注册量
 */

export const userCount = date => request('/statis/user/' + date + '/count')

/**
 * 某一天订单数量
 */

export const orderCount = date => request('/statis/order/' + date + '/count')


/**
 * 某一天管理员注册量
 */

export const adminDayCount = date => request('/statis/admin/' + date + '/count')

/**
 * 管理员列表
 */

export const adminList = data => request('/admin/all', data)

/**
 * 管理员数量
 */

export const adminCount = () => request('/admin/count')

/**
 * 获取定位城市
 */

export const cityGuess = () => request('/v1/cities', {
	type: 'guess'
})

/**
 * 添加商铺
 */

export const addShop = data => request('/shopping/addShop', data, 'POST')

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => request('/v1/pois', {
	type: 'search',
	city_id: cityid,
	keyword: value
})

/**
 * 获取当前店铺食品种类
 */

export const getCategory = restaurant_id => request('/shopping/getcategory/' + restaurant_id)

/**
 * 添加食品种类
 */

export const addCategory = data => request('/shopping/addcategory', data, 'POST')


/**
 * 添加食品
 */

export const addFood = data => request('/shopping/addfood', data, 'POST')


/**
 * category 种类列表
 */

export const foodCategory = (latitude, longitude) => request('/shopping/v2/restaurant/category')

/**
 * 获取餐馆列表
 */

export const getResturants = data => request('/shopping/restaurants', data)

/**
 * 获取餐馆详细信息
 */

export const getResturantDetail = restaurant_id => request('/shopping/restaurant/' + restaurant_id)

/**
 * 获取餐馆数量
 */

export const getResturantsCount = () => request('/shopping/restaurants/count')

/**
 * 更新餐馆信息
 */

export const updateResturant = data => request('/shopping/updateshop', data, 'POST')

/**
 * 删除餐馆
 */

export const deleteResturant = restaurant_id => request('/shopping/restaurant/' + restaurant_id, {}, 'DELETE')

/**
 * 获取食品列表
 */

export const getFoods = data => request('/shopping/v2/foods', data)

/**
 * 获取食品数量
 */

export const getFoodsCount = data => request('/shopping/v2/foods/count', data)


/**
 * 获取menu列表
 */

export const getMenu = data => request('/shopping/v2/menu', data)

/**
 * 获取menu详情
 */

export const getMenuById = category_id => request('/shopping/v2/menu/' + category_id)

/**
 * 更新食品信息
 */

export const updateFood = data => request('/shopping/v2/updatefood', data, 'POST')

/**
 * 删除食品
 */

export const deleteFood = food_id => request('/shopping/v2/food/' + food_id, {}, 'DELETE')

/**
 * 获取用户列表
 */

export const getUserList = data => request('/v1/users/list', data)

/**
 * 获取用户数量
 */

export const getUserCount = data => request('/v1/users/count', data)

/**
 * 获取订单列表
 */

export const getOrderList = data => request('/bos/orders', data)

/**
 * 获取订单数量
 */

export const getOrderCount = data => request('/bos/orders/count', data)

/**
 * 获取用户信息
 */

export const getUserInfo = user_id => request('/v1/user/' + user_id)

/**
 * 获取地址信息
 */

export const getAddressById = address_id => request('/v1/addresse/' + address_id)

/**
 * 获取用户分布信息
 */

export const getUserCity = () => request('/v1/user/city/count')

/**
 * 获取商铺列表
 */

 export const shopList = (
  latitude,
  longitude,
  offset,
  restaurant_category_id = '',
  restaurant_category_ids = '',
  order_by = '',
  deliveryMode = '',
  support_ids = []
) => {
  let supportStr = ''
  support_ids.forEach(item => {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.restaurant_category_id
    }
  })
  const data = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': deliveryMode + supportStr
  }
  return request('/shopping/restaurants', data)
}
