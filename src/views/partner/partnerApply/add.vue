<template>
  <el-dialog
    title="查看城市合伙人申请资料"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    width="900px"
  >
    <el-row class="level">
      <el-col :span="8"> <span class="laber">姓名：</span> {{ applyData.coopName }} </el-col>
      <el-col :span="8"> <span class="laber">手机号码：</span> {{ applyData.coopPhone }} </el-col>
      <el-col :span="8"> <span class="laber">公司全称：</span> {{ applyData.coopCompany }} </el-col>
    </el-row>
    <el-row class="level">
      <el-col :span="8"> <span class="laber">职务：</span> {{ applyData.coopPosition }} </el-col>
      <el-col :span="8"> <span class="laber">常驻城市：</span> {{ applyData.applyCity }} </el-col>
      <el-col :span="8"> <span class="laber">申请城市：</span> {{ applyData.localCity }} </el-col>
    </el-row>
    <el-divider />
    <el-row class="level">
      <el-col :span="24" class="txt"> <span class="laber">拥有资源：</span> {{ applyData.resources }}</el-col>
    </el-row>
    <el-row class="level">
      <el-col :span="24" class="txt"> <span class="laber">具备优势：</span> {{ applyData.advantage }} </el-col>
    </el-row>
    <el-row class="level">
      <el-col :span="24" class="txt"> <span class="laber">运作计划：</span> {{ applyData.plan }}</el-col>
    </el-row>
    <el-row class="level">
      <el-col :span="24" class="txt"> <span class="laber">其它补充：</span> {{ applyData.otherBak }}</el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      applyData: {}
    }
  },
  methods: {
    handleClose(done) {
      this.dialogVisible = false
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
.level {
  margin-bottom: 20px;
  .laber {
    font-weight: 700;
  }
  .txt {
    line-height: 28px;
    font-size: 14px;
  }
}
</style>
