<template>
  <v-container fluid class="wrapper">
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
      x-small
      color="red lighten-1"
      style="bottom: 60px"
      @click="openDialog('remove')"
    >
      <i class="fas fa-minus"></i>
    </v-btn>
    <v-btn
      absolute
      dark
      fab
      bottom
      right
      x-small
      color="green lighten-1"
      style="bottom: 20px"
      @click="openDialog('create')"
    >
      <i class="fas fa-plus"></i>
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px" @click:outside="closeDialog">
      <v-card style="padding-top: 40px">
        <v-card-text>
          <v-text-field
            :label="columnLabel[type]"
            outlined
            v-model="columnName"
            @keydown.enter="closeDialog"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
    <router-view v-if="isTaskOpen" />
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BoardColumn from "../components/BoardColumn";
export default {
  components: { BoardColumn },
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name === "task";
    },
  },
  created() {
    this.fetchBoard();
  },
  data() {
    return {
      columnLabel: ["Type in column name to remove", "New column name"],
      columnName: "",
      dialog: false,
      type: 0,
    };
  },
  methods: {
    ...mapActions(["fetchBoard", "addColumn", "deleteColumn"]),
    closeDialog() {
      if (this.columnName.trim() === "") return;
      if (this.type === 0) {
        this.deleteColumn({ name: this.columnName });
      } else {
        this.addColumn({ name: this.columnName });
      }
      this.columnName = "";
      this.dialog = false;
    },
    openDialog(type) {
      if (type === "remove") {
        this.type = 0;
      } else {
        this.type = 1;
      }
      this.columnName = "";
      this.dialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #38a89d);
}
</style>
