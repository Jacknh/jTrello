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
      small
      color="red lighten-1"
      style="bottom: 70px"
      @click="openDialog('remove')"
    >
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <v-btn
      absolute
      dark
      fab
      bottom
      right
      small
      color="green lighten-1"
      style="bottom: 20px"
      @click="openDialog('create')"
    >
      <v-icon>mdi-plus</v-icon>
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
      columnLabel: ["Type in column name to remove", "New column name"],
      columnName: "",
      dialog: false,
      type: 0
    };
  },
  methods: {
    closeDialog() {
      if (this.columnName === "") return;
      if (this.type === 0) {
        this.$store.commit("REMOVE_COLUMN", { name: this.columnName });
      } else {
        this.$store.commit("CREATE_COLUMN", { name: this.columnName });
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
