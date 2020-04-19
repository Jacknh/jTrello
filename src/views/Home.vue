<template>
  <div class="wrapper">
    <div>
      <h1>
        Welcome to jTrello!
      </h1>
      <h3>
        To leverage your workflow, let's get started!
      </h3>
      <p v-if="!isAuthenticated">
        You may need to <span class="auth" @click="goLogin">login</span> or
        <span class="auth" @click="goRegister">register</span> first
      </p>
      <img
        v-else
        src="../assets/icons8-go-back-64.png"
        alt="go"
        class="hover-pointer img"
        @click="goBoard"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isAuthenticated"]),
  },
  methods: {
    goRegister() {
      this.$router.push("/register");
    },
    goLogin() {
      this.$router.push("/login");
    },
    goBoard() {
      this.$router.push("/board");
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: 100px;
  display: flex;
  justify-content: center;
  color: #f1f1f1;
  text-align: center;
  height: 100%;
  background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #38a89d);

  h1 {
    font-size: 60px;
  }
  h3 {
    font-weight: 200;
  }
  p {
    margin-bottom: 60px;
  }
  .auth {
    text-decoration: underline;
    cursor: pointer;
  }
  .img {
    transform: rotate(180deg);
    margin-top: 120px;
  }
}
</style>
