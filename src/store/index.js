import Vue from "vue";
import Vuex from "vuex";
import defaultBoard from "../default-board";
import { saveStatePlugin, uuid } from "../utils";

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem("board")) || defaultBoard;

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask(state) {
      return id => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task;
            }
          }
        }
      };
    }
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ""
      });
    },
    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({
        name,
        tasks: []
      });
    },
    REMOVE_COLUMN(state, { name }) {
      const idx = state.board.columns.findIndex(column => column.name === name);
      state.board.columns.splice(idx, 1);
    },
    CLEAR_COLUMN(state, { columnIndex }) {
      state.board.columns[columnIndex].tasks = [];
    },
    UPDATE_TASK(state, { task, name, description }) {
      task.name = name;
      task.description = description;
    },
    MOVE_TASK(state, { fromColumnIndex, toTasks, fromTaskIndex, toTaskIndex }) {
      const fromTasks = state.board.columns[fromColumnIndex].tasks;
      const task = fromTasks.splice(fromTaskIndex, 1)[0];
      toTasks.splice(toTaskIndex, 0, task);
    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const columns = state.board.columns;
      const cloumnToMove = columns.splice(fromColumnIndex, 1)[0];
      columns.splice(toColumnIndex, 0, cloumnToMove);
    }
  }
});
