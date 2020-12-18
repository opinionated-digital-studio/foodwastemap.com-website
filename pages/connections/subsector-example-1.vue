<template>
  <div>
    <section class="section">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/connections">Connections</a></li>
            <li class="is-active">
              <a href="/connections/subsector-example-1" aria-current="page"
                >Subsector example 1</a
              >
            </li>
          </ul>
        </nav>
        <div class="columns">
          <div class="column is-two-thirds">
            <h2 class="title is-1 mb-4">Subsector example 1</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              veniam, voluptates, excepturi earum eaque neque deserunt eum
              nesciunt explicabo sit vel, corrupti enim magni quibusdam amet
              repudiandae necessitatibus? Explicabo, soluta?
            </p>
          </div>
          <div class="column">
            <aside class="menu">
              <p class="menu-label">Sector name</p>
              <ul class="menu-list">
                <li><a class="is-active">Subsector example 1</a></li>
                <li><a>Subsector example 2</a></li>
                <li><a>Subsector example 3</a></li>
                <li><a>Subsector example 4</a></li>
                <li><a>Subsector example 5</a></li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
    <FWSMCallToAction />
  </div>
</template>

<script>
import FWSMCallToAction from "~/components/FWSMCallToAction.vue";
export default {
  components: {
    FWSMCallToAction
  }
};
</script>
