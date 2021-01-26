<template>
  <div>
    <section class="section">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/connections">Connections</a></li>
            <li>
              <a :href="`/connections/${currentConnection.slug}`">{{
                currentConnection.title
              }}</a>
            <li class="is-active">
              <a :href="`/connections/${currentConnection.slug}/${currentPage.slug}`" aria-current="page">{{
                currentPage.title
              }}</a>
            </li>
          </ul>
        </nav>
        <div class="columns">
          <div class="column is-two-thirds">
            <h2 class="title is-1 mb-4">{{ currentPage.title }}</h2>
            <div class="content" v-html="currentPage.content"></div>
          </div>
          <div class="column">
            <aside class="menu">
              <p class="menu-label">{{ currentConnection.title }}</p>
              <ul class="menu-list">
                <li v-for="page in relatedPages" :key="page.slug">
                  <a
                    :href="'/connections/production/' + page.slug"
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
    .map(function (word) {
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
      metadata: {
        connection: context.params.connection.charAt(0).toUpperCase() + context.params.connection.slice(1)
      }
    });
    return {
      currentPage: relatedPages.objects[0],
      relatedPages: relatedPages.objects,
      currentConnection: {
        title: titleize(context.params.connection),
        slug: context.params.connection,
      },
    };
  },
  components: {
    FWSMCallToAction,
  },
};
</script>
