<template>
  <div>
    <section class="section">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a href="/">Home</a></li>
            <li class="is-active">
              <a href="/connections" aria-current="page">Connections</a>
            </li>
          </ul>
        </nav>
        <h1 class="title is-1">Connections</h1>
        <div class="columns">
          <div class="column is-two-thirds">
            <p class="subtitle pb-5 mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              dicta id consequatur expedita aperiam consectetur provident in
              sapiente, quidem quas sit. Alias laborum error quasi dolor autem
              ex repudiandae soluta?
            </p>
            <hr />
          </div>
        </div>

        <nav class="fwsm-sectors">
          <a
            href="/connections/subsector-example-1"
            class="fwsm-sectors__link block"
          >
            <div class="fwsm-sectors__icon">
              <i class="fas fa-flag fa-2x"></i>
            </div>
            <div class="fwsm-sectors__text">
              <h2 class="title is-4">Sector 1</h2>
              <p class="subtitle is-5">A short description</p>
            </div>
          </a>
          <a href="" class="fwsm-sectors__link block">
            <div class="fwsm-sectors__icon">
              <i class="fas fa-flag fa-2x"></i>
            </div>
            <div class="fwsm-sectors__text">
              <h2 class="title is-4">Sector 2</h2>
              <p class="subtitle is-5">A short description</p>
            </div>
          </a>
          <a href="" class="fwsm-sectors__link block">
            <div class="fwsm-sectors__icon">
              <i class="fas fa-flag fa-2x"></i>
            </div>
            <div class="fwsm-sectors__text">
              <h2 class="title is-4">Sector 3</h2>
              <p class="subtitle is-5">A short description</p>
            </div>
          </a>
          <a href="" class="fwsm-sectors__link block">
            <div class="fwsm-sectors__icon">
              <i class="fas fa-flag fa-2x"></i>
            </div>
            <div class="fwsm-sectors__text">
              <h2 class="title is-4">Sector 4</h2>
              <p class="subtitle is-5">A short description</p>
            </div>
          </a>
          <a href="" class="fwsm-sectors__link block">
            <div class="fwsm-sectors__icon">
              <i class="fas fa-flag fa-2x"></i>
            </div>
            <div class="fwsm-sectors__text">
              <h2 class="title is-4">Sector 5</h2>
              <p class="subtitle is-5">A short description</p>
            </div>
          </a>
        </nav>
      </div>
    </section>
    <FWSMCallToAction />
  </div>
</template>

<style lang="scss" scoped>
.fwsm-sectors {
  @include desktop() {
    display: flex;
    flex-wrap: wrap;
  }

  &__icon {
    margin-right: 2rem;
    color: $primary !important;
  }

  &__link {
    padding: 2rem;
    display: flex;

    @include desktop() {
      width: 50%;
    }

    &:hover {
      background-color: $white-ter;
    }
  }
}
</style>

<script lang="ts">
import FWSMCallToAction from "~/components/FWSMCallToAction.vue";
import Vue from "vue";
export default Vue.extend({
  components: {
    FWSMCallToAction
  }
});
</script>
