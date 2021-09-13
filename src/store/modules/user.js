import { login, logout, getUserInfo, getMenuInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/cookie'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    menus: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const data = {
        username: username,
        password: password
      }
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          setToken(res.token)
          commit('SET_TOKEN', res.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          commit('SET_NAME', res.username)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取菜单信息
    GetMenuInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getMenuInfo().then(res => {
          const menuData = fnAddDynamicMenus(res)
          commit('SET_MENUS', menuData)
          resolve(menuData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 */
function fnAddDynamicMenus(menuList = []) {
  const menuData = []
  menuList.filter(element => {
    const name = element.path.indexOf('/') !== -1 ? element.path.split('/') : []
    const menu = {
      name: name.length ? name[1] : element.path,
      path: element.path,
      component: element.component,
      meta: {
        title: element.menuName,
        icon: element.icon
      }
    }
    if (element.children != null && element.children && element.children.length) {
      menu.alwaysShow = true
      menu.children = fnAddDynamicMenus(element.children)
    }
    menuData.push(menu)
  })
  return menuData
}
