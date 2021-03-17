<template>
  <div class="regionalPartner-page">
    <el-card class="page-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>{{ pageTitle }} - 区域合伙人</span>
      </div>
      <div class="head-container">
        <search @search="search" />
        <Add ref="add" />

        <el-button
          icon="el-icon-plus"
          type="success"
          @click="add"
        >新增</el-button>

        <!--表格渲染-->
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
              <div>
                {{ scope.row.applyCity }}
                {{ scope.row.areaCooper || "" }}
                {{ scope.row.street || "" }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="province" label="所属省份" width="120" />
          <el-table-column label="签约状态" width="180">
            <template slot-scope="scope">
              {{ scope.row.status === 1 ? "已签约" : "未签约" }}
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
import { Message } from 'element-ui'
import {
  // getAllProvinceCityCooper,
  // getAllCityAreaCooper,
  platformGetAll,
  platformDelete
} from '@/api/index'
import Add from '../components/add'
import search from './search'
import cityData from '@/utils/city.js'
import udOperation from '@/components/Crud/UD.operation'
export default {
  components: { Add, udOperation, search },
  data() {
    return {
      tableLoading: true,
      regionalPartnerLevel: '0', // 当前区域合伙人级别，市='2'， 区='3'
      level: 0,
      pageTitle: '',
      cityData,
      query: {
        pageNo: 1,
        pageSize: 10,
        province: '',
        provinceCode: '',
        applyCity: '',
        cityCode: '',
        areaCooper: '',
        areaCode: ''
      },
      total: 0,
      tableData: []
    }
  },
  created() {
    const partnerInfo = JSON.parse(localStorage.getItem('partnerInfo'))
    console.log('partnerInfo: ', partnerInfo)
    this.pageTitle = partnerInfo.applyCity + partnerInfo.areaCooper
    const {
      province,
      provinceCode,
      applyCity,
      cityCode,
      areaCooper,
      areaCode
    } = partnerInfo
    if (areaCode) {
      this.regionalPartnerLevel = '3'
      this.level = 4
    } else if (cityCode && !areaCode) {
      this.regionalPartnerLevel = '2'
      this.level = 3
    }
    this.query = {
      pageNo: 1,
      pageSize: 10,
      province,
      provinceCode,
      applyCity,
      level: this.level,
      cityCode,
      areaCooper,
      areaCode
    }
    this.getTableData()
  },
  methods: {
    // 搜索
    search(query) {
      this.query = { ...this.query, ...query }
      console.log('query: ', this.query)
      this.getTableData()
    },
    getTableData() {
      platformGetAll(this.query).then((res) => {
        console.log('platformGetAll - res: ', res)
        if (res.code === '200') {
          this.tableLoading = false
          if (res.data) {
            this.tableData = res.data
            if (res.page) {
              this.total = res.page.total
            }
          } else {
            this.tableData = []
            if (res.page) {
              this.total = res.page.total
            }
          }
        }
      })
      // if (this.level === 3) {
      //   alert(3)
      //   getAllProvinceCityCooper(this.query).then((res) => {
      //     console.log("getAllProvinceCityCooper-getTableData - res: ", res);
      //     this.tableData = res.data;
      //     this.total = res.page.total;
      //   });
      // } else if (this.level === 4) {
      //   alert(4)
      //   getAllCityAreaCooper(this.query).then((res) => {
      //     console.log("getAllCityAreaCooper-getTableData - res: ", res);
      //     this.tableData = res.data;
      //     this.total = res.page.total;
      //   });
      // }
    },
    handleChangeCity() {},
    handleSizeChange() {},
    handleCurrentChange(v) {
      console.log('v: ', v)
      this.query.pageNo = v
      console.log('this.query: ', this.query)
      this.getTableData()
    },
    add() {
      this.$refs.add.dialogVisible = true
      this.$refs.add.isAdd = true
    },
    edit(data) {
      console.log('data: ', data)
      localStorage.setItem('editDtata', JSON.stringify(data))
      this.$refs.add.isAdd = false
      this.$refs.add.getAreaOptions(data.cityCode)

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

      if (data.streetCode !== '') {
        // 街道
        this.$refs.add.selLevel = '4'
        this.$refs.add.isShowArea = true
        this.$refs.add.isShowStreet = true
        this.$refs.add.getAreaOptions(data.cityCode)
        this.$refs.add.getstreetOptions(data.areaCode)
      }
      if (data.areaCode !== '' && data.streetCode === '') {
        // 区
        // debugger;
        this.$refs.add.selLevel = '3'
        this.$refs.add.isShowArea = true
        this.$refs.add.isShowStreet = false
        this.$refs.add.getAreaOptions(data.cityCode)
        this.$refs.add.getstreetOptions(data.areaCode)
      }
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
      const provinceOptionsObj = {
        province,
        provinceCode
      }
      const cityOptionsObj = {
        applyCity,
        cityCode
      }
      this.$refs.add.provinceOptions = [provinceOptionsObj]
      this.$refs.add.cityOptions = [cityOptionsObj]
      this.$refs.add.dialogVisible = true
      // console.log('this.$refs.add.partnerForm: ', this.$refs.add.partnerForm)
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
  },

  beforeRouteLeave(to, from, next) {
    localStorage.removeItem('partnerInfo')
    next()
  }
}
</script>

<style lang="scss" scoped>
.cell a {
  color: #1890ff;
}
</style>
