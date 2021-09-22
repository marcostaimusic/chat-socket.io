// this file is mocking the database connection
const users = []

//join user to chat

function userJoin(id, username, room){
    const user = { id, username, room}
    users.push(user)
    return user
}

function getCurrentUser(id){
    return users.find(user => user.id === id)
}


function userLeave(id){

    //The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. 
    //Otherwise, it returns -1, indicating that no element passed the test.
    
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0] //to return the 0 index of the resulting array
    }
}

//get room users
function getRoomUsers(room){
    return users.filter(user => user.room === room)
}

module.exports = { userJoin, getCurrentUser, userLeave, getRoomUsers }