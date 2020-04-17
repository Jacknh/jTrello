<template>
  <div class="wrapper">
    <div class="title"><i class="fab fa-trello"></i> jTrello</div>
    <div>
      <i class="fas fa-user-circle avatar" @click.stop="dropdown = true"></i>
      <ul v-if="dropdown" class="dropdown" @click.stop>
        <li class="first-li">Jack Zhang</li>
        <li class="last-li" @click="dropdown = false">
          <i class="fas fa-sign-out-alt"></i> Signout
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dropdown: false,
    };
  },
  watch: {
    dropdown(val) {
      if (val) {
        window.addEventListener("click", () => {
          this.dropdown = false;
        });
      } else {
        window.removeEventListener("click");
      }
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
$bg-color: #38a89d;

.wrapper {
  display: flex;
  justify-content: space-between;
  padding: 15px 25px;
  background: $bg-color;
  box-shadow: 0px 10px 20px #38a89d;
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
