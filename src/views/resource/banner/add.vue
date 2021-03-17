<template>
  <el-dialog
    :title="isAdd ? '新增轮播图' : '修改轮播图'"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    width="900px"
  >
    <el-form
      ref="bannerForm"
      :model="bannerForm"
      :rules="ruleBanner"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="标题" prop="title">
            <el-input v-model="bannerForm.title" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="是否显示">
            <el-switch
              v-model="bannerForm.isShow"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="排序权重">
            <el-input-number v-model="bannerForm.weight" :min="0" :max="100" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="类别">
            <el-select
              v-model="bannerForm.type"
              class="select-status-box"
              placeholder="请选择类别"
            >
              <el-option
                v-for="item in bannerTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="轮播图" prop="title">
            <el-upload
              ref="upload"
              class="upload-demo"
              action=""
              :limit="1"
              :on-change="fileChange"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
              :file-list="fileImg"
              list-type="picture"
              :http-request="uploadFile"
              :auto-upload="false"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12" />
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import addMixin from '@/views/mixin/add.js'
// import { Message } from 'element-ui'
import { bannerTypeOptions } from '@/utils/data'
import { bannerAdd, bannerUpdate, fileUpload } from '@/api/index'
export default {
  mixins: [addMixin],
  data() {
    return {
      bannerTypeOptions,
      fileData: null,
      fileImg: [],
      dialogVisible: false,
      isAdd: false,
      bannerForm: {
        title: '',
        weight: 0,
        isShow: '1',
        type: '0',
        photo: ''
      },
      ruleBanner: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.fileData = new FormData()
  },
  methods: {
    freshenTinymce() {
      this.isShowTinymce = false
      setTimeout(() => {
        this.isShowTinymce = true
      }, 20)
    },
    handleExceed(files, fileList) {
      this.$message.error(
        `已经选择了 ${files.length} 个文件，请删除以前的再上传`
      )
    },
    clearForm() {
      this.$refs.bannerForm.resetFields()
      this.fileImg = []
      this.bannerForm = {
        title: '',
        weight: 0,
        isShow: '1',
        type: '0',
        photo: ''
      }
      this.freshenTinymce()
      this.fileData = null
    },
    submit() {
      console.log('bannerForm: ', this.bannerForm)
      if (this.isAdd) {
        bannerAdd(this.bannerForm).then((res) => {
          this.resCheck(res, '新增轮播')
        })
      } else {
        bannerUpdate(this.bannerForm).then((res) => {
          this.resCheck(res, '修改轮播')
        })
      }
    },
    uploadFile(file) {
      debugger
      console.log('file: ', file)
      this.fileData.append('files', file.file) // append增加数据
    },
    fileChange() {
      if (this.fileData == null) {
        this.fileData = new FormData()
      }
      const { uploadFiles } = this.$refs.upload
      console.log('uploadFiles: ', uploadFiles)
      this.fileData.append('file', uploadFiles[0].raw)
      console.log('fileData: ', this.fileData)

      fileUpload(this.fileData).then((res) => {
        console.log('fileUpload-res: ', res)
        this.bannerForm.photo = res.data.directPath
        this.resCheck(res, '图片上传', false)
      })
    },
    handleRemove() {}
  }
}
</script>

<style lang="scss" scoped>
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
</style>
