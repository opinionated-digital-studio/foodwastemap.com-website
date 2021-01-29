<template>
  <section class="hero is-primary mt-5">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column">
            <img src="~/assets/images/fwsm_poster.png" id="fwsm-poster" />
          </div>
          <div class="column">
            <h3 class="title is-1">{{ $t('cta.posterDownload.title') }}</h3>
            <a target="_blank" href="/download/fwsm-poster.pdf" class="button is-white">{{ $t('cta.posterDownload.action') }}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
}
#fwsm-poster {
  width: 30rem;
}
</style>

<script>
export default {
  name: "FWSMPosterDownload",
};
</script>
