<template>
  <div class="footer">
    <div class="footer-container">
      <footer class="footer-layout">
        <div class="footer-layout-link">
          <a href="/#" target="_blank">
            <span class="icons-list"><i class="iconfont">&#xe6bb;</i></span>
            个人主页
          </a>
          <a
            href="https://github.com/winterfree?tab=repositories"
            target="_blank"
          >
            <span class="icons-list"><i class="iconfont">&#xe603;</i></span>
            github
          </a>
          <a href="/#" target="_blank">
            <span class="icons-list"><i class="iconfont">&#xe602;</i></span>
            新浪微博
          </a>
        </div>
        <div class="footer-layout-copyright">
          Copyright&nbsp;&nbsp; ©&nbsp; 2020&nbsp;Richard Yan
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  .footer-container {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    z-index: 100;
    .footer-layout {
      margin: 48px 0 24px;
      padding: 0 16px;
      text-align: center;
      .footer-layout-link {
        margin-bottom: 8px;
        a {
          color: rgba(0, 0, 0, 0.45);
          transition: all 0.3s;
          span {
            margin-right: 3px;
            font-size: 14px;
          }
        }
        a:not(:last-child) {
          margin-right: 40px;
        }
        a:hover {
          color: #409eff;
        }
      }
      .footer-layout-copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
  }
}
</style>
