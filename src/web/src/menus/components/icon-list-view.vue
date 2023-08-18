<script lang="ts" setup>

const props = defineProps({
    icons: {
        type: Array,
        required: true
    }
})

type Emit = { (e: 'selected', name: string): void }
const emit = defineEmits<Emit>()

const selectedIcon = (name: any) => {
    emit('selected', name)
    document.body.click()
}

</script>
<template>
  <div class="icon-body">
    <div class="icon-list">
      <div v-for="(item, index) in props.icons" :key="index" @click="selectedIcon(item)">
        <i :class="`iconfont ${item}`"></i>
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-body {
  width: 100%;
  padding: 10px;

  .icon-list {
    height: 200px;
    overflow-y: scroll;

    div {
      height: 30px;
      line-height: 16px;
      margin-bottom: -5px;
      cursor: pointer;
      width: 33%;
      float: left;
      vertical-align: middle;
    }

    span {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 300;
      width: 85%;
    }
  }
}
</style>
