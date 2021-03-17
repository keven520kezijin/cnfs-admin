<template>
  <div class="head-container">
    <span class="laber">标题：</span>
    <el-input
      v-model="query.title"
      clearable
      size="small"
      placeholder="请输入你要搜索的标题"
      style="width: 200px"
      class="filter-item"
    />
    <span class="laber">类别：</span>
    <el-select
      v-model="query.type"
      clearable
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
    <el-button type="primary" @click="search">搜索</el-button>
    <el-button type="warning" @click="resetForm">重置</el-button>
  </div>
</template>

<script>
import { typeOptions } from '@/utils/data.js'
export default {
  data() {
    return {
      typeOptions,
      query: {
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
  .filter-item, .el-select {
    margin-right: 20px;
  }
}
</style>
