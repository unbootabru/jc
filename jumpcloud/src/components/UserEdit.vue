<template>
  <div class="box" style="width: 800px;">
    <div>
      <h1 class="title is-inline-block">{{fullname}}</h1>
      <span class="is-pulled-right">{{subTitleMessage}}</span>
    </div>
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
                <div class="is-inline-block" style="margin-left: 2px; font-size: 0.6em;">
                  <font-awesome-icon icon="asterisk" size="xs" font-size="0.3em" style="margin-bottom: 5px;"/>
                </div>
                <input class="input" style="width: 200px;" type="text" v-model="editUser.username"/>
                <div class="errorDiv"
                v-if="!hasValidUsername && showUsernameError">Username is required</div>
              </td>
              <td class="cell">
                <label class="label is-inline-block">Email</label>
                <div class="is-inline-block" style="margin-left: 2px; font-size: 0.6em;">
                  <font-awesome-icon icon="asterisk" size="xs" font-size="0.3em" style="margin-bottom: 5px;"/>
                </div>
                <input class="input" style="width: 200px;" type="email" v-model="editUser.email"/>
                <div class="errorDiv"
                v-if="!hasValidEmail && showEmailError">Email is invalid</div>
              </td>
            </tr>
          </table>  
        </div>
        <div  style="margin-top: 32px;" >
          <div class="is-pulled-right">
            <input type="submit" class="button is-cancel" value="Cancel" v-on:click="cancel" style="margin-right: 16px;"/>
            <input type="submit" class="button is-success" value="Save" v-on:click="saveUser" />
          </div>
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
      },
      showEmailError: false,
      showUsernameError: false
    }
  },
  computed: {
    fullname: function() {
      let full = "";
      if (this.editUser.firstname) {
        full = this.editUser.firstname + " ";
      }
      if (this.editUser.lastname) {
        full += this.editUser.lastname;
      }
      return full;
    },
    hasValidEmail: function() {
      if (!this.editUser.email || this.editUser.email.length == 0) {
        return false;
      }
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.editUser.email.toLowerCase());
    },
    hasValidUsername: function() {
      return (this.editUser.username && this.editUser.username.length > 0);
    },
    subTitleMessage: function() {
      if (this.isNew) {
        return "Create a new user";
      }
      else {
        return "Editing user";
      }
    }
  },
  methods: {
    /**
     * Saves a user
     */
    saveUser: function() {
      this.saveErrorMessage = "";
      if(!this.hasValidEmail) {
        this.showEmailError = true;
      }
      if (!this.hasValidUsername) {
        this.showUsernameError = true;
      }
      if (this.showEmailError || this.showUsernameError) {
        return;
      }
      if(this.isNew) {
        delete this.editUser['id'];
        createUser(this.editUser).then((response) => {
          this.$emit("update-users", response);
        });
      }
      else {
        updateUser(this.editUser)
          .then((response) => {
            this.$emit("update-users", response);
          });
      }
      this.cleanUp();
    },
    
    /**
     * Cancel click handler
     */
    cancel: function() {
      this.$emit("update-cancelled");
      this.cleanUp();
    },

    /**
     * Clean up when popup is closing
     */
    cleanUp: function() {
      this.showEmailError = false;
      this.showUsernameError = false;
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
.errorDiv {
  font-size:10px;
  color: red;
  padding-left: 8px;
}
</style>
 