<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }"
    >
      <v-card color="#dae1e7">
        <v-card-title class="column__name">{{ column.name }}</v-card-title>
        <v-card-text
          v-for="(task, taskIndex) of column.tasks"
          :key="taskIndex"
          class="column__item"
          :style="{ paddingTop: taskIndex === 0 ? '10px' : '' }"
        >
          <ColumnTask
            :task="task"
            :taskIndex="taskIndex"
            :column="column"
            :columnIndex="columnIndex"
          />
        </v-card-text>
        <v-card-actions class="column__action">
          <v-text-field
            v-model="newTask"
            placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)"
          />
        </v-card-actions>
      </v-card>
    </AppDrag>
  </AppDrop>
</template>
<script>
import ColumnTask from "./ColumnTask";
import tasksAndColumnsMixin from "@/mixins/tasksAndColumnsMixin.js";
import AppDrag from "./AppDrag";
import AppDrop from "./AppDrop";

export default {
  components: { ColumnTask, AppDrop, AppDrag },
  mixins: [tasksAndColumnsMixin],
  data() {
    return {
      newTask: ""
    };
  },
  methods: {
    createTask(e, tasks) {
      this.$store.commit("CREATE_TASK", { tasks, name: e.target.value });
      this.newTask = "";
    }
  }
};
</script>
<style lang="scss" scoped>
.column__name {
  padding: 8px 16px 0px;
}
.column__item {
  background: #fff;
  border-radius: 5px;
  width: 95%;
  margin: 10px auto;
  text-align: left;
  padding: 10px;
  color: #222;
}
.column__action {
  padding: 0px 8px;
}
</style>
