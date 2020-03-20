<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="task"
      :transferData="{
        type: 'task',
        fromTaskIndex: taskIndex,
        fromColumnIndex: columnIndex
      }"
      @click="goToTask(task)"
    >
      <div class="font-weight-bold subtitle-1">
        {{ task.name }}
      </div>
      <div class="body-2" v-if="task.description">
        {{ task.description }}
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
