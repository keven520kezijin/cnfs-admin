<template>
  <div class="details-container">
    <p-title title="信息详情" />
    <div class="main">
      <div class="detail-title">
        <h4>阿里云服务器待处理漏洞周报 {{ $route.query.id }}</h4>
        <div>2020-10-6</div>
      </div>
      <div class="content">
        <p>
          尊敬的liz****iziyi19890720：<br>
          阿里云云安全中心检测到您存在84个待处理漏洞：13个高危、51个中危、20个低危，建议您修复高中危漏洞预防黑客或是病毒攻击。<br>
          您可登录云安全中心控制台-漏洞管理查看详情，产品提供7天企业版免费试用，开通试用后可一键修复漏洞。<br>
          产品控制台默认展示高、中危漏洞，在漏洞管理设置中勾选扫描低危漏洞，可看到低危漏洞信息。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import pTitle from '@/components/pageTitle'
export default {
  components: {
    pTitle
  },
  created() {
    console.log('$route: ', this.$route.query.id)
  }
}
</script>

<style lang="scss" scoped>
.details-container {
  margin: 20px 30px;
  position: relative;
  .main {
    border: 1px #dadadb solid;
    padding: 20px 40px;
    margin: 20px 0;
    .detail-title {
      text-align: center;
      font-size: 14px;
      h4 {
        font-size: 18px;
        font-weight: normal;
        margin: 10px 0;
      }
    }
    .content {
      margin-top: 10px;
      border-top: 1px #ddd solid;
      line-height: 40px;
    }
  }
}
</style>
