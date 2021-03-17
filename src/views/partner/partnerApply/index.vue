<template>
  <div class="partnerApply-page">
    <el-card class="page-card" shadow="never">
      <search @search="search" />
      <add ref="add" />
      <el-button
        icon="el-icon-download"
        type="success"
        :disabled="!coopers.length"
        @click="batchExport"
      >批量导出</el-button>
      <el-table
        v-loading="tableLoading"
        class="table-level"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#fafafa', color: '#333' }"
        @selection-change="handleSelectionTableChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="coopName" label="姓名" width="180" />
        <el-table-column prop="coopPhone" label="手机号" width="120" />
        <el-table-column prop="coopCompany" label="公司名称" width="180" />
        <el-table-column prop="localCity" label="常驻城市" width="180" />
        <el-table-column prop="applyCity" label="申请的城市" width="180" />
        <el-table-column label="导出状态">
          <template>
            <span>已导出</span>
          </template>
        </el-table-column>
        <el-table-column prop="pubDate" label="申请日期" />
        <el-table-column label="详情">
          <template slot-scope="scope">
            <span class="check-span" @click="check(scope.row)">查看</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-box">
        <el-pagination
          background
          :current-page="query.currentPage"
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
import add from './add'
import { getAllCooperation, wordExport, exportDownLoad } from '@/api/index'
import tableMixin from '@/views/mixin/table.js'
import search from './search'
export default {
  components: {
    search,
    add
  },
  mixins: [tableMixin],
  data() {
    return {
      elink: document.createElement('a'),
      tableLoading: true,
      coopers: [],
      query: {
        pageSize: 10,
        pageNo: 1,
        coopName: '',
        coopPhone: '',
        localCity: ''
      }
    }
  },
  methods: {
    batchExport() {
      const data = {
        coopers: this.coopers
      }
      wordExport(data).then((_) => {
        exportDownLoad(data).then((res) => {
          console.log('batchExport-exportDownLoad-res', res)

          if (res.code === '200') {
            let i = 0
            const timr = setInterval(() => {
              if (i < res.data.length) {
                const a = document.createElement('a')
                const objectUrl = res.data[i].wordUrl
                a.setAttribute('href', objectUrl)
                a.click()
                i++
              } else {
                clearInterval(timr)
              }
            }, 200)
          }
        })
        // let a = document.createElement("a");

        // //ArrayBuffer 转为 Blob
        // let blob = new Blob([res], {
        //   type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        // });
        // console.log('blob: ', blob)

        // let objectUrl = URL.createObjectURL(blob);
        // a.setAttribute("href", objectUrl);
        // a.setAttribute("download", "111.docx");
        // a.click();
      })
    },
    handleSelectionTableChange(v) {
      console.log('handleSelectionTableChange-v: ', v)
      this.coopers = []
      v.forEach((item) => {
        this.coopers.push(item.id)
      })
      console.log('coopers: ', this.coopers)
    },
    getTableData() {
      getAllCooperation(this.query).then((res) => {
        console.log('platformGetAll - res: ', res)
        if (res.code === '200') {
          this.tableLoading = false
          if (res.data) {
            this.tableData = res.data
            this.total = res.page.total
          } else {
            this.tableData = []
            if (res.page) {
              this.total = res.page.total
            }
          }
        }
      })
    },
    check(row) {
      this.$refs.add.dialogVisible = true
      this.$refs.add.applyData = row
    }
  }
}
</script>

<style lang="scss" scoped>
.check-span {
  color: #1890ff;
  cursor: pointer;
}
.table-level {
  margin-top: 20px;
}
</style>
