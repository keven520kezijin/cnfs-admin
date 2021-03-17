<template>
  <!--社区奖励-->
  <div class="community-page">
    <el-card class="page-card" shadow="never">
      <Search @search="search" />
      <Add ref="add" />
      <Batch ref="batch" />
      <el-button
        icon="el-icon-plus"
        type="success"
        @click="add"
      >发放奖励</el-button>
      <el-button
        icon="el-icon-plus"
        type="success"
        @click="openBatch"
      >批量发放奖励</el-button>
      <el-button
        icon="el-icon-plus"
        type="success"
        @click="pass"
      >审核通过</el-button>
      <el-button
        icon="el-icon-plus"
        type="warning"
        @click="pass"
      >拒绝</el-button>
      <!--表格渲染-->
      <el-table
        v-loading="loading"
        :data="tableData"
        class="el-table-box"
        :header-cell-style="{ background: '#fafafa', color: '#333' }"
      >
        <el-table-column prop="applyTitle" label="申请内容" />
        <el-table-column prop="rewardPerson" width="180" label="奖励人" />
        <el-table-column prop="modification_time" width="180" label="手机号" />
        <el-table-column
          prop="modification_time"
          width="180"
          label="奖励描述"
        />
        <el-table-column prop="applyPerson" width="180" label="申请人" />
        <el-table-column
          prop="rewardBeans"
          width="180"
          label="奖励拍豆"
        />
        <el-table-column
          prop="gotDate"
          width="180"
          label="发放时间"
        />
        <el-table-column
          prop="updateDate"
          width="180"
          label="更新时间"
        />
        <el-table-column
          prop="getStatus"
          width="180"
          label="发放状态"
        />
        <el-table-column prop="grantPerson" width="180" label="发放人" />
        <el-table-column prop="applyPerson" width="180" label="审核人" />
      </el-table>
      <div class="pagination-box">
        <el-pagination
          background
          :current-page="query.pageNo"
          :page-size="query.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { communityGetAll } from '@/api/index'
import Add from './add'
import Batch from './batch'
import Search from './search'
export default {
  components: { Add, Batch, Search },
  data() {
    return {
      loading: true,
      query: {
        pageSize: 10,
        pageNo: 1
      },
      total: 0,
      tableData: []
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    search(query) {
      this.query = { ...this.query, ...query }
      console.log('query: ', this.query)
      this.getTableData()
    },
    pass() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    add() {
      this.$refs.add.dialogVisible = true
      this.$refs.add.isAdd = true
    },
    openBatch() {
      this.$refs.batch.dialogVisible = true
    },
    getTableData() {
      communityGetAll(this.query)
        .then((res) => {
          if (res.code === '200') {
            this.loading = false
            this.tableData = res.data
            this.total = res.page.total
          }
        })
        .catch((e) => {
          console.log('e: ', e)
        })
    },
    detail(data) {}
  }
}
</script>

<style lang="scss" scoped>
.tab-text {
  color: #1890ff;
}
</style>
