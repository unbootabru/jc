
/**
 * GETs list of users from database
 * @returns JSON list of users
 */
export async function getUsers() {
    const response = await fetch('/api/systemusers');
    return await response.json();
}

/**
 * GETs data for a single user
 * @param {string} userID - The ID of user to fetch
 * @returns JSON user data
 */
export async function getUser(userID) {
    const response = await fetch('/api/systemusers/' + userID);
    return await response.json();
}

/**
 * PUTs user changes to database
 * @param {object} data - User data to save
 * @returns JSDON user data
 */
export async function updateUser(data) {
    console.log(data.id);
    console.log("asdf");
    const response = await fetch('/api/systemusers/' + data.id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
    return await response.json();
}

/**
 * POSTs a new user on the database
 * @param {object} data - New user info
 * @returns JSON user data
 */
export async function createUser(data) {
    console.log(data);
    const response = await fetch('/api/systemusers', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return await response.json();
}

/**
 * DELETEs a user from the database
 * @param {string} userID - ID of user to delete
 * @returns JSDON user data
 */
export async function deleteUser(userID) {
    console.log(userID);
    const response = await fetch('/api/systemusers/' + userID, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });
    return await response.json();
}