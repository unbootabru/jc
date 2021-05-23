<template>
  <div class="section">
    <div id="mainModal" class="modal">
      <div class="modal-background" v-on:click="closeModal"></div>
      <div id="editUserPopup" class="modal-content nodisp">
        <UserEdit v-if="selected != null" :user=selected :isNew="selected.id == null"
                  v-on:update-users="reloadUsers()"></UserEdit>
      </div>
      <div id="deleteConfirmation" class="modal-content nodisp">
        <div class="box">
          <p>Are you sure you want to delete {{userToDelete ? userToDelete.firstname + '?' : 'this user?'}}</p>
          <div>
            <button class="" v-on:click="cancelDeletePopup()">No</button>
            <button v-on:click="acceptDeletePopup()">Yes</button>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <button v-on:click="createUser()">Add User</button>
      <table class="table is-hoverable">
        <thead>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Username</th>
          <th>Email</th>
        </thead>
        <tbody>
          <tr v-for="user in users"
              v-bind:todo="user"
              v-bind:key="user.id"
              v-on:click="launchEditUser(user)">
              <td>{{user.lastname}}</td>
              <td>{{user.firstname}}</td>
              <td>{{user.username}}</td>
              <td>{{user.email}}</td>
              <td><button class="button" v-on:click.stop="onDeleteClick(user)">Delete</button></td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>
  
</template>

<script>
import UserEdit from './UserEdit.vue'
import { deleteUser } from '../services/UserService'
export default {
  name: 'Users',
  props: ['users'],
  components: {
    UserEdit
  },
  data() {
    return {
      selected: null,
      userToDelete: null
    }
  },
  computed: {
  },
  methods: {
    createUser: function() {
      this.toggleModal(1);
      document.getElementById("editUserPopup").classList.remove("nodisp");
      this.selected = {};
    },
    launchEditUser: function(user) {
      this.toggleModal(1);
      document.getElementById("editUserPopup").classList.remove("nodisp");
      this.selected = user;
    },
    closeModal: function() {
      this.toggleModal();
      this.selected = null;
    },
    toggleModal: function(isOn) {
      if(isOn) {
        document.getElementById("mainModal").classList.add("is-active");
      }
      else {
        document.getElementById("mainModal").classList.remove("is-active");
        let modals = document.getElementsByClassName("modal-content")
        modals.forEach(element => element.classList.add("nodisp"));
      }
      
    },
    onDeleteClick: function(user) {
      this.userToDelete = user;
      this.toggleModal(1);
      document.getElementById("deleteConfirmation").classList.remove("nodisp");
    },
    cancelDeletePopup() {
      this.userToDelete = null;
      this.toggleModal();
    },
    acceptDeletePopup() {
      deleteUser(this.userToDelete.id);
      this.toggleModal();
      this.reloadUsers();
    },
    reloadUsers() {
      this.toggleModal();
      this.$emit("reload");
      this.selected = null;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nodisp {
  display: none;
}
</style>
