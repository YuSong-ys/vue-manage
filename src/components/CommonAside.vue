<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
  >
    <h3 v-show="!isCollapse">Nick</h3>
    <h3 v-show="isCollapse">Nick</h3>
    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu index="index" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subItem.path"
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
          @click="clickMenu(subItem)"
          ><i :class="'el-icon-' + subItem.icon"></i>
          <span>{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  computed: {
    //过滤首页
    noChildren() {
      return this.menu.filter(item => !item.children)
    },
    hasChildren() {
      return this.menu.filter(item => item.children)
    },
    //控制aside是否收缩
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    menu() {
      return this.$store.state.tab.menu
    }
  },
  data() {
    return {
      asideMenu: [
        {
          id: 1,
          name: 'home',
          path: '/',
          label: '首页',
          icon: 's-home'
        },
        {
          id: 2,
          name: 'video',
          path: '/video',
          label: '视频管理',
          icon: 'video-play'
        },
        {
          id: 3,
          name: 'user',
          path: '/user',
          label: '用户管理',
          icon: 'user'
        },
        {
          id: 4,
          name: 'other',
          label: '其他',
          icon: 'user',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '演示页面1',
              icon: 'setting'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '演示页面2',
              icon: 'setting'
            }
          ]
        }
      ]
    }
  },
  methods: {
    clickMenu(item) {
      this.$router.push({ name: item.name })
      this.$store.commit('selectMenu', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #ccc;
    font-size: 20px;
    text-align: center;
    line-height: 48px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
