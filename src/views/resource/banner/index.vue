<template>
  <div class="banner-page">
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
          :data="tableData"
          style="width: 100%"
          class="el-table-box"
          :header-cell-style="{ background: '#fafafa', color: '#333' }"
        >
          <el-table-column prop="img" label="缩略图" width="120">
            <template slot-scope="scope">
              <img class="tab-img" :src="scope.row.photo">
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="type" label="展示位置" width="160">
            <template slot-scope="scope">
              {{ scope.row.type === '1' ? '协议实验室首页' : '协议实验室学术合作' }}
            </template>
          </el-table-column>
          <el-table-column prop="pubDate" label="发布时间" width="180" />
          <el-table-column prop="weight" label="排序权重" width="80" />
          <el-table-column label="是否展示" width="80">
            <template slot-scope="scope">
              <udSwitch :scope-data="scope.row" type="banner" />
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="180"
            align="center"
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
import { getBanner, bannerDelete } from '@/api/index'
import Search from './search'
import udOperation from '@/components/Crud/UD.operation'
import udSwitch from '@/components/Crud/UD.switch'
import Add from './add'
export default {
  name: 'Banner',
  components: { Search, Add, udOperation, udSwitch },
  data() {
    return {
      tableData: [],
      total: 0,
      query: {
        pageSize: 10,
        pageNo: 1
      }
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
    del(row) {
      console.log('del-row: ', row)
      bannerDelete(row.id).then(res => {
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
    getTableData() {
      getBanner(this.query)
        .then((res) => {
          if (res.code === '200') {
            this.tableData = res.data
            this.total = res.page.total
          }
        })
        .catch((e) => {
          console.log('e: ', e)
        })
    },
    add() {
      this.$refs.add.isAdd = true
      this.$refs.add.dialogVisible = true
    },
    edit(data) {
      console.log('data: ', data)
      this.$refs.add.isAdd = false
      this.$refs.add.dialogVisible = true
      const {
        id,
        title,
        weight,
        isShow,
        type,
        photo
      } = data
      this.$refs.add.bannerForm = {
        id,
        title,
        weight,
        isShow,
        type,
        photo
      }
      if (photo) {
        const fileImg = []
        const obj = {}
        obj.name = 'kzj'
        obj.url = photo
        fileImg.push(obj)
        this.$refs.add.fileImg = fileImg
      }
    },
    deleteUser(id) {
      console.log('id: ', id)
      this.$refs[id].doClose('1')
      console.log('this.$refs[id]: ', this.$refs[id])
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-img {
  height: 30px;
}
</style>
