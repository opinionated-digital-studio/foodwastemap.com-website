<template>
  <div>
    <FWSMHero :searchGETPath="searchGETPath" />
    <FrontBlurb :currentPage="currentPage" />
    <FWSMPosterDownload />
  </div>
</template>

<script>
import bucket from "~/plugins/cosmic";
import FWSMHero from "~/components/FWSMHero.vue";
import FWSMCallToAction from "~/components/FWSMCallToAction.vue";
import FWSMPosterDownload from "~/components/FWSMPosterDownload.vue";
import FrontBlurb from "~/components/partials/FrontBlurb.vue";
export default {
  components: {
    FWSMHero,
    FWSMPosterDownload,
    FWSMCallToAction,
    FrontBlurb
  },
  async asyncData({ app }) {
    const currentPage = await bucket.getObject({
      slug: "home",
      props: "metadata",
      locale: app.i18n.localeProperties.iso
    });
    return {
      searchGETPath: app.localePath("/platform"),
      currentPage: currentPage.object.metadata
    };
  }
};
</script>
