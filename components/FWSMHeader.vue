<template>
  <header class="header">
    <div class="container">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item" :to="localePath('/')">
            <img id="logo" src="~/assets/images/logo.png" />
          </nuxt-link>
          <a
            role="button"
            class="navbar-burger burger"
            :class="{ 'is-active': isActive }"
            aria-label="menu"
            aria-expanded="false"
            data-target="mainNav"
            @click="toggleMenu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="mainNav"
          class="navbar-menu"
          :class="{ 'is-active': isActive }"
        >
          <div class="navbar-start">
            <nuxt-link :to="localePath('/')" class="navbar-item">
              {{ $t("pages.home") }}
            </nuxt-link>

            <nuxt-link :to="localePath('/connections')" class="navbar-item">
              {{ $t("pages.connections") }}
            </nuxt-link>

            <nuxt-link :to="localePath('/platform')" class="navbar-item">
              {{ $t("pages.platform") }}
            </nuxt-link>

            <nuxt-link v-if="!isAuthenticated" :to="localePath('/pricing')" class="navbar-item">
              {{ $t("pages.pricing") }}
            </nuxt-link>

            <nuxt-link :to="localePath('/about')" class="navbar-item">
              {{ $t("pages.about") }}
            </nuxt-link>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div v-if="isAuthenticated" class="buttons">
                <nuxt-link
                  class="button is-primary"
                  :to="localePath('/platform/profile/' + loggedInUser.organizationId)"
                  >{{ $t("profile.myProfile") }}
                </nuxt-link>
                <a class="button is-danger" href="" @click="logout">
                  {{ $t("auth.signOut") }}
                </a>
              </div>
              <div v-else class="buttons">
                <nuxt-link :to="localePath('/sign-up')" class="button is-primary">
                  <strong>{{ $t("auth.signUp") }}</strong>
                </nuxt-link>
                <nuxt-link :to="localePath('/sign-in')" class="button is-light">
                  {{ $t("auth.signIn") }}
                </nuxt-link>
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
            <div class="navbar-item">
              <div class="dropdown is-hoverable">
                <div class="dropdown-trigger">
                  <button
                    class="button is-small"
                    aria-haspopup="true"
                    aria-controls="language-switcher"
                  >
                    <span>{{ this.$i18n.localeProperties.name }}</span>
                    <span class="icon is-small">
                      <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu" id="language-switcher" role="menu">
                  <div class="dropdown-content">
                    <div class="dropdown-item">
                      <a
                        v-for="locale in availableLocales"
                        :key="locale.code"
                        role="button"
                        href="#"
                        @click.prevent.stop="setLocale(locale.code)"
                        >{{ locale.name }}</a
                      >
                    </div>
                  </div>
                </div>
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

<script>
import { mapGetters } from "vuex";
export default {
  name: "FWSMHeader",
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
    availableLocales: function () {
      return this.$i18n.locales.filter(
        (locale) => locale.code !== this.currentLocale
      );
    },
  },
  data() {
    return {
      isActive: false,
      currentLocale: this.$i18n.getLocaleCookie()
    };
  },
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive;
    },
    async logout() {
      await this.$auth.logout();
    },
    setLocale(locale) {
      this.currentLocale = locale
      this.$i18n.setLocale(locale)
      this.$i18n.setLocaleCookie(locale)
    }
  },
};
</script>
