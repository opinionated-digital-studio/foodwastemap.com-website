<template>
  <div>
    <section class="section">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <a :href="localePath('/')">{{ $t("pages.home") }}</a>
            </li>
            <li>
              <a :href="localePath('/connections')" aria-current="page">{{
                $t("pages.connections")
              }}</a>
            </li>
            <li>
              <a :href="localePath(`/connections/${currentConnectionSlug}`)">{{
                currentConnectionTitle
              }}</a>
            </li>

            <li class="is-active">
              <a
                :href="
                  localePath(
                    `/connections/${currentConnectionSlug}/${currentPage.slug}`
                  )
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
import bucket from "~/plugins/cosmic";
import FWSMCallToAction from "~/components/FWSMCallToAction.vue";
export default {
  async asyncData(context) {
    const currentPage = await bucket.getObject({
      slug: context.params.slug,
      props: "title,content,slug",
      locale: context.app.i18n.localeProperties.iso
    });
    const relatedPages = await bucket.getObjects({
      type: "segments",
      props: "title,slug",
      metadata: {
        connection:
          context.params.connection.charAt(0).toUpperCase() +
          context.params.connection.slice(1)
      },
      locale: context.app.i18n.localeProperties.iso
    });
    return {
      currentPage: currentPage.object,
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
