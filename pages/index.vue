<template>
  <div>
    <FWSMHero />
    <FrontBlurb />
    <FWSMPosterDownload />
  </div>
</template>

<script>
import FWSMHero from "~/components/FWSMHero.vue";
import FWSMCallToAction from "~/components/FWSMCallToAction.vue";
import FWSMPosterDownload from "~/components/FWSMPosterDownload.vue";
import FrontBlurb from "~/components/partials/FrontBlurb.vue";
import Vue from "vue";
export default {
  components: {
    FWSMHero,
    FWSMPosterDownload,
    FWSMCallToAction,
    FrontBlurb
  }
};
</script>
