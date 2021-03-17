<template>
  <el-dialog
    :title="isAdd ? '新增走马灯' : '修改走马灯'"
    :visible.sync="dialogVisible"
    width="30%"
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
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch
          v-model="ruleForm.show"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="排序权重">
        <el-input-number v-model="ruleForm.sort" :min="1" :max="100" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Message } from 'element-ui'
import { createHorseLamp, updateHorseLamp } from '@/api/index'
export default {
  data() {
    return {
      dialogVisible: false,
      isAdd: false,
      isShow: false,
      ruleForm: {
        title: '',
        sort: 1,
        show: '0'
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleUpdateHorseLamp() {
      console.log('handleUpdateHorseLamp.ruleForm', this.ruleForm)
      const data = {
        model: {
          objectId: 0,
          imageUrl: '',
          status: 1,
          ...this.ruleForm
        }
      }
      updateHorseLamp(data).then((res) => {
        console.log('res: ', res)
        if (res.Code === 200) {
          this.clearAndFreshen()
          Message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          Message({
            message: 'Error',
            type: res.Message
          })
        }
      })
    },
    cancel() {
      // this.dialogVisible = false
      this.clearForm()
    },
    handleClose(done) {
      this.clearForm()
      done()
    },
    clearForm() {
      this.$refs.ruleForm.resetFields()
      this.ruleForm = {
        title: '',
        sort: 1,
        show: '0'
      }
    },
    clearAndFreshen() {
      this.clearForm()
      this.dialogVisible = false
      this.$parent.$parent.getTableData()
    },
    handleCreateHorseLamp() {
      const data = {
        model: {
          ...this.ruleForm,
          objectId: 0,
          imageUrl: '',
          status: 1
        }
      }
      createHorseLamp(data).then((res) => {
        console.log('res: ', res)
        this.clearAndFreshen()
      })
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log('ruleForm: ', this.ruleForm)
          if (this.isAdd) {
            this.handleCreateHorseLamp()
          } else {
            this.handleUpdateHorseLamp()
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
