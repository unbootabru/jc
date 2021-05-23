<template>
  <div class="box">
    <div class="title">{{editUser.firstname}}</div>
     <div class="section">
        <div class="container">
          <div class="is-inline-block">
            <label class="label">First Name</label>
            <input class="input" style="width: 200px;" type="text" v-model="editUser.firstname"/>
          </div>
          <div class="is-inline-block">
            <label class="label">Middle Name</label>
            <input class="input" style="width: 200px;" type="text" v-model="editUser.middlename"/>
          </div>
          <div class="is-inline-block">
            <label class="label">Last Name</label>
            <input class="input" style="width: 200px;" type="text" v-model="editUser.lastname"/>
          </div>
          <div class="is-inline-block">
            <label class="label">Email</label>
            <input class="input" style="width: 200px;" type="text" v-model="editUser.email"/>
          </div>
          <div class="is-inline-block">
            <label class="label">Username</label>
            <input class="input" style="width: 200px;" type="text" v-model="editUser.username"/>
          </div>
        </div>
        <div>
          <input type="submit" class="button is-active is-pulled-right" value="Save" v-on:click="saveUser">
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
  },
  methods: {
    saveUser: function() {
      console.log(this.isNew);
      if(this.isNew) {
        delete this.editUser['id'];
        createUser(this.editUser).then(() => {
          this.$emit("update-users");
        });
      }
      else {
        updateUser(this.editUser).then(() => {
          this.$emit("update-users");
        });
      }
      
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
