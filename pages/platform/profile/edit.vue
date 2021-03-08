<template>
  <div>
    <section class="section">
      <div class="container">
        <a
          class="fwsm-search-app__back-link"
          :href="
            localePath(
              loggedInUser && '/platform/profile/' + loggedInUser.organizationId
            )
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
              <h2 class="title is-4">Profile picture</h2>
              <div class="mb-4">
                <figure class="image is-128x128 fwsm-search-app__company-image">
                  <img v-if="profilePicture" :src="profilePicture" />
                  <span v-else>No profile picture set</span>
                </figure>

                <div class="file has-name mt-5">
                  <label class="file-label">
                    <input
                      class="file-input"
                      type="file"
                      name="avatar"
                      @change="handleFileChange"
                    />
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">
                        Choose a file…
                      </span>
                    </span>
                    <span class="file-name">
                      {{ profilePictureName }}
                    </span>
                  </label>
                </div>
              </div>

              <h2 class="title is-4">Edit profile text</h2>
              <p>
                You can add images by dragging and dropping an image from your
                file browser.
              </p>
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
                            'is-active': isActive.heading({ level: 1 })
                          }"
                          @click="commands.heading({ level: 1 })"
                        >
                          H1
                        </button>
                        <button
                          class="button"
                          type="button"
                          :class="{
                            'is-active': isActive.heading({ level: 2 })
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
.editor__body {
  min-height: 300px;
}

.fwsm-search-app__back-link {
  display: block;
  margin-bottom: 1.5rem;
}

.fwsm-search-app__company-image {
  overflow: hidden;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
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
  History
} from "tiptap-extensions";
import { mapGetters } from "vuex";
import ImageDrop from "~/plugins/image";

export default {
  middleware: "auth",
  components: {
    EditorContent,
    EditorMenuBar
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
      profilePicture: this.$auth.user.profilePicture,
      uploadedProfilePicture: null,
      profilePictureName: "Upload a profile picture"
    };
  },
  async asyncData(context) {
    const sectors = await context.$axios
      .get("/api/sectors/all")
      .then(res => res.data);
    return {
      ...sectors,
      countryList
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new ImageDrop(null, null, this.upload),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History()
      ],
      content: this.editor,
      onUpdate: ({ getHTML }) => {
        this.editorContent = getHTML();
      }
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    async upload(file) {
      let formData = new FormData();
      formData.append("image", file);
      const headers = { "Content-Type": "multipart/form-data" };
      const response = await this.$axios.$post(
        "/api/organizations/image",
        formData,
        {
          headers: {
            Authorization: this.$auth.strategy.token.get()
          }
        }
      );
      return response.src;
    },
    handleFileChange(e) {
      this.uploadedProfilePicture = e.target.files[0];
      this.profilePictureName = e.target.files[0].name;
    },
    async makeChanges() {
      const rawFormData = {
        text: this.editorContent,
        subsectorId: this.selectedFwsmSector,
        address: this.address,
        postcode: this.postcode,
        city: this.city,
        country: this.country,
        avatar: this.uploadedProfilePicture ? this.uploadedProfilePicture : null
      };

      const formData = new FormData();

      Object.keys(rawFormData).forEach(key =>
        formData.append(key, rawFormData[key])
      );

      await this.$axios
        .$post("/api/organizations/edit", formData, {
          headers: {
            Authorization: this.$auth.strategy.token.get()
          }
        })
        .then(res => {
          window.scrollTo(0, 0);
          this.success = true;
        })
        .catch(err => {
          this.error = err.response.data.error;
        });
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
    selectedSector: function() {
      if (
        this.$auth.user.subsectorId !== "" ||
        this.$auth.user.subsectorId !== null
      ) {
        return this.sectors.find(
          sector => sector.subsectorId === this.$auth.user.subsectorId
        );
      }
    }
  }
};
</script>
