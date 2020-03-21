<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }"
    >
      <v-card color="#dae1e7">
        <v-card-title class="column__name d-flex justify-space-between"
          >{{ column.name }}
          <v-btn
            fab
            dark
            width="20px"
            height="20px"
            color="indigo lighten-2"
            @click="dialog = true"
          >
            <v-icon style="height:20px" dark>mdi-minus</v-icon>
          </v-btn>
        </v-card-title>
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
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Warning</v-card-title>

          <v-card-text>
            Are you sure to delete the column ?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="indigo darken-1" text @click="dialog = false">
              Cancel
            </v-btn>

            <v-btn color="indigo darken-1" text @click="removeColumn">
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      newTask: "",
      dialog: false
    };
  },
  methods: {
    createTask(e, tasks) {
      this.$store.commit("CREATE_TASK", { tasks, name: e.target.value });
      this.newTask = "";
    },
    removeColumn() {
      this.$store.commit("REMOVE_COLUMN", { columnIndex: this.columnIndex });
      this.dialog = false;
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
