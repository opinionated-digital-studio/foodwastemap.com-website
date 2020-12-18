<template>
  <div>
    <section class="section">
      <div class="container">
        <a
          class="fwsm-search-app__back-link"
          :href="profile && '/platform/profile/' + profile.id"
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
                        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                        @click="commands.heading({ level: 1 })"
                      >
                        H1
                      </button>
                      <button
                        class="button"
                        type="button"
                        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
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

              <div>
                <h2 class="title is-4 mt-4">Edit sector</h2>
                <div class="select mb-5">
                  <select v-model="selectedFwsmSector">
                    <option
                      v-for="fwsmSector in fwsmSectorsList"
                      :key="fwsmSector.id"
                      :value="fwsmSector.id"
                      >{{ fwsmSector.name }}</option
                    >
                  </select>
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

export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  async asyncData(context) {
    const fwsmSectorsList = await context.$axios
      .$get("/fwsm-sectors")
      .then(res => res);
    return {
      fwsmSectorsList
    };
  },
  data() {
    return {
      editor: null,
      editorContent: null,
      success: null,
      error: null,
      selectedFwsmSector: null
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
    makeChanges: async function() {
      await this.$axios
        .$patch(`api/orgs/${this.loggedInUser.id}`, {
          bio: this.editorContent,
          fwsmSectorId: this.selectedFwsmSector
        })
        .then(res => {
          this.success = true;
        })
        .catch(err => {
          this.error = err.response.data.error;
        });
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
    profile: function() {
      if (this.loggedInUser) {
        this.editor = this.loggedInUser.bio;
        this.editorContent = this.loggedInUser.bio;
        return this.loggedInUser;
      }
    },
    currentFwsmSector: function() {
      if (
        this.fwsmSectorsList &&
        this.loggedInUser &&
        this.loggedInUser.fwsmSectorId
      ) {
        const found = this.fwsmSectorsList.find(
          fwsmSector => fwsmSector.id === this.loggedInUser.fwsmSectorId
        );
        this.selectedFwsmSector = found.id;
        return found;
      }
    }
  }
};
</script>
