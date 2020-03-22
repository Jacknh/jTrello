<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      :transferData="{
        type: 'task',
        fromTaskIndex: taskIndex,
        fromColumnIndex: columnIndex
      }"
    >
      <div
        class="font-weight-bold subtitle-1 d-flex justify-space-between"
        @click.self="goToTask(task)"
      >
        <div>{{ task.name }}</div>
      </div>
    </AppDrag>
  </AppDrop>
</template>
<script>
import tasksAndColumnsMixin from "@/mixins/tasksAndColumnsMixin.js";
import AppDrag from "./AppDrag";
import AppDrop from "./AppDrop";

export default {
  components: { AppDrag, AppDrop },
  mixins: [tasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: "task", params: { id: task.id } });
    }
  }
};
</script>
<style lang="scss" scoped></style>
