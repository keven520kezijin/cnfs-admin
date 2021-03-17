<template>
  <div class="horseLantern-page">
    <el-card class="page-card" shadow="never">
      <div class="head-container">
        <Search @search="search" />
        <Add ref="add" />
        <el-button
          icon="el-icon-plus"
          type="success"
          @click="add"
        >新增</el-button>

        <!--表格渲染-->
        <el-table
          v-loading="loading"
          :data="tableData"
          class="el-table-box"
          :header-cell-style="{ background: '#fafafa', color: '#333' }"
        >
          <el-table-column prop="title" label="标题" />
          <el-table-column
            prop="pubDate"
            width="180"
            label="发布时间"
          >
            <template slot-scope="scope">
              {{ scope.row.pubDate }}
            </template>
          </el-table-column>
          <el-table-column prop="weight" width="80" label="排序权重" />
          <el-table-column label="是否展示" width="80">
            <template slot-scope="scope">
              <udSwitch :scope-data="scope.row" type="marquee" />
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="180"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <udOperation :data="scope.row" @edit="edit" @del="del" />
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
      </div>
    </el-card>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import Search from './search'
import { getMarquee, marqueeDelete } from '@/api/index'
import udOperation from '@/components/Crud/UD.operation'
import udSwitch from '@/components/Crud/UD.switch'
import Add from './add'
export default {
  name: 'HorseLantern',
  components: { Add, Search, udOperation, udSwitch },
  data() {
    return {
      loading: true,
      query: {
        pageSize: 10,
        pageNo: 1,
        title: ''
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
    handleCurrentChange() {},
    handleSizeChange() {},
    getTableData() {
      getMarquee(this.query).then((res) => {
        console.log('getMarquee-res: ', res)
        if (res.code === '200') {
          if (res.data) {
            this.loading = false
            this.total = res.page.total
            this.tableData = res.data
          } else {
            this.total = 0
            this.tableData = []
          }
        }
      })
    },
    del(row) {
      console.log('del-row: ', row)
      const data = {
        id: row.id
      }
      marqueeDelete(data).then(res => {
        if (res.code === '200') {
          Message({
            message: '删除成功',
            type: 'success'
          })
          this.getTableData()
        } else {
          Message({
            message: '删除失败',
            type: 'error'
          })
        }
      })
    },
    add() {
      this.$refs.add.dialogVisible = true
      this.$refs.add.isAdd = true
    },
    edit(row) {
      this.$refs.add.dialogVisible = true
      this.$refs.add.isAdd = false
      console.log('row: ', row)
      const { id, title, weight, isShow } = row
      this.$refs.add.ruleForm = { id, title, weight, isShow }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-container {
  margin-top: 10px;
  margin-bottom: 20px;
  .filter-item {
    margin-right: 20px;
  }
}

.el-table-box {
  width: 100%;
  margin-top: 20px;
}

.page-card {
  padding-bottom: 20px;
}
</style>
