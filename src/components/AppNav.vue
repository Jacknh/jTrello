<template>
  <div class="wrapper">
    <div class="title"><i class="fab fa-trello"></i> jTrello</div>
    <div v-if="isAuthenticated">
      <i class="fas fa-user-circle avatar" @click.stop="dropdown = true"></i>
      <ul v-if="dropdown" class="dropdown" @click.stop>
        <li class="first-li">{{ userName }}</li>
        <li class="last-li" @click="signout">
          <i class="fas fa-sign-out-alt"></i> Signout
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  created() {
    if (this.isAuthenticated) {
      this.getMe();
    }
  },
  data() {
    return {
      dropdown: false,
    };
  },
  computed: {
    ...mapState(["isAuthenticated", "userName"]),
  },
  watch: {
    dropdown(val) {
      if (val) {
        window.addEventListener("click", () => {
          this.dropdown = false;
        });
      } 
    },
  },
  methods: {
    ...mapActions(['logout', 'getMe']),
    signout() {
      this.dropdown = false;
      this.logout();
      this.$router.push('/');
    }
  },
  beforeDestroy() {
    window.removeEventListener("click");
  }
};
</script>
<style lang="scss" scoped>
$bg-color: #38a89d;

.wrapper {
  display: flex;
  justify-content: space-between;
  padding: 15px 25px;
  background: $bg-color;
  box-shadow: 0px 0px 2px #38a89d;
  color: #fff;

  .title {
    font-size: 1.6rem !important;
    cursor: pointer;
  }

  .avatar {
    font-size: 30px;
    cursor: pointer;
  }

  .dropdown {
    z-index: 1;
    position: absolute;
    right: 15px;
    background: #fff;
    color: #222;
    list-style-type: none;
    padding: 10px 15px;
    border-radius: 4px;

    .first-li {
      margin-bottom: 5px;
    }
    .last-li {
      cursor: pointer;
    }
  }
}
</style>
