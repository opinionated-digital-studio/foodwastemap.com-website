<template>
  <header class="header">
    <div class="container">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img id="logo" src="~/assets/images/logo.png" />
          </a>

          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="mainNav"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="mainNav" class="navbar-menu">
          <div class="navbar-start">
            <a href="/" class="navbar-item">
              Home
            </a>

            <a href="/connections" class="navbar-item">
              Connections
            </a>

            <a href="/platform" class="navbar-item">
              Platform
            </a>

            <a href="/about" class="navbar-item">
              About
            </a>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a href="/sign-up" class="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a class="button is-light">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  border-bottom: 1px solid $grey-lighter;
  background-color: $scheme-main;
}
.navbar {
  @include desktop() {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}
#logo {
  @include desktop() {
    max-width: 10rem;
    max-height: 15rem;
    height: auto;
    width: auto;
  }
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "FWSMHeader"
});
</script>
