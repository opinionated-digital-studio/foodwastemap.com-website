<template>
  <div>
    <FWSMHeader />
    <nuxt />
    <FWSMFooter />
  </div>
</template>

<script lang="ts">
import FWSMHeader from "~/components/FWSMHeader.vue";
import FWSMFooter from "~/components/FWSMFooter.vue";
import Vue from "vue";
export default Vue.extend({
  components: { FWSMHeader, FWSMFooter }
});
</script>
