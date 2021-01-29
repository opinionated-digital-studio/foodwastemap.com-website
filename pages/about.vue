<template>
  <div>
    <section class="section">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <a :href="localePath('/')">{{ $t("pages.home") }}</a>
            </li>
            <li class="is-active">
              <a :href="localePath('/about')" aria-current="page">{{
                $t("pages.about")
              }}</a>
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
    console.log("async hit");
    const currentPage = await bucket.getObject({
      slug: "about",
      locale: context.app.i18n.localeProperties.iso
    });

    return {
      currentPage: currentPage.object
    };
  }
};
</script>
