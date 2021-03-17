<template>
  <div class="head-container">
    <span class="laber">申请人名称：</span>
    <el-input
      v-model="query.coopName"
      clearable
      size="small"
      placeholder="请输入申请人名称"
      style="width: 150px"
      class="filter-item"
    />

    <span class="laber">申请人手机号：</span>
    <el-input
      v-model="query.coopPhone"
      clearable
      size="small"
      placeholder="请输入申请人手机号"
      style="width: 150px"
      class="filter-item"
    />

    <span class="laber">申请人所属城市：</span>
    <el-input
      v-model="query.localCity"
      clearable
      size="small"
      placeholder="请输入申请人所属城市"
      class="filter-item signer"
    />

    <span class="laber">申请时间：</span>
    <el-date-picker
      v-model="query.applicationDate"
      class="date-picker"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="datePickerOptions"
    />

    <el-button type="primary" @click="search">搜索</el-button>
    <el-button type="warning" @click="resetForm">重置</el-button>
  </div>
</template>

<script>
import searchMixin from '@/views/mixin/search.js'
import cityData from '@/utils/city.js'
export default {
  mixins: [searchMixin],
  data() {
    return {
      cityData,
      query: {
        coopName: '',
        coopPhone: '',
        applicationDate: '',
        localCity: ''
      },
      datePickerOptions: {
        disabledDate: (time) => {
          const nowDate = new Date()
          // const oneDay = 1000 * 60 * 60 * 24
          // const oneYearLater = new Date(nowDate.getTime() + oneDay * 365)
          return time.getTime() > nowDate // 注意是||不是&&
        }
      }
    }
  },
  methods: {
    resetForm() {
      this.query = {
        id: '',
        pubDate: '',
        title: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input--small .el-input__inner {
  padding: 0 15px;
}
.head-container {
  margin-top: 10px;
  margin-bottom: 10px;
  .filter-item {
    margin-right: 20px;
  }
  .city-cascader {
    width: 240px;
    margin-right: 20px;
  }
  .select-province-box {
    width: 180px;
    margin-right: 20px;
  }
  .select-status-box {
    width: 100px;
    margin-right: 20px;
  }
  .date-picker {
    width: 250px;
    margin-right: 20px;
  }
  .signer {
    width: 180px;
    margin-right: 20px;
  }
  .phone {
    width: 140px;
    margin-right: 20px;
  }
}
</style>
