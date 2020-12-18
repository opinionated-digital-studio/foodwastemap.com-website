<template>
  <section class="hero is-primary mt-5">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column">
            <img src="~/assets/images/fwsm_poster.png" id="fwsm-poster" />
          </div>
          <div class="column">
            <h3 class="title is-1">Put your organization on the map</h3>
            <a href="" class="button is-white">Download de Food Waste Map poster</a>
            <a href="" class="button is-white is-outlined">Contact us</a>
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
