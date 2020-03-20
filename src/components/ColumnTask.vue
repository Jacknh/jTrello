<template>
  <AppDrop
    @drop="moveTaskOrColumn"
  >
  <AppDrag
    class="task"
    :transferData="{
      type: 'task',
      fromTaskIndex: taskIndex,
      fromColumnIndex: columnIndex
    }"
    @click="goToTask(task)"
  >
    <span class="tw-w-full tw-flex-no-shrink tw-font-bold">
      {{ task.name }}
    </span>
    <p
      class="tw-w-full tw-flex-no-shrink tw-mt-1 tw-text-sm"
      v-if="task.description"
    >
      {{ task.description }}
    </p>
  </AppDrag>
  </AppDrop>
</template>
<script>
import tasksAndColumnsMixin from '@/mixins/tasksAndColumnsMixin.js'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'

export default {
  components: { AppDrag, AppDrop },
  mixins: [tasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }

  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    }
  }
}
</script>
<style lang='postcss' scoped>
.task {
  @apply tw-flex tw-items-center tw-flex-wrap tw-shadow tw-mb-2 tw-py-2 tw-px-2 tw-rounded tw-bg-white tw-text-grey-darkest tw-no-underline;
}
</style>
