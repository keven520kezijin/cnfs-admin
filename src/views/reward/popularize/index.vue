<template>
  <div class="popularize-page">
    <el-card class="page-card" shadow="never">
      <Search @search="search" />
      <add-details ref="details" />
      <el-button
        icon="el-icon-plus"
        type="success"
        @click="pass"
      >审核通过</el-button>
      <el-button
        icon="el-icon-plus"
        type="warning"
        @click="refuse"
      >拒绝</el-button>

      <!--表格渲染-->
      <el-table
        v-loading="loading"
        :data="tableData"
        class="el-table-box"
        :header-cell-style="{ background: '#fafafa', color: '#333' }"
      >
        <el-table-column type="selection" width="55" :selectable="selectable" />
        <el-table-column prop="applyTitle" label="申请内容" />
        <el-table-column prop="applyDetail" width="180" label="申请描述" />
        <el-table-column prop="applyBeans" width="180" label="申请奖励拍豆" />
        <el-table-column prop="proDate" width="180" label="发生日期" />
        <el-table-column prop="applyPerson" width="180" label="申请人" />
        <el-table-column prop="applyDate" width="180" label="申请时间" />
        <el-table-column prop="updateDate" width="180" label="更新时间" />
        <el-table-column prop="applyStatus" width="180" label="申请状态" />
        <el-table-column prop="oneLevel" width="180" label="一级审核" />
        <el-table-column prop="twoLevel" width="180" label="二级审核" />
        <el-table-column label="详情" width="180" align="center" fixed="right">
          <template slot-scope="scope">
            <span class="tab-text" @click="detail(scope)"> 查看 </span>
          </template>
        </el-table-column>
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
import { promotionGetAll } from '@/api/index'
import Search from './search'
import addDetails from './details'
export default {
  components: { Search, addDetails },
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
    selectable(row, index) {
      console.log(row, index)
    },
    refuse() {},
    pass() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    detail(data) {
      this.$refs.details.detailsDialogVisible = true
    },
    getTableData() {
      promotionGetAll(this.query).then((res) => {
        if (res.code === '200') {
          this.loading = false
          this.loading = false
          this.tableData = res.data
          this.total = res.page.total
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
