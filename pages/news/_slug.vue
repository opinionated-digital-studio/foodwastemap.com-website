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
              <a :href="localePath('/about')" aria-current="page">{{
                $t("pages.news")
              }}</a>
            </li>
            <li class="is-active">
              <a
                :href="localePath('/about/' + currentPage.slug)"
                aria-current="page"
                >{{ currentPage.title }}</a
              >
            </li>
          </ul>
        </nav>

        <h1 class="title is-1">{{ currentPage.title }}</h1>
        <div class="columns">
          <div class="column is-two-thirds">
            <em
              ><p class="mb-4">
                {{ $t("common.postedOn") }} {{ postedOn }}
              </p></em
            >
            <br />
            <div class="content" v-html="currentPage.content"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import bucket from "~/plugins/cosmic";
import { format } from "date-fns";
import { enUS, nl } from "date-fns/locale";
const locales = { en: enUS, nl };

export default {
  async asyncData(context) {
    const currentPage = await bucket.getObject({
      slug: context.params.slug,
      locale: context.app.i18n.localeProperties.iso
    });

    return {
      currentPage: currentPage.object
    };
  },
  computed: {
    postedOn: function() {
      if (this.currentPage.published_at) {
        const postedOn = new Date(this.currentPage.published_at);
        const formatDate = format(postedOn, "dd MMMM, yyyy", {
          locale: locales[this.$i18n.locale]
        });
        return formatDate;
      }
    }
  }
};
</script>
