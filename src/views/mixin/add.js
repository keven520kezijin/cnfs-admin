import { Message } from 'element-ui'
export default {
  methods: {
    cancel() {
      // alert('cancel')
      this.dialogVisible = false
      this.clearForm()
    },
    handleClose(done) {
      this.clearForm()
      done()
    },
    clearAndFreshen() {
      this.clearForm()
      this.dialogVisible = false
      this.$parent.$parent.getTableData()
    },
    resCheck(res, str, boole) {
      console.log('boole: ', boole)
      if (res.code === '200') {
        if (boole || boole === undefined) { this.clearAndFreshen() }
        Message({
          message: `${str}成功`,
          type: 'success'
        })
      } else {
        if (boole || boole === undefined) { this.clearAndFreshen() }
        Message({
          message: `${res.message}`,
          type: 'error'
        })
      }
    }
  }
}
