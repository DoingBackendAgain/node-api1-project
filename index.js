let users = [
    {
        id: "1", 
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane"
      },
      {
        id: "2", 
        name: "Tarzan",
        bio: "Jane's husband, Obviously"
      },
      {
        id: "3", 
        name: "Jane Tarzan",
        bio: "Tarzan's Wife, not another Jane"
      }
]

function getUsers(){
    return users
}

function getUserById(id){
    return users.find(user => user.id === id)
}

function createUser(data){
    const payload = {
        id: String(users.length + 1),
        ...data,
    }

    users.push(payload)
    return payload
}

function updateUser(id, data){
    const index  = users.findIndex(user => user.id === id)
    users[index] = {
        ...users[index],
        ...data,
    }
    return users[index]
}

function deleteUser(id) {
    users = users.filter(u => u.id !=id)
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser

}