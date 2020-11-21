<template>
  <div>
    <section class="section">
      <div class="container">
        <a class="fwsm-search-app__back-link" href="/platform"
          >&#8592; Back to results</a
        >
        <div class="fwsm-search-app__company-info">
          <div class="fwsm-search-app__company-image"></div>
          <div class="fwsm-search-app__company-details">
            <h1 class="title is-2">Example company</h1>
            <div class="fwsm-search-app__company-location">
              <i class="fas fa-map-marker-alt"></i> &nbsp; Amsterdam, The
              Netherlands
            </div>
            <div class="fwsm-search-app__company-website">
              <a href="">https://www.example-site.nl</a>
            </div>
            <div class="fwsm-search-app__company-registered">
              Registered on 10 December 2020
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-two-thirds">
            <hr />
            <div class="company-description">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                dolore rerum quibusdam fugiat voluptates nisi dolor! Accusamus
                hic ab possimus eius nisi voluptatibus fugiat dignissimos
                exercitationem. Distinctio eligendi quae fugiat!
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
                sequi fugiat nihil sed nam quae alias? Odit sed, rem assumenda
                ipsum velit ab consectetur amet dolores unde, minus sunt illum!
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorem, totam! Et adipisci neque nisi dolor voluptatem,
                voluptates, temporibus magnam, nobis minima quidem libero ea
                aliquid. Soluta, enim provident! Sequi, ratione.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.fwsm-search-app {
  &__back-link {
    display: inline-block;
    margin-bottom: 1.5rem;
  }
  &__company-info {
    margin-bottom: 1rem;
    display: flex;
  }
  &__company-registered {
    color: $grey-light;
  }
  &__company-image {
    margin-right: 2rem;
    background-color: $grey-lighter;
    height: 160px;
    width: 160px;
  }
}
</style>
