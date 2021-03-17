<template>
  <div class="head-container">
    <span v-if="isShowAreaSelect">
      <span class="laber">区名称：</span>
      <el-select
        v-model="query.areaCode"
        clearable
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
    </span>
    <span class="laber">街道名称：</span>
    <el-select
      v-model="query.streetCode"
      clearable
      class="city-select"
      placeholder="请选择镇"
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
      v-model="query.telephone"
      clearable
      size="small"
      placeholder="请输入电话"
      class="filter-item phone"
    />
    <el-button type="primary" @click="search">搜索</el-button>
    <el-button type="warning" @click="resetForm">重置</el-button>
  </div>
</template>

<script>
import { getAreaByCityCode, getStreetByAreaCode } from '@/api/index'
import { signStatusOptions } from '@/utils/data'
export default {
  data() {
    return {
      isShowAreaSelect: false, // 是否显示区的选项
      // isSelStree: true, // 是否选街道
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
      areaOptions: [], // 区选项
      streetOptions: [], // 街道选项
      signStatusOptions
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
    this.query = {
      province,
      provinceCode,
      applyCity,
      cityCode,
      areaCooper,
      areaCode,
      street: '',
      streetCode: '',
      status: '',
      signPerson: '',
      phone: ''
    }
    if (areaCode) {
      this.isShowAreaSelect = false
      this.getstreetOptions(areaCode)
    } else {
      this.isShowAreaSelect = true
      this.getAreaOptions(cityCode)
    }
  },
  methods: {
    clearArea() {
      this.query.areaCooper = ''
      this.query.street = ''
      this.query.streetCode = ''
    },
    clearStreet() {
      this.query.street = ''
    },
    resetForm() {
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
    handleChangeCity() {},
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
  .city-cascader,
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
  .phone {
    width: 140px;
    margin-right: 20px;
  }
}
</style>
