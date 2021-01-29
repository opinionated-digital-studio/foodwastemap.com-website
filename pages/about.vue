<template>
  <div>
    <section class="section">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <nuxt-link :to="localePath('/')">{{
                $t("pages.home")
              }}</nuxt-link>
            </li>
            <li class="is-active">
              <nuxt-link :to="localePath('/about')" aria-current="page">{{
                $t("pages.about")
              }}</nuxt-link>
            </li>
          </ul>
        </nav>

        <h1 class="title is-1">{{ currentPage.title }}</h1>
        <div class="columns">
          <div class="column is-two-thirds">
            <p class="subtitle pb-5 mb-5">
              {{ currentPage.metadata.lead }}
            </p>
            <div class="content" v-html="currentPage.content"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import bucket from "~/plugins/cosmic";

export default {
  async asyncData(context) {
    const currentPage = await bucket.getObject({
      slug: "about",
      locale: context.app.i18n.localeProperties.iso,
    });

    return {
      currentPage: currentPage.object,
    };
  },
};
</script>
