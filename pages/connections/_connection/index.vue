<template>
  <div>
    <section class="section">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <a href="/">{{ $t("pages.home") }}</a>
            </li>
            <li>
              <a href="/connections" aria-current="page">{{
                $t("pages.connections")
              }}</a>
            </li>
            <li>
              <a :href="`/connections/${currentConnectionSlug}`">{{
                currentConnectionTitle
              }}</a>
            </li>

            <li class="is-active">
              <a
                :href="
                  `/connections/${currentConnectionSlug}/${currentPage.slug}`
                "
                aria-current="page"
                >{{ currentPage.title }}</a
              >
            </li>
          </ul>
        </nav>
        <div class="columns">
          <div class="column is-two-thirds">
            <span class="is-size-4 mb-3 has-text-grey">{{
              currentConnectionTitle
            }}</span>
            <h2 class="title is-2">{{ currentPage.title }}</h2>
            <div class="content" v-html="currentPage.content"></div>
          </div>
          <div class="column">
            <aside class="menu">
              <p class="menu-label">{{ currentConnectionTitle }}</p>
              <ul class="menu-list">
                <li v-for="page in relatedPages" :key="page.slug">
                  <a
                    :href="
                      localePath(
                        '/connections/' +
                          currentConnectionSlug +
                          '/' +
                          page.slug
                      )
                    "
                    :class="{ 'is-active': page.slug === currentPage.slug }"
                    >{{ page.title }}</a
                  >
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
    <FWSMCallToAction />
  </div>
</template>

<script>
function titleize(slug) {
  var words = slug.split("-");
  return words
    .map(function(word) {
      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(" ");
}

import bucket from "~/plugins/cosmic";
import FWSMCallToAction from "~/components/FWSMCallToAction.vue";
export default {
  async asyncData(context) {
    const relatedPages = await bucket.getObjects({
      type: "segments",
      props: "title,slug,content",
      locale: context.app.i18n.localeProperties.iso,
      metadata: {
        connection:
          context.params.connection.charAt(0).toUpperCase() +
          context.params.connection.slice(1)
      }
    });
    return {
      currentPage: relatedPages.objects[0],
      relatedPages: relatedPages.objects.sort(function(a, b) {
        if (a.slug < b.slug) {
          return -1;
        }
        if (a.slug > b.slug) {
          return 1;
        }
        return 0;
      }),
      currentConnectionSlug: context.params.connection
    };
  },
  computed: {
    currentConnectionTitle: function() {
      switch (this.currentConnectionSlug) {
        case "production":
          return "Production and post harvesting";
        case "processing":
          return "Processing";
        case "packaging":
          return "Packaging, storage and ripening";
        case "distribution":
          return "Distribution";
        case "retail":
          return "Retail";
      }
    }
  },
  components: {
    FWSMCallToAction
  }
};
</script>
