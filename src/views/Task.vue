<template>
  <div class="task-view">
    <div
      class="tw-flex tw-flex-col tw-flex-grow tw-items-start tw-justify-between tw-px-4"
    >
      <input
        type="text"
        class="tw-p-2 tw-w-full tw-mr-2 tw-block tw-text-xl tw-font-bold"
        :value="task.name"
        @change="updateTaskProperty($event, 'name')"
        @keyup.enter="updateTaskProperty($event, 'name')"
      />
      <textarea
        class="tw-relative tw-w-full tw-bg-transparent tw-px-2 tw-border tw-mt-2 tw-h-64 tw-border-none tw-leading-normal"
        :value="task.description"
        @change="updateTaskProperty($event, 'description')"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getTask"]),
    task() {
      return this.getTask(this.$route.params.id);
    }
  },
  methods: {
    updateTaskProperty(e, key) {
      this.$store.commit("UPDATE_TASK", {
        task: this.task,
        key,
        value: e.target.value
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
.task-view {
  @apply tw-relative tw-flex tw-flex-row tw-bg-white tw-pin tw-mx-4 tw-m-32 tw-mx-auto tw-py-4 tw-text-left tw-rounded tw-shadow;
  max-width: 700px;
}
</style>
