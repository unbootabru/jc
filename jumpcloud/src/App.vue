<template>
<div id="app">
  <div class="navbar" role="navigation" aria-label="main navigation" style="border-bottom: 1px solid lightgrey;">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://www.google.com/search?q=konner+atkin">KVA</a>
      </div>
    </div>
    <div>
    <div class="columns">
      <div class="column is-narrow" style="width: 200px; padding-left: 16px; padding-top: 24px;">
        <aside class="menu">
          <p class="menu-label">
            User Management
          </p>
          <ul class="menu-list">
            <li><a class="is-active">Users</a></li>
            <li><a>User Groups</a></li>
          </ul>
          <p class="menu-label">
            User Authentication
          </p>
          <ul class="menu-list">
            <li><a>LDAP</a></li>
            <li><a>RADIUS</a></li>
            <li><a>SSO</a></li>
          </ul>
          <p class="menu-label">
            Device Management
          </p>
          <ul class="menu-list">
            <li><a>Devices</a></li>
            <li><a>Device Groups</a></li>
            <li><a>Commands</a></li>
          </ul>
        </aside>
      </div>
      <div class="column">
        <Users></Users>
      </div>
    </div>
  </div>
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
