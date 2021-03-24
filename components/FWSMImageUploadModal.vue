<template>
  <div class="modal" :class="isActive && 'is-active'">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <h3 class="modal-card-title">Upload image</h3>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <form method="post" @submit.prevent="uploadImage">
        <section class="modal-card-body">
          <div v-if="error" class="notification is-danger">{{ error }}</div>
          <p>
            The image size may be up to 5 MB and should be of format .jpeg, .jpg
            or .png.
          </p>
          <div class="file has-name mt-5">
            <input type="text" name="hp" style="display: none" />
            <label class="file-label">
              <input
                class="file-input"
                type="file"
                name="image"
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
                {{ fileName }}
              </span>
            </label>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button id="submit-button" class="button is-success">
            Upload image
          </button>
          <button type="button" class="button" @click="closeModal">
            Cancel
          </button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "FWSMImageUploadModal",
  data() {
    return {
      command: null,
      isActive: false,
      fileName: "Upload an image",
      image: null,
      error: null
    };
  },
  methods: {
    handleFileChange(e) {
      this.resetFields();
      const file = e.target.files[0];
      if (file.size >= 5000000) {
        this.error = "The uploaded image is too large (max. 5MB)";
        return;
      }
      this.fileName = file.name;
      this.image = file;
    },
    resetFields() {
      this.image = null;
      this.fileName = "Upload an image";
      this.error = null;
    },
    async uploadImage() {
      if (!this.image) {
        return;
      }
      let formData = new FormData();
      formData.append("image", this.image);
      try {
        const response = await this.$axios.$post(
          "/api/organizations/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: this.$auth.strategy.token.get()
            }
          }
        );
        const data = {
          command: this.command,
          data: {
            src: response.src
          }
        };
        this.$emit("imageUploaded", data);
        this.closeModal();
      } catch (e) {
        this.error = "Something went wrong. Please try again.";
      }
    },
    closeModal() {
      this.resetFields();
      this.isActive = false;
    },
    openModal(command) {
      this.command = command;
      this.isActive = true;
    }
  }
};
</script>
