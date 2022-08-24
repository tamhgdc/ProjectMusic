<template>
  <div class="ToastMessage">
    <v-snackbar
      v-model="showError"
      :timeout="timeout"
      absolute
      right
      top
      color="red lighten-1" 
      elevation="24"
    >
      <b> {{ message }} </b>
    </v-snackbar>

    <v-snackbar
      v-model="showSuccess"
      :timeout="timeout"
      absolute
      right
      top
      color="success lighten-1"
      elevation="24"
    >
      {{ message }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props:['timeout'],
  name: "ToastMessage",
  data() {
    return {
      message: "",
      showError: false,
      showSuccess: false,
    };
  },
  methods: {
    open(message, isError) {
      if (isError) {
        this.showError = true;
      } else {
        this.showSuccess = true;
      }
      this.message = message;
    },
  },
};
</script>

<style scoped>
.ToastMessage{
  position: absolute;
  top: 50%;
  left: 60%;
}
</style>
