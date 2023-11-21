<script lang="ts" setup>
const props = defineProps({
    icons: {
        type: Array,
        required: true
    }
})

type Emit = { (e: 'selected', name: string): void };
const emit = defineEmits<Emit>()

const selectedIcon = (name: any) => {
    emit('selected', name)
    document.body.click()
}
</script>
<template>
  <div class="popcontainer">
    <ul class="boxes">
      <li
        v-for="(item, index) in props.icons"
        :key="index"
        @click="selectedIcon(item)"
      >
        <i :class="`iconfont ${item}`"></i>
        <span>{{ item }}</span>
    </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.popcontainer {
  width: 100%;
  padding: 10px;

  .boxes {
    height: 200px;
    overflow-y: scroll;

    li {
      display: flex;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      width: 33%;
      float: left;
      vertical-align: middle;
      list-style: none !important;
    }

    li i {
      font-size: 25px;
    }

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 300;
      width: 85%;
    }
  }
}
</style>
