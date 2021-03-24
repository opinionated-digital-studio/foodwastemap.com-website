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
      </div>
      <FWSMImageUploadModal
        ref="imageUploadModal"
        @imageUploaded="addCommand"
      />
      <div class="container">
        <div class="columns">
          <div class="column is-two-thirds">
            <title class="is-1">Edit profile</title>
            <div v-if="success" class="notification is-success">
              {{ success }}
            </div>
            <div v-if="error" class="notification is-danger">{{ error }}</div>

            <form method="post" @submit.prevent="saveChanges">
              <h2 class="title is-4">Profile picture</h2>
              <div class="box">
                <figure class="image is-128x128 fwsm-search-app__company-image">
                  <img v-if="profilePicture" :src="profilePicture" />
                  <span v-else>No profile picture set</span>
                </figure>
                <div class="file has-name">
                  <label class="file-label">
                    <input
                      class="file-input"
                      type="file"
                      name="avatar"
                      @change="handleProfilePictureChange"
                    />
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">
                        Choose a file…
                      </span>
                    </span>
                    <span class="file-name">{{ profilePictureFileName }}</span>
                  </label>
                </div>
              </div>

              <h2 class="title is-4">Profile text</h2>
              <div class="box">
                <no-ssr>
                  <div class="editor__bar">
                    <editor-menu-bar
                      :editor="editor"
                      v-slot="{ commands, isActive }"
                    >
                      <div class="is-flex-direction-row">
                        <button
                          class="button"
                          :class="{ 'is-active': isActive.bold() }"
                          @click="commands.bold"
                        >
                          <i class="fas fa-bold"></i>
                        </button>
                        <button
                          class="button"
                          :class="{ 'is-active': isActive.bold() }"
                          @click="commands.italic"
                        >
                          <i class="fas fa-italic"></i>
                        </button>

                        <button
                          class="button"
                          :class="{
                            'is-active': isActive.heading({ level: 2 })
                          }"
                          @click="commands.heading({ level: 2 })"
                        >
                          H1
                        </button>

                        <button
                          class="button"
                          :class="{
                            'is-active': isActive.heading({ level: 3 })
                          }"
                          @click="commands.heading({ level: 3 })"
                        >
                          H2
                        </button>

                        <button
                          class="button"
                          :class="{
                            'is-active': isActive.heading({ level: 4 })
                          }"
                          @click="commands.heading({ level: 4 })"
                        >
                          H3
                        </button>
                        <button
                          type="button"
                          class="button"
                          :class="{ 'is-active': isActive.bullet_list() }"
                          @click="commands.bullet_list"
                        >
                          <i class="fas fa-list-ul"></i>
                        </button>
                        <button
                          type="button"
                          class="button"
                          @click="openImageUploadModal(commands.image)"
                        >
                          <i class="fas fa-image"></i>
                        </button>
                      </div>
                    </editor-menu-bar>
                  </div>
                  <div class="editor__body content">
                    <editor-content :editor="editor" />
                  </div>
                </no-ssr>
              </div>

              <h2 class="title is-4" id="sector-label">Sector</h2>
              <div class="box">
                <div class="select">
                  <select v-model="subsectorId" aria-labelledby="sector-label">
                    {{
                      sectors
                    }}
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

              <h2 class="title is-4">Address</h2>
              <div class="box">
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
import { countryList } from "kbrinl-open-data";
import FWSMImageUploadModal from "~/components/FWSMImageUploadModal";
import { mapGetters } from "vuex";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Bold,
  Italic,
  BulletList,
  ListItem,
  Underline,
  Image,
  Heading
} from "tiptap-extensions";

export default {
  components: {
    FWSMImageUploadModal,
    EditorContent,
    EditorMenuBar
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

  data() {
    return {
      error: null,
      success: null,
      editor: null,
      text: this.$auth.user.text,
      profilePicture: this.$auth.user.profilePicture,
      profilePictureFileName: "Upload a profile picture",
      uploadedProfilePicture: this.$auth.user.profilePicture || null,
      subsectorId: this.$auth.user.subsectorId || null,
      address: this.$auth.user.address.address,
      postcode: this.$auth.user.address.postcode,
      city: this.$auth.user.address.city,
      country: this.$auth.user.address.country
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Bold(),
        new Italic(),
        new Image(),
        new BulletList(),
        new ListItem(),
        new Heading({ levels: [2, 3, 4] })
      ],
      content: this.text,
      onUpdate: ({ getHTML }) => {
        this.text = getHTML();
      }
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    openImageUploadModal(command) {
      this.$refs.imageUploadModal.openModal(command);
    },
    handleProfilePictureChange(e) {
      this.uploadedProfilePicture = e.target.files[0];
      this.profilePictureFileName = e.target.files[0].name;
    },
    addCommand(data) {
      if (data.command !== null) {
        data.command(data.data);
      }
    },
    async saveChanges() {
      this.success = null;
      this.error = null;
      if (!this.subsectorId) {
        this.showErrorMessage("You must select a sector");
        return;
      }

      const rawFormData = {
        text: this.text,
        subsectorId: this.subsectorId,
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

      try {
        await this.$axios.$post("/api/organizations/edit", formData, {
          headers: {
            Authorization: this.$auth.strategy.token.get()
          }
        });
        this.showSuccessMessage(
          "Your profile changes have been successfully saved."
        );
      } catch (e) {
        console.log(e);
        this.showErrorMessage("Something went wrong. Please try again.");
      }
    },
    showErrorMessage(error) {
      this.error = error;
      window.scrollTo(0, 0);
    },
    showSuccessMessage(message) {
      this.success = message;
      window.scrollTo(0, 0);
    }
  },
  middleware: "auth",
  computed: {
    ...mapGetters(["loggedInUser"])
  }
};
</script>
