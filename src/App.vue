<template>
  <v-app>
    <AppNav />
    <p class="mobile__warning" v-if="mobile">
      It seems like you are using a mobile device, switching to a computer would
      gives you a better user experience.
    </p>
    <notifications
      group="auth"
      position="top center"
      width="220px"
      :style="{ top: '62px' }"
    >
      <template slot="body" slot-scope="props">
        <div class="notification__text__wrapper">
          <div>
            <i class="fas fa-exclamation-circle"></i> {{ props.item.text }}
          </div>
        </div>
      </template>
    </notifications>
    <router-view />
  </v-app>
</template>

<script>
import { mobileAndTabletCheck } from "./utils/helpers";
import AppNav from "./components/AppNav";
export default {
  created() {
    this.mobile = mobileAndTabletCheck();
  },
  data() {
    return {
      mobile: false,
    };
  },
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
.mobile__warning {
  color: yellow;
  background: rebeccapurple;
  margin: 0;
  padding: 5px;
  text-align: center;
}
</style>
