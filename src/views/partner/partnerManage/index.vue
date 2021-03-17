<template>
  <div class="partnerManage-page">
    <el-card class="page-card" shadow="never">
      <div class="head-container">
        <search @search="search" />
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
          <el-table-column prop="applyCity" label="城市名称">
            <template slot-scope="scope">
              <div
                v-if="!scope.row.streetCode"
                class="link"
                @click="toRegionalPartner(scope.row)"
              >
                {{ scope.row.applyCity }}
                {{ scope.row.areaCooper || "" }}
              </div>
              <span v-else>
                {{ scope.row.applyCity }}
                {{ scope.row.areaCooper || "" }}
                {{ scope.row.street || "" }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="province" label="所属省份" width="120" />
          <el-table-column label="签约状态" width="180">
            <template slot-scope="scope">
              {{ scope.row.status === "1" ? "已签约" : "未签约" }}
            </template>
          </el-table-column>
          <el-table-column label="签约人" width="120">
            <template slot-scope="scope">
              {{ scope.row.signPerson }}
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="电话" width="120" />
          <el-table-column prop="applyCount" label="区域合伙人" width="120">
            <template slot-scope="scope">
              {{ scope.row.applyCount }}
            </template>
          </el-table-column>
          <el-table-column prop="applyCount" label="申请人数" width="120" />
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
            :current-page="query.currentPage"
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
import Add from '../components/add'
import { platformGetAll, platformDelete } from '@/api/index'
import search from './search'
import cityData from '@/utils/city.js'
import udOperation from '@/components/Crud/UD.operation'
export default {
  components: { udOperation, search, Add },
  data() {
    return {
      tableLoading: true,
      cityData,
      query: {
        province: '',
        provinceCode: '',
        applyCity: '',
        cityCode: '',
        areaCooper: '',
        areaCode: '',
        street: '',
        streetCode: '',
        status: '',
        signPerson: '',
        phone: '',
        pageSize: 10,
        pageNo: 1
      },
      total: 0,
      tableData: [],
      statusOptions: [
        {
          value: 1,
          label: '签约'
        },
        {
          value: 0,
          label: '未签约'
        }
      ],
      options: [],
      value: ''
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
    // 跳转到区域合伙人
    toRegionalPartner(row) {
      localStorage.setItem('partnerInfo', JSON.stringify(row))
      this.$router.push({
        name: 'RegionalPartner'
      })
    },
    handleSizeChange() {},
    handleCurrentChange(v) {
      this.query.pageNo = v
      this.getTableData()
    },
    getTableData() {
      platformGetAll(this.query).then((res) => {
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
    add() {
      this.$refs.add.dialogVisible = true
      this.$refs.add.isAdd = true
    },
    edit(data) {
      console.log('edit-data: ', data)
      localStorage.setItem('editDtata', JSON.stringify(data))
      this.$refs.add.isAdd = false
      const {
        id,
        province,
        provinceCode,
        applyCity,
        cityCode,
        areaCooper,
        areaCode,
        street,
        streetCode,
        phone,
        signPerson,
        status,
        applyCount
      } = data

      let statusStr = ''
      if (status) {
        statusStr = status.toString()
      } else {
        statusStr = '0'
      }
      this.$refs.add.partnerForm = {
        id,
        province,
        provinceCode,
        applyCity,
        cityCode,
        areaCooper,
        areaCode,
        street,
        streetCode,
        phone,
        signPerson,
        status: statusStr,
        applyCount
      }
      this.$refs.add.isSelCity = false
      this.$refs.add.isSelArea = false
      this.$refs.add.isSelStreet = false
      if (data.streetCode !== '') {
        // 街道
        this.$refs.add.selLevel = '4'
        this.$refs.add.isShowArea = true
        this.$refs.add.isShowStreet = true
        this.$refs.add.getAreaOptions(data.cityCode)
        this.$refs.add.getstreetOptions(data.areaCode)
      }
      if (data.areaCode !== '' && data.streetCode === '') {
        // alert('区')
        // 区
        this.$refs.add.selLevel = '3'
        this.$refs.add.isShowArea = true
        this.$refs.add.isShowStreet = false
        this.$refs.add.getAreaOptions(data.cityCode)
        this.$refs.add.getstreetOptions(data.areaCode)
      }
      if (data.cityCode !== '' && data.areaCode === '') {
        // 市
        this.$refs.add.selLevel = '2'
        this.$refs.add.isShowArea = false
        this.$refs.add.isShowStreet = false
      }
      this.$refs.add.getCityOptions(data.provinceCode)
      this.$refs.add.dialogVisible = true
    },
    del(row) {
      console.log('par-del-row: ', row)
      platformDelete(row.id).then((res) => {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.cell .link {
  color: #1890ff;
  cursor: pointer;
}
</style>
