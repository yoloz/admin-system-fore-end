<script lang="ts" setup>
import { ref } from 'vue'

import version from './help-doc.json'
const drawer = ref(false)
const detail = ref(version[0])
const handleSelect = (key: string) => {
    const found: any = version.find(element => element.version === key)
    detail.value = found
}
const open = () => {
    drawer.value = true
}
defineExpose({ open })
</script>
<template>
  <div class="custom-help-wrapper">
    <el-drawer v-model="drawer" size="700px" :title="`详情`" :show-close="false">
      <template #header="{ close, titleId, titleClass }">
        <div class="drawer-header" :class="titleClass">
          <div class="right">
            <h4>帮助</h4>
          </div>
        </div>

      </template>
      <div class="custom-drawer">
        <div class="menu">

          <el-menu unique-opened :default-active="version[0].version" class="el-menu-vertical-demo"
            @select="handleSelect">
            <div v-for="item in version" :key="item.version">
              <el-menu-item :index="item.version">
                <span>{{ item.version }}</span>
              </el-menu-item>
            </div>

          </el-menu>
        </div>
        <div class="menu-content">
          <span class="title"> {{ detail.version }}</span> <span> {{ detail.date }}</span>
          <div class="drawer-body-desc">
            <ul>
              <li v-for="item in  detail.details" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>

      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.custom-help-wrapper {

  .drawer-header {
    display: flex;
    align-items: center;

    .right {
      p {
        margin-bottom: 5px;
        font-size: 12px;
        color: #6b778c;
      }

      h4 {
        // background-color: red;
        font-size: 16px;
        font-weight: 600;
        color: var(--custom-main-text-color);
        overflow: hidden;
        margin-left: -15px;
        text-overflow: ellipsis;
      }

    }
  }

  .custom-drawer {
    display: flex;
    // width: 100%;
    // background-color: pink;

    .menu {
      //    border: 1px solid red;
      margin-left: -20px;

      .help-title {
        margin-left: 35px;
        font-size: 18px;
        height: 30px;
        border-right: 1px solid #ccc;

      }

      .logo {
        margin-right: 7px;
      }

      height: 94vh;
      min-width: 230px;
      // overflow-y: auto;

      .el-menu {
        height: 100%;
        overflow-y: auto;

      }

      :deep(.el-menu-item-group__title) {
        width: 240px;
        margin-left: -30px;
        z-index: 2;
        font-size: 14px;
        padding-right: 18px;
        color: var(--custom-text-color);
        position: relative;
        overflow: hidden;

        &::after {
          content: "";
          background: #ebebeb;
          height: 1px;
          position: absolute;
          width: 111px;
          top: 0;
          bottom: 0;
          margin: auto;
          margin-left: 12px;
        }
      }

      :deep(.el-sub-menu__title) {
        height: 37px;
        margin: 5px 10px;
        margin-left: -0px;
        color: var(--custom-text-color);

        // border: 1px solid red;
        &:hover {

          background-color: var(--custom-menu-hover);
          border-radius: 4px;
          // padding-right: -5px;
        }
      }

      .el-menu-item {
        height: 37px;
        margin: 5px 10px;
        margin-left: -0px;
        color: var(--custom-text-color);

        &:hover {

          background-color: var(--custom-menu-hover);
          border-radius: 4px;
        }
      }

      :deep(.el-menu-item.is-active) {
        color: var(--custom-text-color);

        background-color: var(--custom-menu-hover);
        border-radius: 4px;
      }
    }

    .menu-content {
      color: var(--custom-text2-color);
      height: 96vh;
      width: 100%;
      padding: 0 25px 25px 25px;
      overflow-y: auto;

      span {
        color: var(--custom-text-color);
      }

      .title {
        color: #0052cc;
        font-weight: 700;
        font-size: 24px;
        line-height: 26px;
      }

      .drawer-body-desc {
        width: 100%;
        padding: 16px 16px 16px 32px;
        border-radius: 6px;
        background-color: var(--el-fill-color-light);
        margin: 18px 0 20px 0;
      }

      li {
        margin-bottom: 8px;
      }

    }
  }

  :deep(.el-drawer) {

    .el-drawer__body {
      padding-right: 0;
      overflow: hidden;
    }

  }
}
</style>
<!-- <script lang="ts" setup>

<template>
    <el-drawer v-model="drawer" size="600px" :title="`详情`" :show-close="false">
      <template #header="{ close, titleId, titleClass }">
            <div class="drawer-header" :class="titleClass">
            <div class="right">
                <h4>版本迭代</h4>
                </div>
            </div>

        </template>
        <span class="title">{{ detail.date }}</span>   <span>{{ detail.version }}</span>
        <p>前端：</p>
      <ul>
        <li v-for="item in  detail.start" :key="item">{{ item }}</li>
      </ul>
      <p>后端：</p>
      <ul>
        <li v-for="item in  detail.end" :key="item">{{ item }}</li>
      </ul>
        <template #footer>

        </template>
    </el-drawer>
</template>
<style  lang="scss" scoped>
.drawer-header {
    display: flex;
    align-items: center;

    .right {
        p {
            margin-bottom: 5px;
            font-size: 12px;
            color: #6b778c;
        }

        h4 {
            font-size: 16px;
            font-weight: 600;
            color: var(--custom-main-text-color);
            overflow: hidden;
            text-overflow: ellipsis;
        }

    }
}
.title{
  color: #0052cc;
  font-size: 22;
  font-weight: 800;
}
</style> -->