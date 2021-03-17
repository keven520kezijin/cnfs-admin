<template>
  <div class="head-container">
    <span class="laber">用户名：</span>
    <el-input
      v-model="query.name"
      clearable
      size="small"
      placeholder="请输入用户名"
      style="width: 200px"
      class="filter-item"
    />
    <span class="laber">用户手机号：</span>
    <el-input
      v-model="query.phone"
      clearable
      size="small"
      placeholder="请输入用户手机号"
      style="width: 200px"
      class="filter-item"
    />
    <span class="laber">昵称：</span>
    <el-input
      v-model="query.nickname"
      clearable
      size="small"
      placeholder="请输入昵称"
      style="width: 200px"
      class="filter-item"
    />
    <span class="laber">城市：</span>
    <el-input
      v-model="query.city"
      clearable
      size="small"
      placeholder="请输入城市"
      style="width: 200px"
      class="filter-item"
    />
    <el-button type="primary" @click="search">搜索</el-button>
    <el-button type="warning" @click="resetForm">重置</el-button>
  </div>
</template>

<script>
import { bannerTypeOptions } from '@/utils/data'
export default {
  data() {
    return {
      bannerTypeOptions,
      query: {
        name: '',
        idCardNo: '',
        nickname: '',
        city: '',
        title: '',
        type: ''
      }
    }
  },
  methods: {
    resetForm() {
      this.query = {
        title: '',
        type: ''
      }
    },
    search() {
      this.$emit('search', this.query)
    }
  }
}
</script>

<style lang="scss" scoped>
.head-container {
  margin-top: 10px;
  margin-bottom: 10px;
  .filter-item {
    margin-right: 20px;
  }
  .status-box {
    margin-right: 20px;
  }
}
</style>
