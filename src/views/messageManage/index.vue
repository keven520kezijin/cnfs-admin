<template>
  <div class="messageManage-page">
    <el-card class="page-card" shadow="never">
      <div class="head-container">
        <Search @search="search" />
        <Add ref="add" />
        <Details ref="lookUpCom" />
        <el-button
          icon="el-icon-plus"
          type="success"
          @click="add"
        >新增</el-button>
        <!--表格渲染-->
        <el-table
          :data="tableData"
          style="width: 100%"
          class="el-table-box"
          :header-cell-style="{ background: '#fafafa', color: '#333' }"
        >
          <el-table-column prop="messId" label="消息ID" width="80" />
          <el-table-column prop="title" label="消息标题" width="180" />
          <el-table-column prop="introduction" label="消息简介" />
          <el-table-column prop="sendCount" label="发送目标数" width="100" />
          <el-table-column prop="noReadCount" label="未读数" width="80" />
          <el-table-column prop="pubDate" label="发送时间" width="180" />
          <el-table-column
            label="消息详情"
            width="180"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <span class="tab-text" @click="lookUp(scope.row)"> 查看 </span>
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
      </div>
    </el-card>
  </div>
</template>

<script>
// http://47.104.20.233:8089/cnfs-platform/messageManage/getAll
import { getMessageManage } from '@/api/index'
import Search from './search'
import Add from './add'
import Details from './details'
export default {
  name: 'Banner',
  components: { Search, Add, Details },
  data() {
    return {
      msg: 'kv',
      total: 0,
      query: {
        pageNo: 1,
        pageSize: 10
      },
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
    handleSizeChange() {},
    handleCurrentChange(v) {
      this.query.pageNo = v
      this.getTableData()
    },
    detail() {},
    getTableData() {
      getMessageManage(this.query).then((res) => {
        console.log('res: ', res)
        if (res.code === '200') {
          this.tableData = res.data
          this.total = res.page.total
        }
      })
    },
    add(row) {
      this.$refs.add.isAdd = true
      this.$refs.add.dialogVisible = true
      this.$refs.add.content = row.content
    },
    lookUp(row) {
      this.$refs.lookUpCom.dialogVisible = true
      this.$refs.lookUpCom.content = row.content
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-img {
  height: 30px;
}
.tab-text {
  cursor: pointer;
}
</style>
