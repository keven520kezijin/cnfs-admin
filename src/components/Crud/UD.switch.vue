<template>
  <div class="page">
    <el-switch
      v-model="value"
      active-value="1"
      inactive-value="0"
      @change="changeIsShow"
    />
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>此操作将 {{ scopeData.isShow === "0" ? "显示" : "隐藏" }}
        {{ scopeData.title }}, 是否继续？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { bannerUpdate, informationUpdate, marqueeUpdate } from '@/api/index'
export default {
  props: {
    scopeData: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      value: '0'
    }
  },
  created() {
    console.log('scopeData: ', this.scopeData.show)
    this.value = this.scopeData.isShow
  },
  methods: {
    changeIsShow(v) {
      this.dialogVisible = true
    },
    handleClose(done) {
      this.cancel()
      done()
    },
    cancel() {
      this.dialogVisible = false
      this.changeValue()
    },
    changeValue() {
      if (this.value === '0') {
        this.value = '1'
      } else {
        this.value = '0'
      }
    },
    submit() {
      this.dialogVisible = false
      const data = {
        id: this.scopeData.id,
        isShow: this.value
      }
      if (this.type === 'banner') {
        bannerUpdate(data).then((res) => {
          this.update(res)
        })
      } else if (this.type === 'information') {
        informationUpdate(data).then((res) => {
          this.update(res)
        })
      } else if (this.type === 'marquee') {
        marqueeUpdate(data).then((res) => {
          this.update(res)
        })
      }
    },
    update(res) {
      if (res.code === '200') {
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        })
      } else {
        this.changeValue()
        this.$notify({
          title: '失败',
          message: '修改失败',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style>
</style>
