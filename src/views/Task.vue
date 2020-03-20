<template>
  <div class="task-bg" @click.self="close">
    <v-container class="task-view">
      <v-text-field outlined label="Name" v-model="name"></v-text-field>
      <v-textarea
        outlined
        label="Description"
        v-model="description"
      ></v-textarea>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  created() {
    this.name = this.task.name;
    this.description = this.task.description;
  },
  data() {
    return {
      name: "",
      description: ""
    };
  },
  computed: {
    ...mapGetters(["getTask"]),
    task() {
      return this.getTask(this.$route.params.id);
    }
  },
  methods: {
    close() {
      this.$store.commit("UPDATE_TASK", {
        task: this.task,
        name: this.name,
        description: this.description
      });
      this.$router.push({ name: "board" });
    }
  }
};
</script>

<style lang="scss" scoped>
.task-bg {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.task-view {
  background: #fff;
  max-width: 700px;
  margin: 120px auto;
  border-radius: 4px;
  padding: 20px;
}
</style>
