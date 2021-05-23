<template>
  <div class="box" style="width: 800px;">
    <div class="title">{{fullname}}</div>
     <div class="section">
        <div class="container">
          <table style="cellspacing: 10px;">
            <tr>
              <td class="cell">
                <label class="label">First Name</label>
                <input class="input" style="width: 200px;" type="text" v-model="editUser.firstname"/>
              </td>
              <td class="cell">
                <label class="label">Middle Name</label>
                <input class="input" style="width: 200px;" type="text" v-model="editUser.middlename"/>
              </td>
              <td class="cell">
                <label class="label">Last Name</label>
                <input class="input" style="width: 200px;" type="text" v-model="editUser.lastname"/>
              </td>
            </tr>
            <tr class="">
              <td class="cell">
                <label class="label is-inline-block">Username</label>
                <div class="is-inline-block" style="margin-left: 2px;">
                  <font-awesome-icon icon="asterisk" size="xs" font-size="0.3em" style="margin-bottom: 5px;"/>
                </div>
                <input class="input" style="width: 200px;" type="text" v-model="editUser.username"/>
              </td>
              <td class="cell">
                <label class="label is-inline-block">Email</label>
                <div class="is-inline-block" style="margin-left: 2px;">
                  <font-awesome-icon icon="asterisk" size="xs" font-size="0.3em" style="margin-bottom: 5px;"/>
                </div>
                <input class="input" style="width: 200px;" type="email" v-model="editUser.email"/>
              </td>
            </tr>
          </table>
        </div>
        <div style="margin-top: 32px;">
          <input type="submit" class="button is-pulled-right" value="Save" v-on:click="saveUser" />
          <input type="submit" class="button is-pulled-right" value="Cancel" v-on:click="cancel"/>
        </div>
      </div>
  </div>
</template>

<script>
import { createUser, updateUser } from '../services/UserService'
export default {
  name: 'UserEdit',
  props: [ 'user', 'isNew'],
  data() {
    return {
      editUser:  {
        id: this.user.id,
        firstname: this.user.firstname,
        middlename: this.user.middlename,
        lastname: this.user.lastname,
        email: this.user.email,
        username: this.user.username
      }
    }
  },
  computed: {
    fullname: function() {
      return this.editUser.firstname + " " + this.editUser.lastname
    },
    hasValidEmail: function() {
      if (this.editUser.email.length == 0) {
        return false;
      }
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.editUser.email.toLowerCase());
    }
  },
  methods: {
    saveUser: function() {
      if(this.isNew) {
        delete this.editUser['id'];
        createUser(this.editUser).then((response) => {
          this.$emit("update-users", response);
        });
      }
      else {
        updateUser(this.editUser).then((response) => {
          this.$emit("update-users", response);
        });
      }
    },
    cancel: function() {
        this.$emit("update-cancelled");
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cell {
  padding: 0 8px 0 8px;
}

tr:not(:first-child) > td {
    padding-top: 24px;
}
</style>
 