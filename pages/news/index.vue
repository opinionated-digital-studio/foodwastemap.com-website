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
              <a :href="localePath('/news')" aria-current="page">{{
                $t("pages.news")
              }}</a>
            </li>
          </ul>
        </nav>

        <h1 class="title is-1">{{ $t("pages.news") }}</h1>
        <div
          class="columns"
          v-for="rowIdx in Math.ceil(newsPages.length / 3)"
          :key="rowIdx"
        >
          <div
            class="is-one-third column"
            v-for="newsItem in newsPages.slice(3 * (rowIdx - 1), 3 * rowIdx)"
            :key="newsItem.slug"
          >
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="newsItem.thumbnail" />
                </figure>
              </div>
              <div class="card-content">
                <h2 class="title is-3">{{ newsItem.title }}</h2>
                <a
                  :href="localePath('/news/' + newsItem.slug)"
                  class="button is-primary is-light is-medium"
                  >{{ $t("common.readMore") }}</a
                >
              </div>
            </div>
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
    const newsPages = await bucket.getObjects({
      type: "news",
      locale: context.app.i18n.localeProperties.iso
    });
    return {
      newsPages: newsPages.objects
    };
  }
};
</script>
