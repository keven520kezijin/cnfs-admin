<template>
  <el-dialog
    title="详情"
    :visible.sync="detailsDialogVisible"
    width="700px"
    :before-close="handleClose"
  >
    <el-row class="level">
      <span class="laber">发生日期：</span>
      2020-11-02 19:11
    </el-row>
    <el-row class="level">
      <span class="laber">申请内容：</span>
      经过多年的努力，Filecoin主网正式上线了！正如我们上周分享的那样——这次主网开启过渡对整个社区来说是一个了不起的里程碑。现在有>100个有用的应用和工具建立在Filecoin上，600TiB的存储交易将Filecoin的容量投入使用，近700
      PiB 的存储容量以每小时超过500TiB的速度增长！
    </el-row>
    <el-row class="level">
      <span class="laber">申请描述：</span>
      除了Filecoin贴心的激励结构，奖励优质、长期的数据存储——Filecoin的与众不同之处在于集成这个去中心化存储层的项目的惊人生态系统。从用于Filecoin网络的ConsenSys工具套件（https://filecoin.io/blog/filecoin-ethereum-community/），到与互联网档案馆一起策划的Filecoin档案库
    </el-row>
    <el-row class="level">
      <span class="laber">申请金额：</span>
      ￥ 5000000
    </el-row>
    <el-row class="level img-level">
      <span class="laber">上传凭证：</span>
      <div class="img-box">
        <div class="img-item" />
        <div class="img-item" />
        <div class="img-item" />
        <div class="img-item" />
        <div class="img-item" />
        <div class="img-item" />
        <div class="img-item" />
      </div>
    </el-row>

    <el-row class="level">
      <span class="laber">申请日期：</span>
      2020-11-02 19:11
    </el-row>

    <el-row class="level">
      <span class="laber">更新日期：</span>
      2020-11-02 19:11
    </el-row>

    <el-row class="level">
      <span class="laber">申请状态：</span>
      2020-11-02 19:11
    </el-row>

    <el-row class="level">
      <span class="laber">一级审核：</span>
      2020-11-02 19:11
    </el-row>

    <el-row class="level">
      <span class="laber">二级审核：</span>
      2020-11-02 19:11
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      detailsDialogVisible: false
    }
  },
  methods: {
    cancel() {
      // alert('cancel')
      this.detailsDialogVisible = false
    },
    handleClose(done) {
      console.log('cancel')
      this.cancel()
      done()
    },
    submitForm() {}
  }
}
</script>

<style lang="scss" scoped>
.level {
  margin-bottom: 16px;
  line-height: 24px;
  .laber {
    display: inline-block;
    margin-right: 10px;
    font-weight: 700;
  }
}
.img-level {
  display: flex;
  justify-content: space-between;
  .img-box {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    .img-item {
      width: 100px;
      height: 100px;
      background-color: #900;
      margin-bottom: 20px;
      &:not(:nth-child(5n)) {
        margin-right: 15px;
      }
    }
  }
}
</style>
