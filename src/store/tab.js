import Cookie from 'js-cookie'
export default {
  state: {
    isCollapse: false,
    currentMenu: null,
    menu: [],
    tabsList: [
      {
        id: 1,
        name: 'home',
        path: '/',
        label: '首页',
        icon: 's-home'
      }
    ]
  },
  mutations: {
    selectMenu(state, val) {
      if (val.name !== 'home') {
        state.currentMenu = val
        let result = state.tabsList.findIndex(item => item.name === val.name)
        result === -1 ? state.tabsList.push(val) : ''
      } else {
        state.currentMenu = null
      }
      //   val.name !== 'home' ? (state.currentMenu = val) : (state.currentMenu = null)
    },
    closeTab(state, val) {
      let result = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(result, 1)
    },
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    // 动态路由设置
    setMenu(state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    // 清除cookid
    clearMenu(state) {
      state.menu = []
      Cookie.remove('menu')
    },
    // 添加
    addMenu(state, router) {
      // 查看是否
      if (!Cookie.get('menu')) {
        return
      }
      let menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      let currentMenu = [
        {
          path: '/',
          component: () => import(`@/views/Main`),
          children: []
        }
      ]
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`@/views/${item.url}`)
            return item
          })
          currentMenu[0].children.push(...item.children)
        } else {
          item.component = () => import(`@/views/${item.url}`)
          currentMenu[0].children.push(item)
        }
      })
      router.addRoutes(currentMenu)
    }
  },
  actions: {}
}
