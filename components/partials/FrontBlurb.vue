<template>
  <div>
    <section class="section">
      <div class="container">
        <h2 class="title is-4 has-text-centered">
          {{ $t("home.slogan2") }}
        </h2>

        <div class="columns">
          <div class="column is-half">
            <small class="caption is-primary">{{
              $t("home.connectionTitle")
            }}</small>
            <h2 class="subtitle">{{ currentPage.connections_blurb_title }}</h2>
            <div
              class="content mb-4"
              v-html="currentPage.connections_blurb"
            ></div>
            <a href="/connections">{{ $t("common.readMore") }}</a>
          </div>
          <div class="column">
            <img src="~/assets/images/connections.png" />
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <img src="~/assets/images/platform.png" alt="" />
          </div>
          <div class="column is-half">
            <small class="caption is-primary">{{
              $t("home.platformTitle")
            }}</small>
            <h2 class="subtitle">{{ currentPage.platform_blurb_title }}</h2>
            <div class="content mb-4" v-html="currentPage.platform_blurb"></div>
            <a href="/platform">{{ $t("common.readMore") }}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-half">
            <small class="caption is-primary">{{
              $t("home.whyFWSMTitle")
            }}</small>
            <h2 class="subtitle">{{ currentPage.platform_blurb_title }}</h2>
            <div class="content mb-4" v-html="currentPage.platform_blurb"></div>
            <a href="/about">{{ $t("common.readMore") }}</a>
          </div>
          <div class="column">
            <img src="~/assets/images/mapping.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 4rem !important;
}

.caption {
  display: block;
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  color: $primary;
}
</style>

<script>
export default {
  name: "FrontBlurb",
  props: {
    currentPage: {
      type: Object,
      required: true
    }
  }
};
</script>
