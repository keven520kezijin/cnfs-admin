<template>
  <div class="head-container">
    <span class="laber">申请内容：</span>
    <el-input
      v-model="query.applyTitle"
      clearable
      size="small"
      placeholder="请输入你要搜索的内容"
      style="width: 200px"
      class="filter-item"
    />

    <span class="laber">申请人：</span>
    <el-input
      v-model="query.proposer"
      clearable
      size="small"
      placeholder="请输入你要搜索的内容"
      style="width: 200px"
      class="filter-item"
    />

    <span class="laber">申请状态：</span>
    <el-select v-model="query.status" class="status-box" placeholder="请选择">
      <el-option
        v-for="item in statusOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </el-select>

    <span class="laber">审核人：</span>
    <el-input
      v-model="query.checker"
      clearable
      size="small"
      placeholder="请输入你要搜索的内容"
      style="width: 200px"
      class="filter-item"
    />
    <el-button type="primary" @click="search">搜索</el-button>
    <el-button type="warning">重置</el-button>
  </div>
</template>

<script>
import { statusOptions } from '@/utils/data'
export default {
  data() {
    return {
      statusOptions,
      query: {
        status: '',
        applyTitle: '',
        proposer: '', // 申请人
        checker: '' // 审核人
      }

    }
  },
  methods: {
    search() {
      this.$emit('search', this.query)
    }
  }
}
</script>

<style lang="scss" scoped>
.status-box {
  width: 120px;
  margin-right: 20px;
}
.head-container {
  margin-top: 10px;
  margin-bottom: 10px;
  .filter-item {
    margin-right: 20px;
  }
}
</style>
