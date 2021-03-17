<template>
  <el-dialog
    title="发放奖励"
    :visible.sync="dialogVisible"
    width="600px"
    :before-close="handleClose"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户手机号">
        <el-input v-model="ruleForm.photo" />
      </el-form-item>
      <el-form-item label="奖励金额">
        <el-input v-model="ruleForm.amount" />
      </el-form-item>
      <el-form-item label="奖励描述">
        <el-input v-model="ruleForm.describe" type="textarea" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { Message } from 'element-ui'
export default {
  data() {
    return {
      dialogVisible: false,
      isAdd: false,
      isShow: false,
      ruleForm: {
        photo: '',
        amount: '',
        describe: ''
      }
    }
  },
  methods: {
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
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log('ruleForm: ', this.ruleForm)
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
