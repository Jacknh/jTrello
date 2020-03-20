<template>
  <div class="board">
    <div class="tw-flex tw-flex-row tw-items-start">
      <BoardColumn
        v-for="(column, columnIndex) of board.columns"
        :key="columnIndex"
        :column="column"
        :columnIndex="columnIndex"
      />
      <div class="column tw-flex">
        <input
          type="text"
          class="tw-p-2 tw-mr-2 tw-flex-grow"
          placeholder="New Column Name"
          v-model="newColumnName"
          @keyup.enter="createColumn"
        />
      </div>
    </div>

    <div class="task-bg" v-if="isTaskOpen" @click.self="close">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BoardColumn from "../components/BoardColumn";
export default {
  components: { BoardColumn },
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name === "task";
    }
  },
  data() {
    return {
      newColumnName: ""
    };
  },
  methods: {
    close() {
      this.$router.push({ name: "board" });
    },
    createColumn() {
      this.$store.commit("CREATE_COLUMN", { name: this.newColumnName });
      this.newColumnName = "";
    }
  }
};
</script>

<style lang="postcss" scoped>
.board {
  @apply tw-p-4 tw-bg-teal-dark tw-h-full tw-overflow-auto;
}
.column {
  @apply tw-bg-grey-light tw-p-2 tw-mr-4 tw-text-left tw-shadow tw-rounded;
}
.task-bg {
  @apply tw-pin tw-absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
