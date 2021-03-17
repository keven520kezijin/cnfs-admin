<template>
  <el-dialog
    :title="isAdd ? '新增走马灯' : '修改走马灯'"
    :visible.sync="dialogVisible"
    width="900px"
    :before-close="handleClose"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" type="textarea" />
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch
          v-model="ruleForm.isShow"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="排序权重">
        <el-input-number v-model="ruleForm.weight" :min="0" :max="100" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import addMixin from '@/views/mixin/add.js'
import { Message } from 'element-ui'
import { marqueeAdd, marqueeUpdate } from '@/api/index'
export default {
  mixins: [addMixin],
  data() {
    return {
      dialogVisible: false,
      isAdd: false,
      ruleForm: {
        title: '',
        weight: 0,
        isShow: '0'
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleMarqueeUpdate() {
      console.log('handleUpdateHorseLamp.ruleForm', this.ruleForm)
      marqueeUpdate(this.ruleForm).then((res) => {
        console.log('res: ', res)
        if (res.code === '200') {
          this.clearAndFreshen()
          Message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.clearAndFreshen()
          Message({
            message: 'Error',
            type: res.Message
          })
        }
      })
    },
    clearForm() {
      this.$refs.ruleForm.resetFields()
      this.ruleForm = {
        title: '',
        weight: 0,
        isShow: '0'
      }
    },
    handleMarqueeAdd() {
      marqueeAdd(this.ruleForm).then((res) => {
        console.log('res: ', res)
        if (res.code === '200') {
          this.clearAndFreshen()
          Message({
            message: '新增成功',
            type: 'success'
          })
        } else {
          this.clearAndFreshen()
          Message({
            message: 'Error',
            type: res.Message
          })
        }
      })
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log('ruleForm: ', this.ruleForm)
          if (this.isAdd) {
            this.handleMarqueeAdd()
          } else {
            this.handleMarqueeUpdate()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
</style>
