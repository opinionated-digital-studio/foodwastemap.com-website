<template>
  <div>
    <FWSMHero />
    <FrontBlurb />
    <FWSMCallToAction />
  </div>
</template>

<script lang="ts">
import FWSMHero from "~/components/FWSMHero.vue";
import FWSMCallToAction from "~/components/FWSMCallToAction.vue";
import FrontBlurb from "~/components/partials/FrontBlurb.vue";
import Vue from "vue";
export default Vue.extend({
  components: {
    FWSMHero,
    FWSMCallToAction,
    FrontBlurb
  }
});
</script>
