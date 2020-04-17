<template>
  <form class="form">
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="Name"
      outlined
      required
      @blur="$v.name.$touch()"
      @input="$v.name.$touch()"
    ></v-text-field>
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
    <v-text-field
      v-model="password1"
      :error-messages="password1Errors"
      label="Confirm Password"
      hint="At least 6 characters"
      type="password"
      outlined
      @blur="$v.password1.$touch()"
      @input="$v.password1.$touch()"
    ></v-text-field>
    <v-btn class="mr-4" @click="submit">register</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  minLength,
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    password1: { required, minLength: minLength(6) },
  },

  data: () => ({
    name: "",
    email: "",
    password: "",
    password1: "",
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
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
    password1Errors() {
      const errors = [];
      if (!this.$v.password1.$dirty) return errors;
      !this.$v.password1.minLength &&
        errors.push("Password must be at lest 6 characters long");
      !this.$v.password1.required && errors.push("Password is required");
      this.password !== this.password1 &&
        errors.push("Password does not match");
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.password = "";
      this.password1 = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 500px;
  margin: 100px auto;
}
</style>
