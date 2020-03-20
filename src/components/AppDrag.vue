<template>
  <div draggable @dragstart.self="onDrag" @click="onClick">
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    transferData: {
      type: Object,
      required: true
    }
  },
  methods: {
    onDrag(e) {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.setData("payload", JSON.stringify(this.transferData));
    },
    onClick() {
      this.$emit("click");
    }
  }
};
</script>
