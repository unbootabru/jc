<template>
<div id="app">
  <div class="navbar" role="navigation" aria-label="main navigation" style="border-bottom: 1px solid lightgrey;">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://www.google.com/search?q=konner+atkin">KVA</a>
      </div>
    </div>
    <Users></Users>
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
