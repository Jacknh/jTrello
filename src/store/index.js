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
    SET_BOARD(state, board) {
      state.board = board;
    },
    SET_USERNAME(state, name) {
      state.userName = name;
    },
    SET_AUTH(state, payload) {
      state.isAuthenticated = payload;
    },
    RESET_STATE(state) {
      state.isAuthenticated = false;
      state.userName = '';
      state.board = {}
    }
  },
  actions: {
    register({ commit }, payload) {
      return axios.post("/auth/register", { ...payload }).then(({ data }) => {
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        commit("SET_USERNAME", data.name);
        commit("SET_AUTH", true);
      });
    },
    login({ commit }, payload) {
      return axios.post("/auth/login", { ...payload }).then(({ data }) => {
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        commit("SET_USERNAME", data.name);
        commit("SET_AUTH", true);
      });
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      axios.defaults.headers.common["Authorization"] = null;
      commit("RESET_STATE");
    },
    getMe({ commit }) {
      return axios.get("/auth/getMe").then(({ data }) => {
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
    moveColumn({ commit }, payload) {
      return axios.put("/board/column", { ...payload }).then(({ data }) => {
        commit("SET_BOARD", data.board);
      });
    },
    moveTask({ commit }, payload) {
      return axios
        .put(`/board/column/task`, { ...payload })
        .then(({ data }) => {
          commit("SET_BOARD", data.board);
        });
    },
  },
});
