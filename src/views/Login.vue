<template>
  <form class="form">
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      outlined
      required
      @blur="$v.email.$touch()"
      @input="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      label="Password"
      hint="At least 6 characters"
      type="password"
      outlined
      @blur="$v.password.$touch()"
      @input="$v.password.$touch()"
    ></v-text-field>
    <v-btn class="mr-4" @click="submit">login</v-btn>
    <v-btn @click="clear">clear</v-btn>
    <div class="register-link">
      Don't have an account?<router-link to="/register">
        Register.
      </router-link>
    </div>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
  },

  data: () => ({
    email: "",
    password: "",
  }),

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must be at lest 6 characters long");
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
  },

  methods: {
    ...mapActions(["login"]),
    submit() {
      this.$v.$touch();
      this.login({
        email: this.email,
        password: this.password,
      })
        .then(() => {
          this.$router.push("/board");
        })
        .catch((error) => {
          this.$notify({
            group: "auth",
            duration: 2000,
            text: error.response.data,
          });
        });
    },
    clear() {
      this.$v.$reset();
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 500px;
  margin: 100px auto;
}
.register-link {
  margin-top: 20px;
  font-size: 13px;
}
</style>
