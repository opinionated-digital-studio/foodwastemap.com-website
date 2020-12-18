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

            <a v-if="!isAuthenticated" href="/pricing" class="navbar-item">
              Pricing
            </a>

            <a href="/about" class="navbar-item">
              About
            </a>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div v-if="isAuthenticated" class="buttons">
                <a
                  class="button is-primary"
                  :href="'/platform/profile/' + loggedInUser.id"
                  >My profile</a
                >
                <a class="button is-danger" href="" @click="logout">Sign out</a>
              </div>
              <div v-else class="buttons">
                <a href="/sign-up" class="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a href="/sign-in" class="button is-light">
                  Sign in
                </a>
              </div>
            </div>
            <div class="navbar-item">
              <a
                href="https://twitter.com/in_me20"
                target="__blank"
                aria-label="Twitter"
                ><i class="fab fa-twitter"></i
              ></a>
            </div>
            <div class="navbar-item">
              <a
                href="https://www.instagram.com/inme_magazine/"
                target="__blank"
                aria-label="Instagram"
                ><i class="fab fa-instagram"></i
              ></a>
            </div>
            <div class="navbar-item">
              <a
                href="https://www.linkedin.com/in/irinatskiti/?originalSubdomain=nl"
                target="__blank"
                aria-label="LinkedIn"
                ><i class="fab fa-linkedin-in"></i
              ></a>
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

<script>
import { mapGetters } from "vuex";
export default {
  name: "FWSMHeader",
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"])
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    }
  }
};
</script>
