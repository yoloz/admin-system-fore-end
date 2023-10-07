<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const toHome = () => {
    router.replace('/')
}

</script>
<template>
  <div class="not">
    <el-empty description="抱歉，访问出错~">
      <el-button type="primary" @click="toHome">回到首页</el-button>
    </el-empty>
  </div>
</template>
<style lang="scss" scoped>
.not {
  height: 100vh;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
}
</style>