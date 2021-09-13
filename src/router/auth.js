import router from './index'
import { getToken } from '../utils/cookie'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'

// 白名单列表
const whiteList = ['/login']

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  if (getToken()) {
    // 已登录且要跳转的是登录页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (router.options.isAddDynamicMenuRoutes) {
        next()
      } else {
        // next()
        // 判断当前用户是否已拉取完user_info信息
        // store.dispatch('GetInfo').then(res => {
        //   store.dispatch('GetMenuInfo').then(menuRes => {
        store.dispatch('GenerateRoutes', {}).then(accessRoutes => {
          // 根据roles权限生成可访问的路由表
          console.log(accessRoutes)
          router.addRoutes(accessRoutes) // 动态添加可访问路由表
          router.options.isAddDynamicMenuRoutes = true
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
        })
        // })
        // }).catch(err => {
        //   store.dispatch('FedLogOut').then(() => {
        //     Message.error(err)
        //     next({ path: '/' })
        //   })
        // })
      }
    }
  } else {
    // 在免登录白名单，直接进入
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 否则重定向到登录页
      next(`/login?redirect=${to.fullPath}`)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
