<template>
  <el-dialog
    title="选择签约人"
    :visible.sync="addSelectDialogVisible"
    :before-close="handleClose"
    width="600px"
    append-to-body
  >
    <div class="select-box">
      <el-row>
        <span class="laber">签约人:</span>
        <el-input v-model="phone" />
        <el-button type="primary" @click="search">搜 索</el-button>
      </el-row>
      <el-row v-if="signPerson" class="lavel">
        <el-radio-group v-model="radio">
          <el-radio :label="signPerson">{{ signPerson }}</el-radio>
        </el-radio-group>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getUserByPhone } from '@/api/index'
export default {
  data() {
    return {
      addSelectDialogVisible: false,
      phone: '',
      radio: null,
      signPerson: ''
    }
  },
  methods: {
    search() {
      // this.signPerson = '诸葛亮'
      this.getUser()
    },
    getUser() {
      const data = {
        phone: this.phone
      }

      getUserByPhone(data).then((res) => {
        console.log('res: ', res)
        if (res.code === '200') {
          // alert('getUserByPhone')
          this.signPerson = res.data.name || res.data.phone
        }
      })
    },
    handleClose(done) {
      this.addSelectDialogVisible = false
      done()
    },
    cancel() {
      this.addSelectDialogVisible = false
    },
    submit() {
      console.log('radio: ', this.radio)
      if (!this.radio) {
        this.$message({
          message: '请勾选用户',
          type: 'error'
        })
        return
      }
      this.$emit('selectValue', this.radio)
      this.addSelectDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.select-box {
  ::v-deep .el-input--medium {
    width: 400px;
    margin-left: 10px;
    margin-right: 10px;
  }
}
.lavel {
  margin-top: 20px;
  text-align: center;
}
</style>
