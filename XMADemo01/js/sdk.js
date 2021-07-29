/*global WeixinJSBridge, wx*/
/* eslint-disable no-unused-vars */

let _uA = navigator.userAgent.toLowerCase()

/**
 * 判断小米商城各端环境
 * @property {boolean} platform.isApp            - 小米商城安卓客户端
 * @property {boolean} platform.isIOSApp         - 小米商城苹果客户端
 * @property {boolean} platform.isMiniprogram    - 小米商城微信小程序
 * @property {boolean} platform.isMiuiBrowser    - 小米手机miui浏览器
 * @property {boolean} platform.isWeixin         - 微信webview
 * @property {boolean} platform.isWeibo          - 微博webview
 */
let platform = {}

platform.isApp = (function(){
  if (typeof WE !== 'undefined' && /xiaomi\/miuibrowser\/4.3\/shop/i.test(_uA) && !/iphone/i.test(_uA)) {
    return true
  }else{
    return false
  }
})()

platform.isIOSApp = (function(){
  if (typeof WE !== 'undefined' && /xiaomi\/miuibrowser\/4.3\/shop/i.test(_uA) && /iphone/i.test(_uA)) {
    return true
  }else{
    return false
  }
})()

platform.isMiuiBrowser = (function(){
  if (typeof WE === 'undefined' && /xiaomi\/miuibrowser/i.test(_uA)) {
    return true
  }else{
    return false
  }
})()

platform.isWeixin = (function(){
  if (/micromessenger/i.test(_uA)) {
    return true
  }else{
    return false
  }
})()

platform.isWeibo = (function(){
  if (/weibo/i.test(_uA)) {
    return true
  }else{
    return false
  }
})()

platform.isMiniprogram = false

function miniProgramReady(){
  platform.isMiniprogram = !!(window.__wxjs_environment === 'miniprogram')
}

if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
  document.addEventListener('WeixinJSBridgeReady', miniProgramReady, false)
} else {
  miniProgramReady()
}

/**
 * 跳转单品页（全端支持跳转）
 * @func goProduct
 * @param {string} pid - 产品id.
 */
function goProduct(pid){
  let xiaomiProductPath = {
    'path': 'ShopPlugin://com.xiaomi.shop2.plugin.goodsdetail.GoodsDetailFragment?pluginId=101',
    'extra': {
      'commodityId': pid
    }
  }
  let xiaomiMiUrl = `//m.mi.com/commodity/detail/${pid}`
  let xiaomiMiniPath = `/pages/product/index?id=${pid}`
  if (platform.isApp) window.WE.trigger('show_plugin', JSON.stringify(xiaomiProductPath))
  if (platform.isIOSApp) window.WE.trigger('show_plugin', encodeURIComponent(JSON.stringify(xiaomiProductPath)))
  if (platform.isMiniprogram && window.wx && window.wx.miniProgram) {
    wx.miniProgram.navigateTo({
      url: xiaomiMiniPath
    })
  }
  if (!platform.isApp && !platform.isIOSApp && !platform.isMiniprogram) window.top.location.href = xiaomiMiUrl
}

/**
 * 跳转客户端我的钱包（仅商城APP支持）
 * @func goAppWallet
 */
function goAppWallet(){
  if(!platform.isApp && !platform.isIOSApp){
    console.error('仅商城APP支持')
    return
  }
  let pathName = platform.isIOSApp ? 'MyWalletFragment' : 'MyWalletNewFragment'
  let xiaomiWalletPath = {
    'path': `ShopPlugin://com.xiaomi.shop.plugin.my.${pathName}?pluginId=129`,
    'extra': {}
  }
  if (platform.isApp) window.WE.trigger('show_plugin', JSON.stringify(xiaomiWalletPath))
  if (platform.isIOSApp) window.WE.trigger('show_plugin', encodeURIComponent(JSON.stringify(xiaomiWalletPath)))
}

/**
 * 跳转优惠券列表（全端支持跳转）
 * @func goCoupon
 */
function goCoupon(){
  let xiaomiCouponPath = {
    'path': 'ShopPlugin://com.xiaomi.shop2.plugin.mishopcoupon.RootFragment?pluginId=107',
    "extra": {}
  }
  let xiaomiMiUrl = `//m.mi.com/user/coupon`
  let xiaomiMiniPath = `/pages/coupon/index`
  if (platform.isApp) window.WE.trigger('show_plugin', JSON.stringify(xiaomiCouponPath))
  if (platform.isIOSApp) window.WE.trigger('show_plugin', encodeURIComponent(JSON.stringify(xiaomiCouponPath)))
  if (platform.isMiniprogram && window.wx && window.wx.miniProgram) {
    wx.miniProgram.navigateTo({
      url: xiaomiMiniPath
    })
  }
  if (!platform.isApp && !platform.isIOSApp && !platform.isMiniprogram) window.top.location.href = xiaomiMiUrl
}

/**
 * 跳转活动页（全端支持跳转）
 * @func goActivity
 * @param {string} id   - 活动id.
 * @param {string} signString   - 活动签名.
 */
function goActivity(id, signString){
  let sign = signString || ''
  let xiaomiActivityPath = {
    'path': 'ShopPlugin://com.xiaomi.shop2.plugin.hdchannel.RootFragment?pluginId=15102',
    'extra': {
      'extra_url': 'http://api.m.mi.com/v1/home/activity_page',
      'extra_ver': id.toString(),
      'sign': sign
    }
  }
  let xiaomiMiniPath = `/pages/channel/index?page_type=activity&page_title=&page_id=${id}&sign=${sign}`
  if (platform.isApp) window.WE.trigger('show_plugin', JSON.stringify(xiaomiActivityPath))
  if (platform.isIOSApp) window.WE.trigger('show_plugin', encodeURIComponent(JSON.stringify(xiaomiActivityPath)))
  if (platform.isMiniprogram && window.wx && window.wx.miniProgram) {
    wx.miniProgram.navigateTo({
      url: xiaomiMiniPath
    })
  }
  if (!platform.isApp && !platform.isIOSApp && !platform.isMiniprogram) window.top.location.href = `//s1.mi.com/m/app/hd/index.html?id=${id}&sign=${sign}`
}

/**
 * 跳转首页（全端支持跳转）
 * @func goHome
 */
function goHome(){
  let xiaomiMiniPath = `/pages/index/index`
  if (platform.isApp || platform.isIOSApp) window.WE.trigger('gohome', null)
  if (platform.isMiniprogram && window.wx && window.wx.miniProgram) {
    wx.miniProgram.switchTab({
      url: xiaomiMiniPath
    })
  }
  if (!platform.isApp && !platform.isIOSApp && !platform.isMiniprogram) window.top.location.href = 'https://m.mi.com'
}

function _loginCallback(){
  window.top.location.reload()
}

/**
 * 判断用户登录状态
 * @func isLogin
 * @returns {boolean}
 */
function isLogin(){
  if(document.cookie.indexOf('cUserId') !== -1) {
    return true
  }else{
    return false
  }
}

/**
 * 执行登录账号
 * @func doLogin
 */
function doLogin(){
  if (platform.isApp) {
    window.WE.trigger('login', null)
  } else if (platform.isWeixin){
    window.top.location.href = `//m.mi.com/v1/wxauthorize/authorize?client_id=180100041061&callback_url=${encodeURIComponent(location.href)}`
  } else{
    window.top.location.href = `//m.mi.com/v1/authorize/sso?client_id=180100031051&callback=${encodeURIComponent(location.href)}`
  }
}

/**
 * @typedef {Object} data - 分享内容
 * @property {Object} data.poster                         - 海报图片下载.
 * @property {String} data.poster.img_url                 - 尺寸不限带二维码的海报图片.
 * @property {Object} data.cx_v3                          - 分享到小米Lite(小程序卡片).
 * @property {Object} data.cx_v3.wechat_friend            - 好友.
 * @property {String} data.cx_v3.wechat_friend.title      - 标题.
 * @property {String} data.cx_v3.wechat_friend.img_url    - 715x577卡片图.
 * @property {String} data.cx_v3.wechat_friend.share_url  - 小程序链接.
 * @property {Object} data.cx_v3.wechat_moments           - 朋友圈.
 * @property {String} data.cx_v3.wechat_moments.img_url   - 尺寸不限带二维码的海报.
 * @property {Object} data.h5_v3                          - 分享H5链接形式.
 * @property {Object} data.h5_v3.weibo                    - 微博.
 * @property {String} data.h5_v3.weibo.content            - 标题.
 * @property {String} data.h5_v3.weibo.img_url            - 海报比例不限.
 * @property {String} data.h5_v3.weibo.share_url          - 链接.
 * @property {Object} data.h5_v3.wechat_friend            - 微信好友.
 * @property {String} data.h5_v3.wechat_friend.title      - 标题.
 * @property {String} data.h5_v3.wechat_friend.content    - 副标题.
 * @property {String} data.h5_v3.wechat_friend.img_url    - 120x120小图.
 * @property {String} data.h5_v3.wechat_friend.share_url  - 链接.
 * @property {Object} data.h5_v3.wechat_moments           - 微信朋友圈.
 * @property {String} data.h5_v3.wechat_moments.title     - 标题.
 * @property {String} data.h5_v3.wechat_moments.img_url   - 120x120小图.
 * @property {String} data.h5_v3.wechat_moments.share_url - 链接.
 * @property {Object} data.h5_v3.qq_friend                - qq.
 * @property {String} data.h5_v3.qq_friend.title          - 标题.
 * @property {String} data.h5_v3.qq_friend.content        - 副标题.
 * @property {String} data.h5_v3.qq_friend.img_url        - 120x120小图.
 * @property {String} data.h5_v3.qq_friend.share_url      - 链接.
 * @property {String} data.h5_v3.qq_moments               - qzone.
 * @property {String} data.h5_v3.qq_moments.title         - 标题.
 * @property {String} data.h5_v3.qq_moments.content       - 副标题.
 * @property {String} data.h5_v3.qq_moments.img_url       - 120x120小图.
 * @property {String} data.h5_v3.qq_moments.share_url     - 链接.
 * @property {String} data.h5_v3.share_url                - 链接.
 */

/**
 * 注册客户端分享(仅商城APP支持，被动模式)
 * @func shareInitApp
 * @param {data} data - 分享内容.
 */
function shareInitApp(data){
  if(!platform.isApp && !platform.isIOSApp){
    console.error('仅商城APP支持')
    return
  }
  let resD = JSON.stringify(data)
  if(platform.isIOSApp){
    resD = encodeURIComponent(resD)
  }
  window.WE.trigger('share_init', resD)
}

/**
 * 打开客户端分享(仅商城APP支持，主动模式)
 * @func shareOpenApp
 * @param {data} data - 分享内容.
 */
function shareOpenApp(data){
  if(!platform.isApp && !platform.isIOSApp){
    console.error('仅商城APP支持')
    return
  }
  let resD = JSON.stringify(data)
  if(platform.isIOSApp){
    resD = encodeURIComponent(resD)
  }
  window.WE.trigger('share_open', resD)
}

/**
 * 保存单张url图片(仅商城APP支持)
 * @func downloadImg
 * @param {String} url - 图片绝对地址 'https://xxxxx'
 */
function downloadImg(url){
  if(!/^http[s]?:\/\/[\S\s]+/i.test(url) || !platform.isApp && !platform.isIOSApp){
    console.error('错误：url参数错误或不在小米商城app中')
    return
  }
  window.WE.trigger('download_oneimg', url)
}

/**
 * 保存单张base64图片(仅商城安卓APP支持)
 * @func downloadBase64Img
 * @param {String} url - 图片base64地址 'data:image/png;base64'
 */
function downloadBase64Img(url){
  if(!/data:image/i.test(url) || !platform.isApp) {
    console.error('错误：url参数错误或不在小米商城安卓app中')
    return
  }
  window.WE.trigger('download_oneimg_base64', url)
}

/* eslint-disable no-unused-vars */
