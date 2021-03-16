<template>
  <header class="header">
    <div class="container">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" :href="localePath('/')">
            <img id="logo" src="~/assets/images/logo.png" />
          </a>
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
            <a :href="localePath('/connections')" class="navbar-item">
              {{ $t("pages.connections") }}
            </a>

            <a :href="localePath('/platform')" class="navbar-item">
              {{ $t("pages.platform") }}
            </a>

            <a
              v-if="!isAuthenticated"
              :href="localePath('/pricing')"
              class="navbar-item"
            >
              {{ $t("pages.pricing") }}
            </a>

            <a :href="localePath('/about')" class="navbar-item">
              {{ $t("pages.about") }}
            </a>

            <a :href="localePath('/news')" class="navbar-item">
              {{ $t("pages.news") }}
            </a>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div v-if="isAuthenticated" class="buttons">
                <a
                  class="button is-primary"
                  :href="
                    localePath(
                      '/platform/profile/' + loggedInUser.organizationId
                    )
                  "
                  >{{ $t("profile.myProfile") }}
                </a>
                <a class="button is-danger" href="" @click="logout">
                  {{ $t("auth.signOut") }}
                </a>
              </div>
              <div v-else class="buttons">
                <a :href="localePath('/sign-up')" class="button is-primary">
                  <strong>{{ $t("auth.signUp") }}</strong>
                </a>
                <a :href="localePath('/sign-in')" class="button is-light">
                  {{ $t("auth.signIn") }}
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
                href="https://nl.linkedin.com/company/in-me"
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
                    <div
                      v-for="locale in availableLocales"
                      :key="locale.code"
                      class="dropdown-item"
                    >
                      <a
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
    availableLocales: function() {
      return this.$i18n.locales.filter(
        locale => locale.code !== this.currentLocale
      );
    }
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
    async setLocale(locale) {
      this.currentLocale = locale;
      this.$i18n.setLocaleCookie(locale);
      this.$router.push(this.switchLocalePath(locale));
    }
  }
};
</script>
