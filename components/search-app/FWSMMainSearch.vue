<template>
  <div class="block">
    <form novalidate @submit.prevent="performSearch">
      <div class="field has-addons">
        <div class="control has-icons-left">
          <div class="select">
            <select
              name="sectorId"
              id="select-fwsm-sector"
              v-model="selectedSector"
            >
              <option value="">All sectors</option>
              <option
                v-for="fwsmSector in fwsmSectors"
                :key="fwsmSector.id"
                :value="fwsmSector.id"
                v-html="fwsmSector.name"
              ></option>
            </select>
          </div>
          <span class="icon is-small is-left">
            <i class="fas fa-list"></i>
          </span>
        </div>
        <div class="control has-icons-left">
          <div class="select">
            <select
              name="country"
              id="select-country"
              v-model="selectedCountry"
            >
              <option value="">All countries</option>
            </select>
          </div>
          <span class="icon is-small is-left">
            <i class="fas fa-globe"></i>
          </span>
        </div>
        <div class="control is-expanded has-icons-left">
          <input
            class="input"
            name="orgName"
            type="text"
            placeholder="Find a company"
            v-model="searchQuery"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
        </div>
        <div class="control">
          <button type="submit" class="button is-primary">Search</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "FWSMMainSearch",
  data() {
    return {
      searchQuery: "",
      selectedCountry: "",
      selectedSector: "",
    };
  },
  props: {
    fwsmSectors: {
      type: Array,
      required: true,
    },
  },
  methods: {
    performSearch() {
      this.$emit("doSearch", {
        searchQuery: this.searchQuery,
        selectedCountry: this.selectedCountry,
        selectedSector: this.selectedSector,
      });
    },
  },
};
</script>