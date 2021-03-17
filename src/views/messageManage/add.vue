<template>
  <el-dialog
    :title="isAdd ? '新增消息' : '修改消息'"
    :visible.sync="dialogVisible"
    width="900px"
    top="40px"
    height="500px"
    :before-close="handleClose"
  >
    <el-form
      ref="messageForm"
      :model="messageForm"
      :rules="ruleMessage"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row :gutter="20">
        <el-col :span="14">
          <el-form-item label="发送目标">
            <el-switch
              v-model="isAllSend"
              active-color="#13ce66"
              inactive-color="#409eff"
              active-text="全部发送"
              inactive-text="定向发送"
            />
            <el-input
              v-if="!isAllSend"
              v-model="messageForm.messId"
              class="zd-send"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="标题" prop="title">
          <el-input v-model="messageForm.title" class="title-box" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="简介" prop="introduction">
          <el-input
            v-model="messageForm.introduction"
            class="title-box"
            type="textarea"
          />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="消息详情" prop="content">
          <tinymce
            ref="tinymce"
            v-model="messageForm.content"
            class="tinymce-box"
            :height="300"
            :width="720"
          />
        </el-form-item>
      </el-row>
      <el-row class="formwork">
        <span @click="mould(1)">模板一</span>
        <span @click="mould(2)">模板二</span>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mould1, mould2 } from '@/utils/msgMould'
import addMixin from '@/views/mixin/add.js'
import Tinymce from '@/components/Tinymce'
import { messageAdd, messageManageUpdate } from '@/api/index'
export default {
  components: { Tinymce },
  mixins: [addMixin],
  data() {
    return {
      dialogVisible: false,
      isAdd: false,
      isAllSend: true,
      messageForm: {
        messId: null,
        content: '',
        title: '',
        introduction: ''
      },
      ruleMessage: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    freshenTinymce() {
      this.$refs.tinymce.hasChange = false
      this.$refs.tinymce.hasInit = true
    },
    mould(n) {
      console.log('mould1: ', mould1)
      let userName = ''
      if (this.messageForm.messId) {
        userName = this.messageForm.messId
      }
      this.messageForm.content = ''
      if (n === 1) {
        this.messageForm.content = mould1(userName)
        this.freshenTinymce()
      }
      if (n === 2) {
        this.messageForm.content = mould2(userName)
        this.freshenTinymce()
      }
    },
    handlePreview() {},
    handleRemove() {},
    clearForm() {
      // alert('clearForm')
      this.$refs.messageForm.resetFields()
      this.messageForm = {
        messId: null,
        content: '',
        title: '',
        introduction: ''
      }
      this.freshenTinymce()
    },
    handleMessageAdd() {
      messageAdd(this.messageForm).then((res) => {
        console.log('res: ', res)
        this.resCheck(res, '新增')
      })
    },
    handleMessageUpdate() {
      messageManageUpdate(this.messageForm).then((res) => {
        console.log('res: ', res)
        this.resCheck(res, '修改')
      })
    },
    submitForm() {
      this.$refs.messageForm.validate((valid) => {
        if (valid) {
          console.log('ruleForm: ', this.ruleForm)
          if (this.isAdd) {
            this.handleMessageAdd()
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
.formwork {
  padding-left: 100px;
  span {
    color: #1890ff;
    margin-right: 20px;
  }
}
</style>
