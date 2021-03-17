<template>
  <section class="app-main">
    <div class="page-header-wrapper">
      <h2 class="title">{{ $route.meta.title }}</h2>
      <div v-if="$route.meta.isBack" class="back" @click="$router.go(-1)">&lt; 返回上一页</div>
    </div>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #f0f2f5;
  .page-header-wrapper {
    height: 50px;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    h2 {
      display: block;
      float: left;
      margin: 0;
      padding-right: 12px;
      padding-left: 18px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
      font-size: 20px;
      line-height: 32px;
    }
    .back {
      font-size: 14px;
      line-height: 32px;
      padding-left: 20px;
    }
  }
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
