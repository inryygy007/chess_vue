<script setup>
import { useRouter } from "vue-router";
import * as fgui from "fairygui-dom";

const router = useRouter();

async function start() {
  await fgui.UIPackage.loadPackage("src/assets/uis/Login");

  let view = fgui.UIPackage.createObject("Login", "LoginDialog");
  view.makeFullScreen();
  fgui.GRoot.inst.addChild(view);

  let loginBtn = view.getChildByPath("loginBtn");
  loginBtn.onClick(() => {
    console.log("onClick,,,");
    console.log(router);
    // router.push("login");
    // toLogin()
  });
}
console.log("start....");
// await start();

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
                  <router-link :to="{ name: 'login' }">
                    <a-button type="primary">Login</a-button>
                  </router-link>
                  <router-link :to="{ name: 'register' }">
                    <a-button>Register</a-button>
                  </router-link>
                </a-space>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <div class="container">
      <video class="container" width="600" height="600" controls autoplay>
        <source
          src="../assets/video/3922c3c6a1a4e140bc1447b35ede3da5.mp4"
          type="video/ogg"
        />
        <source
          src="../assets/video/3922c3c6a1a4e140bc1447b35ede3da5.mp4"
          type="video/mp4"
        />
        <source
          src="../assets/video/3922c3c6a1a4e140bc1447b35ede3da5.mp4"
          type="video/webm"
        />
        <object
          data="../assets/video/3922c3c6a1a4e140bc1447b35ede3da5.mp4"
          width="320"
          height="240"
        >
          <embed width="320" height="240" src="movie.swf" />
        </object>
      </video>
    </div>
    <footer class="">
      底部
      <!-- <RouterView /> -->
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/components/navbar.sass";
@import "bulma/sass/elements/container.sass";
</style>
