<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Check, Close } from '@element-plus/icons-vue'

// 定义emit
const emit = defineEmits(['on-load-success'])

type TableConfig = {
  loading: boolean;
  loadingSvg: string;
  loadingText: string;
  loadingSvgViewBox: string;
};

const tableConfig: TableConfig = reactive({
    loading: false,
    loadingText: '正在努力加载中...',
    loadingSvg:
    '<path class="path" d="M 30 15 L 28 17 M 25.61 25.61 A 15 15, 0, 0, 1, 15 30 A 15 15, 0, 1, 1, 27.99 7.5 L 15 15" style="stroke-width: 3px; fill: rgba(0, 0, 0, 0);"/>',
    loadingSvgViewBox: '-10, -10, 50, 50'
})

type PropsType = {
  // Api 接口 axios
  api?: any;
  // 参数
  params?: any;
  // 模式 api/demo
  model: string;
  // 立即执行
  immediately: boolean;
  // 底部
  footer: boolean;
  // 演示数据
  demoData: any;
  // 多选
  selection?: boolean;
};

const props = withDefaults(defineProps<PropsType>(), {
    api: null,
    params: {
        pageNumber: 1,
        pageSize: 15,
        totalRow: -1
    },
    model: 'demo',
    immediately: true,
    footer: true,
    demoData: [],
    selection: true
})

// 表格数据,分页:{records: [{},{}...],totalRow: number},不分页：[{},{}]
const tableData = reactive({
    records: [],
    totalRow: 0
})
const params = props.params

// Demo 模拟数据
const onLoadDemoData = (): void => {
    tableData.records = props.demoData
    tableConfig.loading = false
    // footerFixed()
}
// API 接口数据
const onLoadApiData = (): void => {
    props
        .api(props.params)
        .then((res: { data: any }) => {
            if (props.footer) {
                tableData.records = res.data.records
                tableData.totalRow = res.data.totalRow
                params.totalRow = res.data.totalRow
            } else {
                tableData.records = res.data
                tableData.totalRow = res.data.length
            }
            tableConfig.loading = false
            // footerFixed()
            setTimeout(() => {
                emit('on-load-success')
            })
        })
        .catch((e: any) => {
            tableConfig.loading = false
            // footerFixed()
        })
}
// 初始化数据

// const isScorll = ref<boolean>(false)

const onInitTable = (): void => {
    tableConfig.loading = true
    setTimeout(() => {
        if (props.model === 'api') onLoadApiData()
        if (props.model === 'demo') onLoadDemoData()
    // footerFixed()
    }, 500)
}
// const windowH = document.documentElement.clientHeight - 54
// const footerFixed = () => {
//     nextTick(() => {
//         const tableH = tableRef.value.$el.clientHeight + 118
//         isScorll.value = tableH > windowH
//     })
// }

const onSizeChange = (): void => onInitTable()
const onCurrentChange = (): void => onInitTable()

onMounted(() => {
    if (props.immediately) onInitTable()
})

const tableRef = ref()
defineExpose({
    tableRef,
    refresh: (): void => onInitTable()
})

const conf = ref({
    stripe: true,
    border: true,
    showHeader: true,
    scrollbarAlwaysOn: false
})
</script>
<template>
  <el-table
    ref="tableRef"
    v-loading="tableConfig.loading"
    :element-loading-svg="tableConfig.loadingSvg"
    :element-loading-svg-view-box="tableConfig.loadingSvgViewBox"
    :element-loading-text="tableConfig.loadingText"
    :border="conf.border"
    :stripe="conf.stripe"
    :data="tableData.records"
    :scrollbar-always-on="conf.scrollbarAlwaysOn"
    :show-header="conf.showHeader"
    v-bind="$attrs"
  >
    <el-table-column
      v-if="selection && footer"
      type="selection"
      fixed="left"
      width="50"
      align="center"
    />
    <slot />
  </el-table>
  <!-- <div class="footer" :class="isScorll ? 'footer-fixed' : ''" v-if="footer"> -->
  <div class="footer" v-if="footer">
    <div class="right">
      <el-dropdown trigger="click" placement="top">
        <el-button text bg style="padding: 9px">
          <svg
            t="1676277937013"
            viewBox="0 0 1024 1024"
            version="1.1"
            p-id="3594"
            width="20"
            height="20"
          >
            <path
              d="M184.2 203.3c-47.6 0-86.2 38.6-86.2 86.2s38.6 86.2 86.2 86.2 86.2-38.6 86.2-86.2-38.6-86.2-86.2-86.2z m0 229.8c-47.6 0-86.2 38.6-86.2 86.2s38.6 86.2 86.2 86.2 86.2-38.6 86.2-86.2-38.6-86.2-86.2-86.2z m0 229.9c-47.6 0-86.2 38.6-86.2 86.2s38.6 86.2 86.2 86.2 86.2-38.6 86.2-86.2-38.6-86.2-86.2-86.2z m229.9-316.1h459.7c31.7 0 57.5-25.7 57.5-57.5 0-31.7-25.7-57.5-57.5-57.5H414.1c-31.7 0-57.5 25.7-57.5 57.5s25.7 57.5 57.5 57.5z m459.7 115H414.1c-31.7 0-57.5 25.7-57.5 57.5 0 31.7 25.7 57.5 57.5 57.5h459.7c31.7 0 57.5-25.7 57.5-57.5-0.1-31.8-25.8-57.5-57.5-57.5z m0 229.8H414.1c-31.7 0-57.5 25.7-57.5 57.5 0 31.7 25.7 57.5 57.5 57.5h459.7c31.7 0 57.5-25.7 57.5-57.5-0.1-31.7-25.8-57.5-57.5-57.5z"
              p-id="3595"
            ></path>
          </svg>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-switch
                v-model="conf.showHeader"
                style="margin-right: 8px"
                inline-prompt
                :active-icon="Check"
                :inactive-icon="Close"
              />
              <span>显示表头</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-switch
                v-model="conf.stripe"
                style="margin-right: 8px"
                inline-prompt
                :active-icon="Check"
                :inactive-icon="Close"
              />
              <span>显示斑马纹</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-switch
                v-model="conf.border"
                style="margin-right: 8px"
                inline-prompt
                :active-icon="Check"
                :inactive-icon="Close"
              />
              <span>显示横向分割线</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-switch
                v-model="conf.scrollbarAlwaysOn"
                style="margin-right: 8px"
                inline-prompt
                :active-icon="Check"
                :inactive-icon="Close"
              />
              <span>总是显示滚动条</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-pagination
        class="footer-page"
        v-model:currentPage="params.pageNumber"
        v-model:page-size="params.pageSize"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        background
        layout="prev, pager, next, sizes,  total, jumper"
        :page-sizes="[10, 15, 20, 30, 50]"
        :total="tableData.totalRow"
      />
    </div>
    <div class="footer-tools">
      <slot name="tools"></slot>
    </div>
  </div>
</template>
<style scoped lang="scss">
.footer {
  margin-top: 12px;
  display: flex;
  gap: 21px;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  flex-direction: row-reverse;

  .right {
    display: flex;
    gap: 12px;

    svg {
      path {
        fill: var(--el-text-color-secondary);
      }
    }
  }

  &-tools {
    display: flex;
    gap: 12px;
  }

  :deep(.el-pagination) {
    padding: 2px 0;
  }
}

.footer-fixed {
  width: 100%;
  padding: 6px 10px;
  bottom: 0;
  z-index: 999;
  border-radius: 0 0 6px 6px;
  background-color: var(--el-color-info-light-3);
}
</style>
