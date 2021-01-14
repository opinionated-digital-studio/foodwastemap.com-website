<template>
  <div>
    <section class="section">
      <div class="container">
        <a
          class="fwsm-search-app__back-link"
          :href="
            loggedInUser && '/platform/profile/' + loggedInUser.organizationId
          "
          >&#8592; Back to profile</a
        >
        <div class="columns">
          <div class="column is-two-thirds">
            <h1 class="title is-1">Edit profile</h1>

            <div v-if="success" class="notification is-success">
              Your profile changes have been saved successfully.
            </div>
            <div v-if="error" class="notification is-danger">{{ error }}</div>
            <form method="post" @submit.prevent="makeChanges">
              <h2 class="title is-4">Edit profile text</h2>
              <div class="mb-4">
                <div class="editor box">
                  <no-ssr>
                    <editor-menu-bar
                      :editor="editor"
                      v-slot="{ commands, isActive }"
                    >
                      <div class="is-flex-direction-row editor__bar">
                        <button
                          class="button"
                          :class="{ 'is-active': isActive.bold() }"
                          @click="commands.bold"
                        >
                          <i class="fas fa-bold"></i>
                        </button>
                        <button
                          class="button"
                          type="button"
                          :class="{
                            'is-active': isActive.heading({ level: 1 }),
                          }"
                          @click="commands.heading({ level: 1 })"
                        >
                          H1
                        </button>
                        <button
                          class="button"
                          type="button"
                          :class="{
                            'is-active': isActive.heading({ level: 2 }),
                          }"
                          @click="commands.heading({ level: 2 })"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          class="button"
                          :class="{ 'is-active': isActive.ordered_list() }"
                          @click="commands.ordered_list"
                        >
                          <i class="fas fa-list-ol"></i>
                        </button>
                      </div>
                    </editor-menu-bar>
                    <div class="editor__body">
                      <editor-content :editor="editor" />
                    </div>
                  </no-ssr>
                </div>
              </div>

              <div class="mb-4">
                <h2 class="title is-4 mt-4">Edit sector</h2>
                <div class="select mb-5">
                  <select v-model="selectedFwsmSector">
                    <option
                      v-for="fwsmSector in sectors"
                      :key="fwsmSector.subsectorId"
                      :value="fwsmSector.subsectorId"
                    >
                      {{ fwsmSector.subsector }}
                    </option>
                  </select>
                </div>
              </div>

              <h2 class="title is-4">Edit address</h2>

              <div class="columns">
                <div class="column is-half">
                  <div class="field">
                    <label class="label" for="street">Address</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        name="street"
                        id="street"
                        v-model="address"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="columns">
                <div class="column is-half">
                  <div class="field">
                    <label class="label" for="postcode">Postcode</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        id="postcode"
                        name="postcode"
                        v-model="postcode"
                      />
                    </div>
                  </div>
                </div>

                <div class="column is-half">
                  <div class="field">
                    <label class="label" for="city">City</label>
                    <div class="control">
                      <input
                        class="input"
                        id="city"
                        type="text"
                        v-model="city"
                        name="city"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="columns">
                <div class="column is-half">
                  <div class="field">
                    <label class="label">Country</label>
                    <div class="control">
                      <div class="select is-fullwidth">
                        <select v-model="country">
                          <option
                          v-for="country in countryList"
                          :key="country.alpha_2_code"
                          :value="country.alpha_2_code"
                          >{{ country.en_short_name }}</option
                        >
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" class="button is-primary is-medium">
                Save changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.fwsm-search-app__back-link {
  display: block;
  margin-bottom: 1.5rem;
}

.editor {
  margin-bottom: 4rem;
  &__bar {
    margin-bottom: 1rem;
  }
  &__body {
    padding: 1rem;
    border: 1px solid $grey-light;
  }
}
</style>

<script>
import { countryList } from "kbrinl-lists";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from "tiptap-extensions";
import { mapGetters } from "vuex";

export default {
  middleware: "auth",
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data() {
    return {
      editor: this.$auth.user.text,
      editorContent: null,
      success: null,
      error: null,
      selectedFwsmSector: this.$auth.user.subsectorId || null,
      address: this.$auth.user.address.address,
      postcode: this.$auth.user.address.postcode,
      city: this.$auth.user.address.city,
      country: this.$auth.user.address.country,
    };
  },
  async asyncData(context) {
    const sectors = await context.$axios
      .get("/api/sectors/all")
      .then((res) => res.data);
    return {
      ...sectors,
      countryList
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History(),
      ],
      content: this.editor,
      onUpdate: ({ getHTML }) => {
        this.editorContent = getHTML();
      },
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    async makeChanges() {
      await this.$axios
        .$post("/api/organizations/edit", {
          text: this.editorContent,
          subsectorId: this.selectedFwsmSector,
          address: this.address,
          postcode: this.postcode,
          city: this.city,
          country: this.country
        })
        .then((res) => {
          window.scrollTo(0,0);
          this.success = true;
        })
        .catch(
          (err) => {
            this.error = err.response.data.error;
          },
          {
            Authorization: this.$auth.strategy.token.get(),
          }
        );
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
    selectedSector: function () {
      if (
        this.$auth.user.subsectorId !== "" ||
        this.$auth.user.subsectorId !== null
      ) {
        return this.sectors.find(
          (sector) => sector.subsectorId === this.$auth.user.subsectorId
        );
      }
    },
  },
};
</script>
