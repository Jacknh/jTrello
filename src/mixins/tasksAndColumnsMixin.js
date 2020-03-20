export default {
  props: {
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    moveTaskOrColumn(transferData) {
      if (transferData.type === "task") {
        this.moveTask(transferData);
      } else {
        this.moveColumn(transferData);
      }
    },
    moveTask({ fromColumnIndex, fromTaskIndex }) {
      this.$store.commit("MOVE_TASK", {
        fromTaskIndex,
        fromColumnIndex,
        toTasks: this.column.tasks,
        toTaskIndex: this.taskIndex
      });
    },
    moveColumn({ fromColumnIndex }) {
      this.$store.commit("MOVE_COLUMN", {
        fromColumnIndex,
        toColumnIndex: this.columnIndex
      });
    }
  }
};
