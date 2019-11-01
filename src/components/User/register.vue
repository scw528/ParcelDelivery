<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text class="pt-0">
            <v-container class="pt-0">
              <form @submit.prevent="onSignup">
                <v-layout row>
                    <v-flex xs12>
                        <v-toolbar flat color="white" class="text-xs-center">
                            <v-toolbar-title>Create an Account</v-toolbar-title>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs6>
                    <v-text-field
                      name="fName"
                      label="First Name"
                      id="fName"
                      v-model="fName"
                      required></v-text-field>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs6>
                    <v-text-field
                      name="lName"
                      label="Last Name"
                      id="lName"
                      v-model="lName"
                      required></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="address"
                      label="Address"
                      id="address"
                      v-model="address"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs12 d-flex>
                    <v-select
                        v-model="select"
                        :items="provinces"
                        label="Province"
                    ></v-select>
                    </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="postalCode"
                      label="Postal Code"
                      id="postalCode"
                      v-model="postalCode"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn block flat color="light-blue" type="submit" :disabled="loading" :loading="loading">
                      Register
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from '../../main'
import firebase from 'firebase';
import auth from 'firebase/auth';
import firestore from 'firebase/firestore';
  export default {
    data() {
      return {
        select: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: '',
        fName: '',
        lName: '',
        postalCode: '',
        provinces: ['Alberta', 'British Colombia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'],
      }
    },
    computed: {
      comparePasswords() {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      },
      user() {
        return this.$store.getters.user;
      },
      error() {
        return this.$store.getters.error;
      },
      loading() {
        return this.$store.getters.loading;
      },
    },
    watch: {
      user(value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignup() {
          console.log("user added 1")
          db.collection("users").doc(this.email).set({
            address: this.address,
            email: this.email,
            fName: this.fName,
            lName: this.lName,
            postalCode: this.postalCode,
            provinces: this.select,
          })
          .then(docRef => {
            console.log('doc written to users')
            this.$router.push('/')
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });       
          this.$store.dispatch('signUserUp', {email: this.email, password: this.password}) 
      },
      onDismissed() {
        console.log('dismissed alert');
        this.$store.dispatch('clearError');
      }
    }
  }
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>