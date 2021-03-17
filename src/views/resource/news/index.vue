<template>
  <div class="news-page">
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
          v-loading="tableLoading"
          :data="tableData"
          style="width: 100%"
          class="el-table-box"
          :header-cell-style="{ background: '#fafafa', color: '#333' }"
        >
          <el-table-column prop="photo" label="缩略图" width="120">
            <template slot-scope="scope">
              <img class="tab-img" :src="scope.row.img" height="40">
            </template>
          </el-table-column>
          <el-table-column prop="title" label="资讯标题" />
          <el-table-column prop="type" label="展示位置" width="120">
            <template slot-scope="scope">
              {{ scope.row.type | newsType }}
            </template>
          </el-table-column>
          <el-table-column prop="weight" label="排序权重" width="80" />
          <el-table-column label="是否展示" width="80">
            <template slot-scope="scope">
              <udSwitch :scope-data="scope.row" type="information" />
            </template>
          </el-table-column>
          <el-table-column prop="pubDate" label="发布时间" width="180" />
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
import {
  informationGetAll,
  deleteInfo,
  getInformationDetail
} from '@/api/index'
import Search from './search'
import udOperation from '@/components/Crud/UD.operation'
import udSwitch from '@/components/Crud/UD.switch'
import Add from './add'
export default {
  name: 'HorseLantern',
  components: { Search, Add, udOperation, udSwitch },
  data() {
    return {
      tableLoading: true,
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
    getTableData() {
      informationGetAll(this.query).then((res) => {
        console.log('informationGetAll-res: ', res)
        if (res.code === '200') {
          this.tableLoading = false
          if (res.data) {
            this.total = res.page.total
            this.tableData = res.data
          } else {
            this.total = 0
            this.tableData = []
          }
        }
      })
    },
    handleSizeChange() {},
    handleCurrentChange(v) {
      this.query.pageNo = v
      this.getTableData()
    },
    del(row) {
      deleteInfo(row.id).then((res) => {
        if (res.code === '200') {
          if (this.tableData.length === 1 && this.query.pageNo > 1) {
            this.query.pageNo = this.query.pageNo - 1
          }
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
      this.$refs.add.newsForm = {
        title: '',
        content: '',
        isShow: '0',
        weight: '0',
        type: '0',
        photo: '',
        img: ''
      }
      this.$refs.add.dialogVisible = true
      this.$refs.add.isAdd = true
    },
    edit(row) {
      // console.log("edit-row: ", row);
      getInformationDetail(row.id).then((res) => {
        // console.log("getInformationDetail - res: ", res);
        if (res.code === '200') {
          const {
            content,
            isShow,
            title,
            weight,
            id,
            type,
            photo,
            img
          } = res.data
          if (img) {
            const fileImg = []
            const obj = {}
            obj.name = 'kzj'
            obj.url = img
            fileImg.push(obj)
            console.log('fileImg： ', fileImg)
            this.$refs.add.fileImg = fileImg
          }
          setTimeout(() => {
            this.$refs.add.newsForm = {
              content,
              isShow,
              title,
              weight,
              id,
              type,
              photo,
              img
            }
            this.$refs.add.dialogVisible = true
            this.$refs.add.isAdd = false
          }, 20)
        }
      })
    }
  }
}
</script>

<style>
</style>
