<template>
  <v-app>
    <AppNav />
    <router-view />
  </v-app>
</template>

<script>
import AppNav from "./components/AppNav";
export default {
  components: { AppNav }
};
</script>

<style lang="scss"></style>
