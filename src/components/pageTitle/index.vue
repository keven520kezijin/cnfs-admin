<template>
  <div class="title-page">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style  lang="scss" scoped>
.title-page {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px #DADADB solid;
  padding-left: 20px;
  background-image: url("~@/assets/admin/line.png");
  background-position: 0 center;
  background-repeat: no-repeat;
}
</style>
