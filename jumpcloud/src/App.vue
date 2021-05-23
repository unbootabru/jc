<template>
<div id="app">
  <h1>KVA</h1>
    <Users v-bind:users=this.users v-on:reload="getUsers()"></Users>
</div>
</template>

<script>
import Users from './components/Users.vue'
import { getUsers } from './services/UserService'

export default {
  name: 'App',
  components: {
    Users
  },
  data() {
    return {
      users: []
    }
  },
  methods: {
    getUsers() {
      getUsers().then(response => {
        this.users = response.results
      });
      console.log("reloaded");
    }
  },
  mounted () {
    this.getUsers();
  }
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css";
</style>
