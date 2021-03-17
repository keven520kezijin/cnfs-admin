<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    width="900px"
  >
    <span slot="title" class="dialog-footer">
      <span>{{ isAdd ? "新增城市合伙人" : "修改城市合伙人" }}</span>
      <span class="sel-level">
        <el-radio-group v-model="selLevel" @change="selLevelChange">
          <el-radio-button
            :disabled="cityDisabled"
            label="2"
          >市级</el-radio-button>
          <el-radio-button
            :disabled="areaDisabled"
            label="3"
          >区级</el-radio-button>
          <el-radio-button label="4">街级</el-radio-button>
        </el-radio-group>
      </span>
    </span>
    <el-form
      ref="partnerForm"
      :model="partnerForm"
      :rules="rulesPartner"
      label-width="100px"
      class="news-form"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="省" prop="province">
            <el-select
              v-model="partnerForm.provinceCode"
              class="status-box"
              placeholder="请选择省"
              :disabled="isSelPro"
              @change="changeProvince"
            >
              <el-option
                v-for="item in provinceOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="市" prop="applyCity">
            <el-select
              v-model="partnerForm.cityCode"
              :disabled="isSelCity"
              class="status-box"
              placeholder="请选择市"
              @change="changeCity"
            >
              <el-option
                v-for="item in cityOptions"
                :key="item.cityCode"
                :label="item.applyCity"
                :value="item.cityCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col v-if="isShowArea" :span="12">
          <el-form-item label="区" prop="area">
            <el-select
              v-model="partnerForm.areaCode"
              :disabled="isSelArea"
              class="status-box"
              placeholder="请选择区"
              @change="changeArea"
            >
              <el-option
                v-for="(item, i) in areaOptions"
                :key="i"
                :label="item.areaCooper"
                :value="item.areaCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="isShowStreet" :span="12">
          <el-form-item label="镇" prop="street">
            <el-select
              v-model="partnerForm.streetCode"
              :disabled="isSelStreet"
              class="status-box"
              placeholder="请选择镇"
              @change="changestreet"
            >
              <el-option
                v-for="item in streetOptions"
                :key="item.streetCode"
                :label="item.street"
                :value="item.streetCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!isAdd" :gutter="20">
        <el-col :span="12">
          <span class="laber">签约人</span>
          <span class="signPerson">{{ partnerForm.signPerson }}</span>
          <el-button class="select-btn" @click="addSelect">选择</el-button>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请人数">
            <el-input-number
              v-model="partnerForm.applyCount"
              :min="0"
              :max="100"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
    <add-select ref="addSelect" @selectValue="selectValue" />
  </el-dialog>
</template>

<script>
import { Message } from 'element-ui'
import addSelect from './addSelect.vue'
import addMixin from '@/views/mixin/add.js'
import {
  platformAdd,
  platformUpdate,
  cNProvinceGetAll, // 省
  getCityByProvinceCode, // 市
  getAreaByCityCode, // 区
  getStreetByAreaCode, // 街
  getCooperProvinceListByLevelAndCity, // 未注册市
  getCooperProvinceListByLevelAndArea, // 未注册区
  getCooperProvinceListByLevelAndStreet // 未注册街道
  // getStreetByAreaCode,
  // getCooperIsExist
} from '@/api/index'
export default {
  components: { addSelect },
  mixins: [addMixin],
  provide: {
    signPerson: {
      name: 'kv'
    }
  },
  data() {
    return {
      regionalPartnerLevel: '0', // 当前区域合伙人级别，市='2'， 区='3'
      cityDisabled: false,
      areaDisabled: false,
      selLevel: '2', // 选择的级别
      isSelPro: false, // 是否选省
      isSelCity: true, // 是否选城市
      isSelArea: true, // 是否关闭选区
      isShowArea: false,
      isSelStreet: true, // 是否关闭选街道
      isShowStreet: false,
      imgLimit: 1,
      dialogVisible: false, // 弹窗是否显示
      disabled: false,
      isAdd: false,
      provinceOptions: [],
      cityOptions: [], // 市选项
      areaOptions: [], // 区选项
      streetOptions: [], // 街道选项
      partnerForm: {
        province: '',
        provinceCode: '',
        applyCity: '',
        cityCode: '',
        areaCooper: '',
        areaCode: '',
        street: '',
        streetCode: ''
      },
      rulesPartner: {
        provinceCode: [
          { required: true, message: '请选择签约的省', trigger: 'blur' }
        ],
        cityCode: [
          { required: true, message: '请选择签约的市', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    dialogVisible(v, o) {
      this.init()
      console.log(v, o)
      console.log('this.partnerForm: ', this.partnerForm)
      console.log('watch-this.selLevel: ', this.selLevel)
      console.log('regionalPartnerLevel: ', this.regionalPartnerLevel)
      console.log('regionalPartnerLevel: ', typeof this.regionalPartnerLevel)
      console.log('areaOptions: ', this.areaOptions)
      // 区域 -> 市

      // 打开弹窗，让区级的城市级别回归到区
      if (v) {
        // alert(this.regionalPartnerLevel)
        if (this.regionalPartnerLevel === '2') {
          // debugger
          this.isSelArea = false
        }
        if (this.regionalPartnerLevel === '3') {
          this.isSelStreet = false
        }
        if (this.isAdd) {
          // 新增
          if (this.regionalPartnerLevel === '2') {
            this.selLevel = '3'
            this.isSelArea = false
            this.isSelStreet = false
            this.getAreaOptions(this.partnerForm.cityCode)
          }
          if (this.regionalPartnerLevel === '3') {
            this.selLevel = '4'
            this.isSelStreet = false
            // alert(4)
            this.getstreetOptions(this.partnerForm.areaCode)
          }
        } else {
          alert(this.selLevel)
          // debugger
          console.log('partnerForm: ', this.partnerForm)
          console.log('this.selLevel: ', this.selLevel)
          if (this.selLevel === '3' && this.regionalPartnerLevel === '0') {
            this.getAreaOptions(this.partnerForm.cityCode)
          }
          if (this.selLevel === '4' && this.regionalPartnerLevel === '0') {
            this.getstreetOptions(this.partnerForm.areaCode)
          }
        }
      } else {
        localStorage.removeItem('editDtata')
      }
    }
  },
  created() {},
  methods: {
    // 弹窗打开时判断级别
    init() {
      // alert('init')
      // debugger;
      if (localStorage.getItem('partnerInfo')) {
        // 关闭省、市选择
        this.isSelPro = true
        this.isSelCity = true
        // 区域合伙人
        const partnerInfo = JSON.parse(localStorage.getItem('partnerInfo'))
        const {
          province,
          provinceCode,
          applyCity,
          cityCode,
          areaCooper,
          areaCode
        } = partnerInfo
        // 省选项
        this.provinceOptions = [
          {
            name: province,
            code: provinceCode
          }
        ]
        // 市选项
        this.cityOptions = [
          {
            applyCity,
            cityCode
          }
        ]

        // 判断区域合伙人的级别
        if (areaCode) {
          // 区
          this.regionalPartnerLevel = '3'
          // 选择街
          this.selStreet(areaCooper, areaCode)
        } else {
          // 市
          this.regionalPartnerLevel = '2'
          // 选择区
          this.selArea(cityCode)
        }

        if (this.isAdd) {
          this.partnerForm = {
            province,
            provinceCode,
            applyCity,
            cityCode,
            areaCooper,
            areaCode,
            street: '',
            streetCode: ''
          }
        } else {
          const editDtata = JSON.parse(localStorage.getItem('editDtata'))
          console.log('editDtata: ', this.editDtata)
          const {
            areaCode: EAreaCode,
            areaCooper: EAreaCooper,
            street: EStreet,
            streetCode: EStreetCode
          } = editDtata
          console.log(EAreaCode, EAreaCooper, EStreet)
          if (!EStreetCode) {
            // 选择区
            this.selArea(cityCode)
          } else {
            // 选择街
            // alert("街");
            if (this.regionalPartnerLevel === '2') {
              // alert("市");
              this.selStreet(areaCooper, areaCode, cityCode)
            } else {
              this.selStreet(areaCooper, areaCode)
            }
          }
        }

        // this.getCityOptions(provinceCode);
      } else {
        this.getProvinceOptions()
      }
    },
    // 区级选项
    selArea(cityCode) {
      this.selLevel = '3'
      this.cityDisabled = true
      this.getAreaOptions(cityCode)
      this.isShowArea = true
      this.isShowStreet = false
      this.isSelArea = false
    },
    // 街道选项
    selStreet(areaCooper, areaCode, cityCode) {
      this.selLevel = '4'
      if (cityCode) {
        alert('kv')
        this.cityDisabled = true
        this.getAreaOptions(cityCode)
        this.isShowArea = true
        this.isShowStreet = true
        this.isSelArea = false
        this.isSelStreet = false
      } else {
        this.areaOptions = [
          {
            areaCooper,
            areaCode
          }
        ]
        this.getstreetOptions(areaCode)
        this.cityDisabled = true
        this.areaDisabled = true
        this.isShowArea = true
        this.isShowStreet = true
        this.isSelArea = true
        this.isSelStreet = false
      }
    },
    // selLevelChange 改变合伙人级别
    selLevelChange(v) {
      console.log('selLevelChange-v: ', v)
      console.log('regionalPartnerLevel: ', this.regionalPartnerLevel)
      console.log('regionalPartnerLevel: ', typeof this.regionalPartnerLevel)
      this.isSelCity = true
      this.isSelArea = true
      this.isSelStreet = true
      if (this.regionalPartnerLevel === '0') {
        const { id } = this.partnerForm
        this.partnerForm = {
          province: '',
          provinceCode: '',
          applyCity: '',
          cityCode: '',
          areaCooper: '',
          areaCode: '',
          street: '',
          streetCode: ''
        }
        if (!this.isAdd) {
          this.partnerForm.id = id
        }
      }
      if (v === '3') {
        if (this.regionalPartnerLevel === '2') {
          const partnerInfo = JSON.parse(localStorage.getItem('partnerInfo'))
          this.getAreaOptions(partnerInfo.cityCode)
          this.isSelArea = false
        }
        this.isShowArea = true
        this.isShowStreet = false
      } else if (v === '4') {
        if (this.regionalPartnerLevel === '2') {
          const partnerInfo = JSON.parse(localStorage.getItem('partnerInfo'))
          this.getAreaOptions(partnerInfo.cityCode)
          this.isSelArea = false
        }
        this.isShowArea = true
        this.isShowStreet = true
      } else if (v === '2') {
        this.isShowArea = false
        this.isShowStreet = false
      }
    },
    // 选择签约人
    selectValue(v) {
      this.partnerForm.signPerson = v
    },
    // 选择签约人弹窗
    addSelect() {
      this.$refs.addSelect.addSelectDialogVisible = true
    },
    getProvinceOptions() {
      // const data = {
      //   // level: "1",
      // };
      cNProvinceGetAll().then((res) => {
        this.provinceOptions = res.data
      })
    },
    getCityOptions(provinceCode) {
      if (this.selLevel === '2') {
        // alert("getCityOptions");
        // 未注册市
        const data = {
          level: '2',
          provinceCode
        }
        getCooperProvinceListByLevelAndCity(data).then((res) => {
          const cityOptionsArr = []
          if (res.data) {
            res.data.forEach((item) => {
              const obj = {}
              obj.applyCity = item.applyCity
              obj.cityCode = item.cityCode + ''
              cityOptionsArr.push(obj)
            })
            const { applyCity, cityCode } = JSON.parse(
              localStorage.getItem('editDtata')
            )
            const editCity = {
              applyCity,
              cityCode
            }
            cityOptionsArr.unshift(editCity)
            this.cityOptions = cityOptionsArr
          } else {
            this.cityOptions = []
          }
        })
      } else {
        // 所有市
        getCityByProvinceCode(provinceCode).then((res) => {
          const cityOptionsArr = []
          res.data.forEach((item) => {
            const obj = {}
            obj.applyCity = item.name
            obj.cityCode = item.code + ''
            cityOptionsArr.push(obj)
          })
          this.cityOptions = cityOptionsArr
        })
      }
    },
    getAreaOptions(cityCode) {
      // debugger
      console.log('getAreaOptions-cityCode: ', cityCode)
      console.log('getAreaOptions-selLevel: ', this.selLevel)
      if (this.selLevel === '3') {
        // 未注册的区
        const data = {
          level: '3',
          cityCode
        }
        // 从localStorage获取编辑区的信息
        const areaOptionsArr = []
        let editArea = {}
        let localStorageAreaCode = ''
        let localStorageAreaCooper = ''
        let localStorageCityCode = ''
        console.log(
          localStorageAreaCode,
          localStorageAreaCooper,
          localStorageCityCode
        )
        if (localStorage.getItem('editDtata')) {
          const { areaCode, areaCooper, cityCode } = JSON.parse(
            localStorage.getItem('editDtata')
          )
          localStorageAreaCode = areaCode
          localStorageAreaCooper = areaCooper
          localStorageCityCode = cityCode
          editArea = {
            areaCode,
            areaCooper
          }
        }
        getCooperProvinceListByLevelAndArea(data).then((res) => {
          console.log('res: ', res)
          if (res.data) {
            res.data.forEach((item) => {
              const obj = {}
              obj.areaCooper = item.areaCooper
              obj.areaCode = item.areaCode + ''
              areaOptionsArr.push(obj)
            })
            // 插入要编辑的区数据
            if (
              this.partnerForm.cityCode === localStorageCityCode &&
              localStorage.getItem('editDtata')
            ) {
              areaOptionsArr.unshift(editArea)
            }
            this.areaOptions = areaOptionsArr
          } else {
            this.areaOptions = []
            // 插入要编辑的区数据
            if (
              this.partnerForm.cityCode === localStorageCityCode &&
              localStorage.getItem('editDtata')
            ) {
              areaOptionsArr.unshift(editArea)
            }
            this.areaOptions = areaOptionsArr
          }
        })
      } else {
        // 所有区
        getAreaByCityCode(cityCode).then((res) => {
          if (res.data) {
            const areaOptionsArr = []
            res.data.forEach((item) => {
              const obj = {}
              obj.areaCooper = item.name
              obj.areaCode = item.code + ''
              areaOptionsArr.push(obj)
            })
            this.areaOptions = areaOptionsArr
          } else {
            this.areaOptions = []
          }
        })
      }
    },
    getstreetOptions(areaCode) {
      // debugger
      if (this.selLevel === '4') {
        const data = {
          level: '4',
          areaCode
        }
        // 从localStorage获取编辑街的信息
        const streetOptionsArr = []
        let editStreet = {}
        let localStorageStreet = ''
        let localStorageStreetCode = ''
        let localStorageAreaCode = ''
        console.log(localStorageStreet, localStorageStreetCode)
        if (localStorage.getItem('editDtata')) {
          const { street, streetCode, areaCode } = JSON.parse(
            localStorage.getItem('editDtata')
          )
          localStorageStreet = street
          localStorageStreetCode = streetCode
          localStorageAreaCode = areaCode
          console.log('areaCode: ', areaCode)
          editStreet = {
            street,
            streetCode
          }
          console.log('editStreet', editStreet)
        }
        getCooperProvinceListByLevelAndStreet(data).then((res) => {
          // alert('getCooperProvinceListByLevelAndStreet')

          if (res.data) {
            res.data.forEach((item) => {
              const obj = {}
              obj.street = item.street
              obj.streetCode = item.streetCode + ''
              streetOptionsArr.push(obj)
            })
            if (
              this.partnerForm.areaCode === localStorageAreaCode &&
              localStorage.getItem('editDtata')
            ) {
              streetOptionsArr.unshift(editStreet)
            }
            this.streetOptions = streetOptionsArr
          } else {
            this.streetOptions = []
            // alert(this.selLevel);
            // debugger
            if (this.partnerForm.areaCode === localStorageAreaCode) {
              streetOptionsArr.unshift(editStreet)
            }
            this.streetOptions = streetOptionsArr
          }
        })
      } else {
        getStreetByAreaCode(areaCode).then((res) => {
          const streetOptionsArr = []
          res.data.forEach((item) => {
            const obj = {}
            obj.street = item.name
            obj.streetCode = item.code + ''
            streetOptionsArr.push(obj)
          })
          this.streetOptions = streetOptionsArr
        })
      }
    },
    changeProvince(provinceCode) {
      console.log('changeProvince-provinceCode: ', provinceCode)
      console.log('selLevel: ', this.selLevel)
      console.log('selLevel: ', typeof this.selLevel)
      this.partnerForm.applyCity = ''
      this.partnerForm.cityCode = ''
      this.partnerForm.areaCooper = ''
      this.partnerForm.areaCode = ''
      this.partnerForm.street = ''
      this.partnerForm.streetCode = ''
      this.isSelCity = false
      this.isSelArea = true
      this.isSelStreet = true

      this.provinceOptions.map((item) => {
        // console.log('map: ', map)
        if (item.code === provinceCode) {
          console.log('province: ', item.name)
          this.partnerForm.province = item.name
        }
      })
      if (this.selLevel === '2') {
        // alert(2);
        // 市级则市级查询要去重
        const data = {
          level: '2',
          provinceCode
        }
        getCooperProvinceListByLevelAndCity(data).then((res) => {
          if (res.data) {
            const cityOptionsArr = []
            res.data.forEach((item) => {
              const obj = {}
              obj.applyCity = item.applyCity
              obj.cityCode = item.cityCode + ''
              cityOptionsArr.push(obj)
            })
            this.cityOptions = cityOptionsArr
          } else {
            this.cityOptions = []
          }
        })
      } else {
        this.getCityOptions(provinceCode)
      }
    },
    changeCity(val) {
      console.log('changeCity-val: ', val)
      this.partnerForm.areaCooper = ''
      this.partnerForm.areaCode = ''
      this.partnerForm.street = ''
      this.partnerForm.streetCode = ''
      this.isSelArea = false
      this.isSelStreet = true
      this.cityOptions.map((item) => {
        if (item.cityCode === val) {
          this.partnerForm.applyCity = item.applyCity
        }
      })
      this.getAreaOptions(val)
    },
    changeArea(val) {
      this.partnerForm.street = ''
      this.partnerForm.streetCode = ''
      this.isSelStreet = false
      this.areaOptions.map((item) => {
        if (item.areaCode === val) {
          this.partnerForm.areaCooper = item.areaCooper
        }
      })
      this.getstreetOptions(val)
    },
    changestreet(val) {
      this.streetOptions.map((item) => {
        if (item.streetCode === val) {
          this.partnerForm.street = item.street
        }
      })
    },
    handleRemove(file) {
      console.log(file)
    },
    handleDownload(file) {
      console.log(file)
    },
    handleClose(done) {
      this.clearForm()
      done()
    },
    clearForm() {
      // const levelNum = this.selLevel * 1
      if (this.regionalPartnerLevel * 1 > 1) {
        if (this.selLevel === '4') {
          this.partnerForm.street = ''
          this.partnerForm.streetCode = ''
        }
        if (this.selLevel === '3') {
          this.partnerForm.areaCooper = ''
          this.partnerForm.areaCode = ''
          this.partnerForm.street = ''
          this.partnerForm.streetCode = ''
        }
      } else {
        // alert('cshhr')
        this.$refs.partnerForm.resetFields()
        this.selLevel = '2'
        this.isShowArea = false
        this.isShowStreet = false
        this.isSelStreet = true
        this.isSelCity = true // 是否选城市
        this.isSelArea = true
        this.partnerForm = {
          province: '',
          provinceCode: '',
          applyCity: '',
          cityCode: '',
          areaCooper: '',
          areaCode: '',
          street: '',
          streetCode: ''
        }
      }
    },
    setLevel() {
      if (this.partnerForm.streetCode) {
        this.partnerForm.level = 4
      }
      if (!this.partnerForm.streetCode && this.partnerForm.areaCode) {
        this.partnerForm.level = 3
      }
      if (!this.partnerForm.areaCode && this.partnerForm.cityCode) {
        this.partnerForm.level = 2
      }
    },
    submit() {
      this.$refs.partnerForm.validate((valid) => {
        // alert(this.selLevel);
        if (!this.partnerForm.provinceCode) {
          Message({
            message: `请选择省`,
            type: 'error'
          })
          return
        }
        if (!this.partnerForm.cityCode) {
          Message({
            message: `请选择市`,
            type: 'error'
          })
          return
        }
        if (this.selLevel === '3' && !this.partnerForm.areaCode) {
          Message({
            message: `请选择区`,
            type: 'error'
          })
          return
        }
        if (this.selLevel === '4' && !this.partnerForm.streetCode) {
          Message({
            message: `请选择街`,
            type: 'error'
          })
          return
        }
        if (valid) {
          console.log('this.partnerForm: ', this.partnerForm)
          console.log('this.provinceOptions: ', this.provinceOptions)
          // return;
          this.setLevel()
          if (this.isAdd) {
            console.log('this.partnerForm: ', this.partnerForm)
            // return;
            platformAdd(this.partnerForm).then((res) => {
              console.log('res: ', res)
              // 刷新最后一级数据
              console.log('selLevel: ', this.selLevel)
              this.resCheck(res, '新增')
            })
          } else {
            console.log('up-partnerForm: ', this.partnerForm)
            // return;
            if (this.partnerForm.signPerson) {
              this.partnerForm.status = '1'
            }
            platformUpdate(this.partnerForm).then((res) => {
              console.log('informationUpdate - res: ', res)
              this.resCheck(res, '修改')
            })
          }
        } else {
          console.log('err submit')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input--medium,
.el-cascader--medium {
  width: 100%;
}

.sel-level {
  margin-left: 20px;
}

.news-form {
  .el-icon-download {
    display: none;
  }

  .el-select {
    width: 192px;
  }

  .laber {
    display: inline-block;
    font-weight: 700;
    width: 100px;
    text-align: right;
    padding-right: 12px;
  }
  .signPerson {
    display: inline-block;
    width: 100px;
    text-align: left;
  }
  .select-btn {
    margin-left: 20px;
  }
}
</style>
