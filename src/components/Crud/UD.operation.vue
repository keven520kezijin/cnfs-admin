<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" class="r-10" @click="toEdit(data)" />
    <el-popover v-model="pop" placement="top" width="180" trigger="manual" @show="onPopoverShow" @hide="onPopoverHide">
      <p>{{ msg }}</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="doCancel">取消</el-button>
        <el-button type="primary" size="mini" @click="toDelete(data)">确定</el-button>
      </div>
      <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click="pop=true" />
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      pop: false,
      msg: '删除banner,操作不可逆，是否确认删除？'
    }
  },
  methods: {
    toEdit(data) {
      console.log('data: ', data)
      this.$emit('edit', data)
      // this.$parent.edit()
    },
    doCancel() {
      this.pop = false
    },
    toDelete(data) {
      this.pop = false
      this.$emit('del', data)
    },
    onPopoverShow() {
      setTimeout(() => {
        document.addEventListener('click', this.handleDocumentClick)
      }, 0)
    },
    onPopoverHide() {
      document.removeEventListener('click', this.handleDocumentClick)
    },
    handleDocumentClick(event) {
      this.pop = false
    }
  }
}
</script>

<style>

</style>
