<template>
  <v-app>
    <AppNav />
    <notifications
      group="auth"
      position="top center"
      width="220px"
      :style="{ top: '62px' }"
    >
      <template slot="body" slot-scope="props">
        <div class="notification__text__wrapper">
          <div><i class="fas fa-exclamation-circle"></i> {{props.item.text}}</div>
        </div>
      </template>
    </notifications>
    <router-view />
  </v-app>
</template>

<script>
import AppNav from "./components/AppNav";
export default {
  components: { AppNav },
};
</script>

<style lang="scss" scoped>
.notification__text__wrapper {
  color: #fff;
  background: red;
  border-radius: 4px;
  padding: 6px 10px;
}
</style>
