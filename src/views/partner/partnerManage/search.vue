<template>
  <div class="head-container">
    <el-row>
      <span class="laber">所属省份：</span>
      <el-select
        v-model="query.provinceCode"
        clearable
        class="city-select"
        placeholder="请选择省"
        @clear="clearProvince"
        @change="changeProvince"
      >
        <el-option
          v-for="item in provinceOptions"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>

      <span class="laber">城市名称：</span>
      <el-select
        v-model="query.cityCode"
        clearable
        :disabled="isSelCity"
        class="city-select"
        placeholder="请选择市"
        @clear="clearCity"
        @change="changeCity"
      >
        <el-option
          v-for="item in cityOptions"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>

      <span class="laber">区名称：</span>
      <el-select
        v-model="query.areaCode"
        clearable
        :disabled="isSelArea"
        class="city-select"
        placeholder="请选择区"
        @clear="clearArea"
        @change="changeArea"
      >
        <el-option
          v-for="item in areaOptions"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>

      <span class="laber">街道名称：</span>
      <el-select
        v-model="query.streetCode"
        clearable
        :disabled="isSelStree"
        class="city-select"
        placeholder="请选择街道"
        @clear="clearStreet"
        @change="changestreet"
      >
        <el-option
          v-for="item in streetOptions"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
    </el-row>

    <el-row style="margin-top: 20px">
      <span class="laber">签约状态：</span>
      <el-select
        v-model="query.status"
        clearable
        class="select-status-box"
        placeholder="请选择"
      >
        <el-option
          v-for="item in signStatusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </el-select>

      <span class="laber">签约人：</span>
      <el-input
        v-model="query.signPerson"
        clearable
        size="small"
        placeholder="签约人名字"
        class="filter-item signer"
      />

      <span class="laber">电话：</span>
      <el-input
        v-model="query.phone"
        size="small"
        placeholder="请输入电话"
        class="filter-item phone"
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
    </el-row>
  </div>
</template>

<script>
import { signStatusOptions } from '@/utils/data'
import {
  cNProvinceGetAll,
  getCityByProvinceCode,
  getAreaByCityCode,
  getStreetByAreaCode
} from '@/api/index'
export default {
  data() {
    return {
      isSelCity: true, // 是否选城市
      isSelArea: true, // 是否选区
      isSelStree: true, // 是否选街道
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
        phone: ''
      },
      datePickerOptions: {
        disabledDate: (time) => {
          const nowDate = new Date()
          // const oneDay = 1000 * 60 * 60 * 24
          // const oneYearLater = new Date(nowDate.getTime() + oneDay * 365)
          return time.getTime() > nowDate // 注意是||不是&&
        }
      },
      signStatusOptions,
      provinceOptions: [],
      cityOptions: [], // 市选项
      areaOptions: [], // 区选项
      streetOptions: [] // 街道选项
    }
  },
  created() {
    this.getProvinceOptions()
  },
  methods: {
    clearProvince() {
      this.query.provinceCode = ''
      this.query.province = ''
      this.clearCity()
    },
    clearCity() {
      this.query.cityCode = ''
      this.query.applyCity = ''
      this.clearArea()
    },
    clearArea() {
      this.query.areaCode = ''
      this.query.areaCooper = ''
      this.query.street = ''
      this.query.streetCode = ''
    },
    clearStreet() {
      this.query.street = ''
    },
    resetForm() {
      this.isSelCity = true
      this.isSelArea = true
      this.isSelStree = true
      this.query = {
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
        phone: ''
      }
    },
    search() {
      this.$emit('search', this.query)
    },
    getProvinceOptions() {
      cNProvinceGetAll().then((res) => {
        console.log('getProvinceOptions-res: ', res)
        this.provinceOptions = res.data
      })
    },
    getCityOptions(code) {
      console.log('getCityOptions-code: ', code)
      getCityByProvinceCode(code).then((res) => {
        this.cityOptions = this.num2String(res.data)
      })
    },
    getAreaOptions(code) {
      getAreaByCityCode(code).then((res) => {
        this.areaOptions = this.num2String(res.data)
      })
    },
    getstreetOptions(code) {
      getStreetByAreaCode(code).then((res) => {
        console.log('getstreetOptions-res: ', res)
        this.streetOptions = this.num2String(res.data)
      })
    },
    num2String(data) {
      data.map((item) => {
        item.code = item.code + ''
        item.provinceCode = item.provinceCode + ''
      })
      return data
    },
    changeProvince(val) {
      console.log('changeProvince-val: ', val)
      this.query.applyCity = ''
      this.query.cityCode = ''
      this.query.areaCooper = ''
      this.query.areaCode = ''
      this.query.street = ''
      this.query.streetCode = ''
      this.isSelCity = false
      this.provinceOptions.map((item) => {
        if (item.code === val) {
          this.query.province = item.name
        }
      })
      this.getCityOptions(val)
    },
    changeCity(val) {
      console.log('changeProvince-val: ', val)
      this.query.areaCooper = ''
      this.query.areaCode = ''
      this.query.street = ''
      this.query.streetCode = ''
      this.isSelArea = false
      this.cityOptions.map((item) => {
        if (item.code === val) {
          this.query.applyCity = item.name
        }
      })
      this.getAreaOptions(val)
    },
    changeArea(val) {
      this.query.street = ''
      this.query.streetCode = ''
      this.isSelStree = false
      this.areaOptions.map((item) => {
        if (item.code === val) {
          this.query.areaCooper = item.name
        }
      })
      this.getstreetOptions(val)
    },
    changestreet(val) {
      this.streetOptions.map((item) => {
        if (item.code === val) {
          this.query.street = item.name
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.head-container {
  margin-top: 10px;
  margin-bottom: 10px;
  .filter-item {
    margin-right: 20px;
  }
  .city-select {
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
  .signer {
    width: 120px;
    margin-right: 20px;
  }
  .date-picker {
    width: 250px;
    margin-right: 20px;
  }
  .phone {
    width: 140px;
    margin-right: 20px;
  }
}
</style>
