<template>
  <el-container style="height: 100%;">
    <el-header class="homeHeader">
      <div class="title">测试样例</div>
      <el-dropdown class="userInfo" @command="commandHandler">
        <span class="el-dropdown-link">
          {{ user.name }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- 每个下拉框的item中的command相当于id一样用于标记每个item -->
            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout" divided>
              退出登录</el-dropdown-item><!--divided表示分割线 -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-menu class="el-menu-vertical" :default-active="activeMenu" :collapse-transition="false" mode="vertical" router>
          <SidebarItem v-for="route in constantRoutes" :key="route.path" :item="route" :base-path="route.path" />
        </el-menu>
      </el-aside>
      <el-main>
        <TagsView />
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
 
<script>
import { ElMessage } from 'element-plus'
import TagsView from './TagLink.vue'
import SidebarItem from './SidebarItem.vue'
import { constantRoutes } from '@/router'
import { useRoute } from 'vue-router'
export default {
  name: "Home",
  data() {
    return {
      user: { name: 'test', userface: './favicon.ico' },
      constantRoutes: constantRoutes
    };
  }, //data-end
  computed: {
    //在计算属性这里进行了过滤(相当于使用了v-if),然后再将过滤后的值给v-for使用
    menus() {
      let arr = [''];
      arr = this.$router.options.routes.filter(item => {
        return item.hidden == false;
      })
      console.log(arr);
      return arr;
    },
    activeMenu() {
      const { meta, path } = useRoute()
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  methods: {
    commandHandler(cmd) {
      ElMessage(`click on item ${cmd}`)
    },
  },
  components: { TagsView, SidebarItem }
};
</script>
 
<style>
.homeHeader {
  background-color: #409eff;
  display: flex;
  /* 竖直方向上居中 */
  align-items: center;
  /*在弹性盒对象的 <div> 元素中的各项周围留有空白*/
  justify-content: space-between;
  padding: 0px 15px;
  box-sizing: border-box;
}

/* header中的'人事管理'字体设置 */
.homeHeader .title {
  font-size: 30px;
  font-family: 华文行楷;
  color: #ffffff;
}

/* 在鼠标放在右上角的抽屉式dropdown时,鼠标变为手指 */
.homeHeader .userInfo {
  cursor: pointer;
}

.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style> 