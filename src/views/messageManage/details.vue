<template>
  <el-dialog
    title="消息详情"
    :visible.sync="dialogVisible"
    top="60px"
    width="500px"
    height="500px"
    :before-close="handleClose"
  >
    <div class="content-box" v-html="content" />
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      content: ''
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.zd-send {
  width: 200px;
  margin-left: 20px;
}
.title-box {
  width: 720px;
}
::v-deep .upload-demo {
  display: flex;
  flex-wrap: wrap;
}

::v-deep .el-upload__tip {
  display: inline-block;
  margin-left: 20px;
  margin-top: 0;
  width: 600px;
}

::v-deep .el-upload-list--picture .el-upload-list__item-thumbnail {
  height: auto;
}

::v-deep .el-input-number--medium {
  width: 130px;
}

::v-deep .el-form-item__content {
  padding-right: 0 !important;
}

::v-deep
  .el-upload-list--picture
  .el-upload-list__item.is-success
  .el-upload-list__item-name {
  display: none !important;
}

::v-deep .el-upload-list--picture .el-upload-list__item-thumbnail {
  width: 672px !important;
}

::v-deep .el-upload-list--picture .el-upload-list__item {
  height: auto;
}

::v-deep .el-upload-list--picture .el-upload-list__item-status-label {
  z-index: 1;
}

::v-deep .el-upload-list--picture .el-upload-list__item {
  padding: 10px 30px 10px 10px !important;
}

::v-deep .el-upload-list--picture .el-upload-list__item-thumbnail {
  margin-left: 0;
}

::v-deep .el-dialog__body img{
  width: 100%;
}

.content-box {
  height: 600px;
  overflow-y: auto;
}
</style>
