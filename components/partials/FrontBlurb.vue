<template>
  <div>
    <section class="section">
      <div class="container">
        <h2 class="title is-2 has-text-centered">
          Lorem ipsum dolor sit amet
        </h2>

        <div class="columns">
          <div class="column is-half">
            <small class="caption is-primary">Connections</small>
            <h2 class="subtitle">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h2>
            <p class="mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nisi
              quo deserunt eius ratione, exercitationem repellat expedita
              voluptatem itaque cum, ab alias nulla ipsa ad, cupiditate dolorem
              voluptatibus aperiam aliquam.
            </p>
            <a href="/connections">Read more</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-half">
            <small class="caption is-primary">Platform</small>
            <h2 class="subtitle">
              Lorem ipsum <strong>dolor</strong> sit amet, doloremque ipsam
              minus ratione quam cupiditate in.
            </h2>
            <p class="mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nisi
              quo deserunt eius ratione, exercitationem repellat expedita
              voluptatem itaque cum, ab alias nulla ipsa ad, cupiditate dolorem
              voluptatibus aperiam aliquam.
            </p>
            <a href="/platform">Read more</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-half">
            <small class="caption is-primary">Innovation Media</small>
            <h2 class="subtitle">
              Lorem ipsum dolor sit amet
            </h2>
            <p class="mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nisi
              quo deserunt eius ratione, exercitationem repellat expedita
              voluptatem itaque cum, ab alias nulla ipsa ad, cupiditate dolorem
              voluptatibus aperiam aliquam.
            </p>
            <a href="/about">Read more</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 4rem !important;
}

.caption {
  display: block;
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  color: $primary;
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "FrontBlurb"
});
</script>
