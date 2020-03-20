<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="(column, columnIndex) of board.columns" :key="columnIndex">
        <BoardColumn :column="column" :columnIndex="columnIndex" />
      </v-col>
    </v-row>
    <v-btn
      absolute
      dark
      fab
      bottom
      right
      color="cyan accent-2"
      style="bottom: 20px"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <router-view v-if="isTaskOpen" />
  </v-container>
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
    createColumn() {
      this.$store.commit("CREATE_COLUMN", { name: this.newColumnName });
      this.newColumnName = "";
    }
  }
};
</script>

<style lang="scss" scoped></style>
