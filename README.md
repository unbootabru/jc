# Dependencies
1. Font Awesome 5: https://www.npmjs.com/package/@fortawesome/vue-fontawesome
2. Vue 3 CLI: https://v3.vuejs.org/guide/installation.html#download-and-self-host


# About
Basic app written using Vue.  Displays a list of users, allows creation, basic editing, and deletion of users.
Minor validation on username and email, the two required fields by the jumpcloud APIs.
Basic error message shown when request is bad (like when trying to add users when I'm at the limit for the free account :) )

# If given more time, things I know could be improved
1. Add search to find users
2. Add pagination to table
3. Add toast message when user save is successful
    (I was intending to do 1-3, but my free jumpcloud acct capped my number of users before I really needed)
4. I'm not sure I'm manipulating the edit user correctly.  I want them to be a copy of the passed in user, but I don't think I would want to maintain the list of editable properties so explicitly
5. Adding additional cards to update more details -- I would do this pretty similarly to the Jumpcloud UI.
6. Not have a modal for editing (or at least so in your face about it)