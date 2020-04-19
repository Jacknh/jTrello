import Vue from "vue";
import Vuex from "vuex";
import axios from "../utils/axios";

Vue.use(Vuex);

const token = localStorage.getItem("token");

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default new Vuex.Store({
  state: {
    isAuthenticated: !!token,
    userName: "",
    board: {},
  },
  getters: {
    getTask(state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task._id === id) {
              return task;
            }
          }
        }
      };
    },
    getColumn(state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task._id === id) {
              return column;
            }
          }
        }
      };
    },
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        description: "",
      });
    },
    ADD_COLUMN(state, name) {
      state.board.columns.push({
        name,
        tasks: [],
      });
    },
    REMOVE_COLUMN(state, { name }) {
      const idx = state.board.columns.findIndex(
        (column) => column.name === name
      );
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
    },

    SET_BOARD(state, board) {
      state.board = board;
    },
    SET_USERNAME(state, name) {
      state.userName = name;
    },
  },
  actions: {
    register({ commit }, payload) {
      return axios.post("/auth/register", { ...payload }).then(({ data }) => {
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        commit("SET_USERNAME", data.name);
      });
    },
    login({ commit }, payload) {
      return axios.post("/auth/login", { ...payload }).then(({ data }) => {
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        commit("SET_USERNAME", data.name);
      });
    },
    fetchBoard({ commit }) {
      return axios.get("/board").then(({ data }) => {
        commit("SET_BOARD", data.board);
      });
    },
    addColumn({ commit }, payload) {
      return axios.post("/board/column", { ...payload }).then(({ data }) => {
        commit("SET_BOARD", data.board);
      });
    },
    deleteColumn({ commit, state }, { name }) {
      const columnToDelete = state.board.columns.find(
        (column) => column.name === name
      );

      return axios
        .delete(`/board/column/${columnToDelete._id}`)
        .then(({ data }) => {
          commit("SET_BOARD", data.board);
        });
    },
    addTask({ commit }, { id, name }) {
      return axios
        .post(`/board/column/${id}/task`, { name })
        .then(({ data }) => {
          commit("SET_BOARD", data.board);
        });
    },
    updateTask({ commit }, { columnId, taskId, name, description }) {
      return axios
        .put(`/board/column/${columnId}/task/${taskId}`, { name, description })
        .then(({ data }) => {
          commit("SET_BOARD", data.board);
        });
    },
    deleteTasks({ commit }, id) {
      return axios.delete(`/board/column/${id}/task`).then(({ data }) => {
        commit("SET_BOARD", data.board);
      });
    },
  },
});
