<template>
  <div class="block">
    <div class="field has-addons">
      <div class="control has-icons-left">
        <div class="select">
          <select name="" id="">
            <option value="">All sectors</option>
            <option value="">Production</option>
            <option value="">Harvesting</option>
            <option value="">Processing</option>
            <option value="">Packaging, storage &amp; ripening</option>
            <option value="">etc</option>
          </select>
        </div>
        <span class="icon is-small is-left">
          <i class="fas fa-list"></i>
        </span>
      </div>
      <div class="control has-icons-left">
        <div class="select">
          <select name="" id="">
            <option value="">All countries</option>
            <option value="">The Netherlands</option>
            <option value="">Georgia</option>
            <option value="">Russia</option>
            <option value="">etc</option>
          </select>
        </div>
        <span class="icon is-small is-left">
          <i class="fas fa-globe"></i>
        </span>
      </div>
      <div class="control is-expanded has-icons-left">
        <input class="input" type="text" placeholder="Find a repository" />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </div>
      <div class="control">
        <button type="submit" class="button is-primary">
          Search
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "FWSMMainSearch"
});
</script>
