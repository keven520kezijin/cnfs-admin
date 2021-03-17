<template>
  <div class="head-container">
    <span class="laber">标题：</span>
    <el-input
      v-model="query.title"
      clearable
      size="small"
      placeholder="请输入你要搜索的内容"
      style="width: 200px"
      class="filter-item"
    />
    <el-button type="primary" @click="search">搜索</el-button>
    <el-button type="warning" @click="resetForm">重置</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        title: ''
      }
    }
  },
  methods: {
    resetForm() {
      this.query = {
        title: ''
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
}
</style>
