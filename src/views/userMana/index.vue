<template>
  <div class="userMana-page">
    <el-card class="page-card" shadow="never">
      <Search @search="search" />
      <pop ref="detailsPop" />
      <el-table
        :data="tableData"
        style="width: 100%"
        class="el-table-box"
        :header-cell-style="{ background: '#fafafa', color: '#333' }"
      >
        <el-table-column prop="name" label="用户名" />
        <el-table-column prop="phone" label="手机号" width="180" />
        <el-table-column prop="nickname" label="昵称" width="160" />
        <el-table-column prop="city" label="城市" width="160" />
        <el-table-column prop="registerDate" label="注册时间" width="180" />
        <el-table-column
          prop="lastLoginDate"
          label="最后登录时间"
          width="180"
        />
        <el-table-column
          label="用户详情"
          width="180"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <span class="tab-text finger" @click="lookUp(scope.row)">
              查看
            </span>
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
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import pop from './pop'
import Search from './search'
import { userManageGetAll } from '@/api/index'
export default {
  components: { Search, pop },
  data() {
    return {
      total: 0,
      tableData: [],
      query: {
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    lookUp(row) {
      this.$refs.detailsPop.dialogVisible = true
      console.log('row: ', row)
    },
    search(query) {
      this.query = { ...query, pageNo: 1, pageSize: 10 }
      console.log('query: ', this.query)
      this.getTableData()
    },
    handleCurrentChange() {},
    getTableData() {
      userManageGetAll(this.query).then((res) => {
        console.log('getTableData - res: ', res)
        this.tableData = res.data
        this.total = res.page.total
      })
    }
  }
}
</script>

<style>
</style>
