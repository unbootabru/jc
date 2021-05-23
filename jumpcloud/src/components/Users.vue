<template>
  <div>
    <div class="section">
      <div id="mainModal" class="modal">
        <div class="modal-background" v-on:click="toggleModal()"></div>
        <div id="editUserPopup" class="modal-content nodisp" style="width: 800px;">
          <UserEdit v-if="selected != null" :user=selected :isNew="selected.id == null"
                    v-on:update-users="reloadUsers($event)" v-on:update-cancelled="toggleModal()"></UserEdit>
        </div>
        <div id="deleteConfirmation" class="modal-content nodisp">
          <div class="box">
            <font-awesome-icon icon="exclamation" class="is-inline-block" />
            <span style="padding-left: 8px;">Are you sure you want to delete {{userToDelete ? userToDelete.firstname + '?' : 'this user?'}}</span>
            <div style="margin-top: 16px;">
              <button class="button" v-on:click="cancelDeletePopup()">No</button>
              <button class="button" v-on:click="acceptDeletePopup()">Yes</button>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-bottom: 12px;">
        <button v-on:click="createUser()" class="button is-success">Add User</button>
      </div>
      
      <div class="card">
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
                <td><button class="button" v-on:click.stop="onDeleteClick(user)"><font-awesome-icon icon="trash"></font-awesome-icon></button></td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import UserEdit from './UserEdit.vue'
import { getUsers,deleteUser } from '../services/UserService'
export default {
  name: 'Users',
  components: {
    UserEdit
  },
  data() {
    return {
      users: [],
      selected: null,
      userToDelete: null
    }
  },
  computed: {
  },
  methods: {
     getUsers: function() {
      getUsers().then(response => {
        this.users = response.results
      });
    },
    createUser: function() {
      this.selected = {};
      this.toggleModal(1);
      document.getElementById("editUserPopup").classList.remove("nodisp");
    },
    launchEditUser: function(user) {
      this.selected = user;
      this.toggleModal(1);
      document.getElementById("editUserPopup").classList.remove("nodisp");
    },
    toggleModal: function(showPopup) {
       if(showPopup) {
        document.getElementById("mainModal").classList.add("is-active");
      }
      else {
        document.getElementById("mainModal").classList.remove("is-active");
        let modals = document.getElementsByClassName("modal-content")
        modals.forEach(element => element.classList.add("nodisp"));
        this.selected = null;
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
      let index = this.getIndexOfUser(this.userToDelete);
      if (index != null) {
        this.users.splice(index, 1);
      }
      this.toggleModal();
    },
    reloadUsers(updatedUser) {
      this.toggleModal();
      if(updatedUser != null) {
        let index = this.getIndexOfUser(updatedUser);
        if (index != null) {
          this.users[index] = updatedUser;
        }
        else {
          this.users.push(updatedUser);
        }
      }
      else {
        this.users = this.getUsers();
      }
      
      this.selected = null;
    },
    getIndexOfUser(user) {
      if (user == null) {
        return null;
      }
       for(let i = 0; i < this.users.length; i++) {
          if (this.users[i].id == user.id) {
            return i;
          }
        }
    }
  },
  mounted() {
    this.getUsers();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nodisp {
  display: none;
}
tr:hover {
  cursor:pointer
}
</style>
