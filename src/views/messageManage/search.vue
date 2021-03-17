<template>
  <div class="head-container">
    <span class="laber">消息ID：</span>
    <el-input
      v-model="query.id"
      clearable
      size="small"
      placeholder="请输入你要搜索的内容"
      style="width: 200px"
      class="filter-item"
    />
    <!-- <span class="laber">发送时间：</span>
    <el-date-picker
      v-model="query.pubDate"
      class="daterange-box"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    /> -->
    <span class="laber">消息标题：</span>
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
        id: '',
        pubDate: '',
        title: ''
      }
    }
  },
  methods: {
    resetForm() {
      this.query = {
        id: '',
        pubDate: '',
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
