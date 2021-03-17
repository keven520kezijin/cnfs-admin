<template>
  <el-dialog
    :title="isAdd ? '新增资讯' : '修改资讯'"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    width="900px"
    top="60px"
  >
    <el-form
      ref="newsForm"
      :model="newsForm"
      :rules="rulesNews"
      label-width="100px"
      class="news-form"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <el-form-item label="标题" prop="title">
              <el-input v-model="newsForm.title" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="排序权重">
            <el-input-number v-model="newsForm.weight" :min="1" :max="100" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否显示">
            <el-switch
              v-model="newsForm.isShow"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span class="laber">类别：</span>
          <el-select
            v-model="newsForm.type"
            class="status-box"
            placeholder="请选择"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="缩略图" prop="title">
            <el-upload
              ref="upload"
              action=""
              :limit="imgLimit"
              :file-list="fileImg"
              :on-change="fileChange"
              :on-remove="handleRemove"
              list-type="picture-card"
              :http-request="uploadFile"
              :auto-upload="false"
            >
              <i slot="default" class="el-icon-plus" />
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                >
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in" />
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download" />
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete" />
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogImgVisible" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
        <el-col :span="12" />
      </el-row>

      <el-form-item label="内容文本" prop="content">
        <tinymce
          v-if="isShowTinymce"
          v-model="newsForm.content"
          :height="300"
          @tinymceBlue="tinymceBlue"
        />
        <!-- <el-input v-model="newsForm.content" /> -->
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="freshenTinymce">刷新富文本</el-button> -->
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import addMixin from '@/views/mixin/add.js'
import { typeOptions } from '@/utils/data.js'
import { informationAdd, informationUpdate, fileUpload } from '@/api/index'
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  mixins: [addMixin],
  data() {
    return {
      isShowTinymce: true,
      fileData: null,
      fileImg: [],
      typeOptions,
      imgLimit: 1,
      dialogVisible: false,
      dialogImageUrl: '',
      dialogImgVisible: false,
      disabled: false,
      isAdd: false,
      newsForm: {
        title: '',
        content: '',
        isShow: '0',
        weight: '0',
        type: '0',
        photo: '',
        img: ''
      },
      rulesNews: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
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
    tinymceBlue(data) {
      console.log('tinymceBlue: ', data)
    },
    uploadFile(file) {
      console.log('file: ', file)
      this.fileData.append('files', file.file) // append增加数据
    },
    fileChange() {
      if (this.fileData == null) {
        this.fileData = new FormData()
      }
      const { uploadFiles } = this.$refs.upload
      console.log('uploadFiles: ', uploadFiles)
      console.log('this.fileData: ', this.fileData)
      this.fileData.append('file', uploadFiles[0].raw)
      console.log('fileData: ', this.fileData)

      fileUpload(this.fileData).then((res) => {
        console.log('fileUpload-res: ', res)
        this.newsForm.photo = res.data.path
        this.newsForm.img = res.data.directPath
        this.resCheck(res, '图片上传', false)
      })
    },
    handleRemove(file) {
      console.log(file)
      this.fileImg = []
      this.newsForm.photo = ''
      this.newsForm.img = ''
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogImgVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    clearForm() {
      this.$refs.newsForm.resetFields()
      console.log('this: ', this)
      console.log('this.newsForm: ', this.newsForm)
      this.newsForm = {
        title: '',
        content: '',
        isShow: '0',
        weight: '0',
        type: '0',
        photo: '',
        img: ''
      }
      this.fileData = null
      this.fileImg = []
      this.newsForm.content = ''
      console.log('this.newsForm: ', this.newsForm)
      this.freshenTinymce()
    },
    submit() {
      console.log('newsForm: ', this.newsForm)
      console.log('fileData: ', this.fileData)
      this.$refs.newsForm.validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            informationAdd(this.newsForm).then((res) => {
              console.log('res: ', res)
              this.resCheck(res, '新增')
            })
          } else {
            informationUpdate(this.newsForm).then((res) => {
              console.log('informationUpdate - res: ', res)
              this.resCheck(res, '修改')
            })
          }
        } else {
          console.log('err submit')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input-number--medium {
  width: 200px;
}
.news-form {
  .el-icon-download {
    display: none;
  }

  .el-select {
    width: 192px;
  }
}
</style>
