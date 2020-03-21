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
      @click="openDialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px" @click:outside="closeDialog">
      <v-card style="padding-top: 40px">
        <v-card-text>
          <v-text-field
            label="New Column Name"
            outlined
            v-model="newColumnName"
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
      newColumnName: "",
      dialog: false
    };
  },
  methods: {
    closeDialog() {
      if (this.newColumnName === "") return;
      this.$store.commit("CREATE_COLUMN", { name: this.newColumnName });
      this.newColumnName = "";
      this.dialog = false;
    },
    openDialog() {
      this.newColumnName = "";
      this.dialog = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
