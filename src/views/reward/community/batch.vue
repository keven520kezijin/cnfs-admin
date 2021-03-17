<template>
  <el-dialog
    title="批量发放奖励"
    :visible.sync="dialogVisible"
    width="800px"
    :before-close="handleClose"
  >
    <el-row>
      <el-upload
        ref="upload"
        class="upload-demo"
        action=""
        :on-change="fileChange"
        :on-remove="handleRemove"
        :file-list="file"
        :http-request="uploadFile"
        :auto-upload="false"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="奖励人"
          width="80"
        />
        <el-table-column
          prop="province"
          label="手机号"
          width="120"
        />
        <el-table-column
          prop="address"
          label="描述"
        />
        <el-table-column
          prop="zip"
          label="奖励拍豆"
          width="120"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { fileUpload } from '@/api/index'
export default {
  data() {
    return {
      dialogVisible: false,
      file: [],
      fileData: null,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '18621170988',
        city: '普陀区',
        address: '社区维护',
        zip: '1000拍豆'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '18621170988',
        city: '普陀区',
        address: '社区维护',
        zip: '1000拍豆'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '18621170988',
        city: '普陀区',
        address: '社区维护',
        zip: '1000拍豆'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '18621170988',
        city: '普陀区',
        address: '社区维护',
        zip: '1000拍豆'
      }]
    }
  },
  mounted() {
    this.fileData = new FormData()
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    submit() {
      this.dialogVisible = false
    },
    cancel() {
      this.dialogVisible = false
    },
    uploadFile(file) {
      debugger
      console.log('file: ', file)
      this.fileData.append('files', file.file) // append增加数据
    },
    handleRemove() {},
    fileChange() {
      const { uploadFiles } = this.$refs.upload
      console.log('uploadFiles: ', uploadFiles)
      this.fileData.append('file', uploadFiles[0].raw)
      console.log('fileData: ', this.fileData)

      fileUpload(this.fileData)
        .then((res) => {
          console.log('fileUpload-res: ', res)
          this.bannerForm.photo = res.data.path
          this.resCheck(res, '图片上传', false)
        })
    }
  }
}
</script>

<style>
</style>
