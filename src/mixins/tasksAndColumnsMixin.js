import {mapActions} from 'vuex'

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
    ...mapActions(['moveColumn', 'moveTask']),
    moveTaskOrColumn(transferData) {
      if (transferData.type === "task") {
        this._moveTask(transferData);
      } else {
        this._moveColumn(transferData);
      }
    },
    _moveTask({ fromColumnIndex, fromTaskIndex }) {
      this.moveTask({
        fromTaskIndex,
        fromColumnIndex,
        toColumnId: this.column._id,
        toTaskIndex: this.taskIndex
      });
    },
    _moveColumn({ fromColumnIndex }) {
      this.moveColumn({ fromColumnIndex, toColumnIndex: this.columnIndex });
    }
  }
};
