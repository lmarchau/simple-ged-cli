<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column wrap>
        <v-flex xs12 lg5 mb-2>
          <h2>Identifiez-vous</h2>
          <v-form ref="form">
            <v-text-field
              v-model="user.username"
              label="Identifiant"
              required >
            </v-text-field>
            <v-text-field
              v-model="user.password"
              type="password"
              label="Mot de passe"
              required >
            </v-text-field>
            <v-btn
              depressed
              @click="login()">
              Login
            </v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>

import auth from '../../mixins/auth.js'

export default {
  mixins: [
    auth
  ],
  data: function () {
    return {
      user: {
        username: null,
        password: null
      }
    }
  },
  methods: {
    login: function () {
      console.log('login...')
      this.$http.post('http://localhost:8080/login',
        this.user,
        {headers: { 'Content-Type': 'application/json' }})
        .then(response => {
          this.storeToken(response.body.token)
          this.$router.push({name: 'home'})
        },
          error => {
            console.log(error)
          }
        )
    }
  }
}
</script>
