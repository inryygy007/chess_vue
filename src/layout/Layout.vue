<script setup>
import { RouterView, useRouter } from "vue-router";
import { defineProps, ref, reactive, getCurrentInstance } from "vue";

const router = useRouter();
// 去登录页
const toLogin = () => {
  router.push("login");
};
// 去注册页
const toRegister = ()=>{

}
</script>
<template>
  <div>
    <header class="header">
      <nav
        class="navbar is-spaced has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.zcopy.site">
              <img
                src="https://bulma.zcopy.site/images/bulma-logo.png"
                width="112"
                height="28"
              />
            </a>

            <a
              role="button"
              class="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-end">
              <div class="navbar-item">
                <a-space>
                  <a-button type="primary" @click="toLogin">Login</a-button>
                  <a-button @click="toRegister">Register</a-button>
                </a-space>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <div class="container">
      <video class="container" width="800" height="800" controls autoplay>
        <source
          src=" https://www.runoob.com/try/demo_source/movie.ogg"
          type="video/ogg"
        />
        <source
          src=" https://www.runoob.com/try/demo_source/movie.ogg"
          type="video/mp4"
        />
        <source
          src=" https://www.runoob.com/try/demo_source/movie.ogg"
          type="video/webm"
        />
        <object
          data=" https://www.runoob.com/try/demo_source/movie.ogg"
          width="320"
          height="240"
        >
          <embed width="320" height="240" src="movie.swf" />
        </object>
      </video>
    </div>
    <footer class="">底部</footer>
  </div>
  <!-- <RouterView /> -->
</template>

<style lang="scss" scoped>
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/components/navbar.sass";
@import "bulma/sass/elements/container.sass";
</style>
