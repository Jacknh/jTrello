<template>
  <AppDrop
    @drop="moveTaskOrColumn"
    class="column"
  >
   <AppDrag
    :transferData="{
      type: 'column',
      fromColumnIndex: columnIndex
    }"
    >
    <div class="tw-flex tw-items-center tw-mb-2 tw-font-bold">{{ column.name }}</div>
    <div class="tw-list-reset">
      <ColumnTask
        v-for="(task, taskIndex) of column.tasks"
        :key="taskIndex"
        :task='task'
        :taskIndex='taskIndex'
        :column='column'
        :columnIndex='columnIndex'
        />
      <input
        type="text"
        class="tw-block tw-p-2 tw-w-full tw-bg-transparent"
        placeholder="+ Enter new task"
        @keyup.enter="createTask($event, column.tasks)"
      />
    </div>
   </AppDrag>
  </AppDrop>
</template>
<script>
import ColumnTask from './ColumnTask'
import tasksAndColumnsMixin from '@/mixins/tasksAndColumnsMixin.js'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'

export default {
  components: { ColumnTask, AppDrop, AppDrag },
  mixins: [tasksAndColumnsMixin],
  methods: {
    createTask (e, tasks) {
      this.$store.commit('CREATE_TASK', { tasks, name: e.target.value })
      e.target.value = ''
    }
  }
}
</script>
<style lang="postcss" scoped>
.column {
  @apply tw-bg-grey-light tw-p-2 tw-mr-4 tw-text-left tw-shadow tw-rounded tw-flex-1;
}

</style>
