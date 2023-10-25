<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { MoreFilled, Search, Download } from '@element-plus/icons-vue'
import { downloadBlobFile } from '@ued/utils/src/utils'
import { ref, reactive } from 'vue'
import dayjs from 'dayjs'

import { ILog, ILogList } from './entity/log'
import { getRightLogList, exportLog } from './service/logServices'

const tableListRef = ref()
// const loading = ref<boolean>(false)
const dates = ref<number[]>([])
const params = reactive<ILogList.RequestForm>({
    pageNumber: 1,
    pageSize: 15,
    totalRow: -1
})

// 删除
// const deleteLog = (ids: number[]) => {
//     loading.value = true
//     ElMessageBox.confirm('确认删除日志吗?', '删除', { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning' }).then(() => {
//         delLog(ids).then((res) => {
//             if (res.code === 0) {
//                 if (res.data === false) {
//                     ElMessage.error(res.msg)
//                 } else {
//                     ElMessage.success('删除成功')

//                     refreshTable()
//                 }
//             }
//             loading.value = false
//         })
//     })
// }
// 导出
const handleDropDown = (value: string) => {
    if (value === 'export') {
        exportLog(params).then((res) => {
            downloadBlobFile(res, '操作日志', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            ElMessage.success('导出成功')
        })
    }
}

const refreshTable = () => {
    tableListRef.value.refresh()
}
// 选择日期
const selectDate = (date: string[]) => {
    if (date === null) {
        params.beginTime = ''
        params.endTime = ''
    } else {
        params.beginTime = dayjs(date[0]).format('YYYY-MM-DD HH:mm:ss')
        params.endTime = dayjs(date[1]).format('YYYY-MM-DD HH:mm:ss')
    }
    refreshTable()
}
// 列表勾选
const checked = ref<Array<number>>([])
const setSelectionChange = (selection: ILog[]) => {
    checked.value = []
    checked.value = selection.map((el: ILog) => el.id!)
}
</script>

<template>
  <custom-table-layout>
    <template #header>
      <custom-header-layout>
        <template #left>
          <span>操作日志</span>
        </template>
        <template #right>
        </template>
      </custom-header-layout>
    </template>
    <template #toolbar>
      <custom-table-toolbar>
        <template #left>
          <el-input @change="refreshTable" placeholder="请输入操作用户" clearable v-model="params.username"
            :prefix-icon="Search" />
          <el-input @change="refreshTable" placeholder="请输入请求地址" clearable v-model="params.requestIp"
            :prefix-icon="Search" />
          <el-date-picker type="datetimerange" v-model="dates" start-placeholder="开始时间" end-placeholder="结束时间"
            @change="selectDate" />
        </template>
        <template #right>
          <el-dropdown @command="handleDropDown">
            <el-button text bg><el-icon>
                <MoreFilled />
              </el-icon></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="export" :icon="Download">
                  <span>批量导出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </custom-table-toolbar>
    </template>
    <template #table>
      <custom-table ref="tableListRef" model="api" :api="getRightLogList" :params="params"
        @selection-change="setSelectionChange" :selection="false">
        <el-table-column type="expand">
          <template #default="props">
            <el-form label-position="left">
              <el-form-item label="请求方法:" style="margin-left: 15px;">
                <span style="color: #c0c0c0; font-size: 14px">{{
                  props.row.method
                }}</span>
              </el-form-item>
              <el-form-item label="请求参数:" style="margin-left: 15px;">
                <span style="color: #c0c0c0; font-size: 14px">{{
                  props.row.params
                }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="操作信息" prop="annotation" show-overflow-tooltip />
        <el-table-column label="用户账号" prop="username" />
        <el-table-column label="浏览器" prop="browser" />
        <el-table-column label="请求IP" prop="requestIp" />
        <el-table-column label="请求位置" prop="address" />
        <el-table-column label="请求耗时" prop="costTime" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.costTime <= 300">{{ scope.row.costTime }}ms</el-tag>
            <el-tag v-else-if="scope.row.costTime <= 1000" type="warning">{{ scope.row.costTime }}ms</el-tag>
            <el-tag v-else type="danger">{{ scope.row.costTime }}ms</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作时间" prop="createTime">
          <template #default="scope">
            <span v-if="scope.row.createTime">{{
              dayjs(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss")
            }}</span>
           <span v-else></span>
          </template>
        </el-table-column>
        <!-- <el-table-column fixed="right" label="操作" width="60">
          <template #default="scope">
            <el-button :loading="loading" link type="danger" size="small" @click="deleteLog([scope.row.id])">删除</el-button>
          </template>
        </el-table-column> -->
        <!-- <template #tools>
          <el-button :loading="loading" :disabled="checked.length === 0" @click="deleteLog(checked)">批量删除</el-button>
        </template> -->
      </custom-table>
    </template>

  </custom-table-layout>
</template>