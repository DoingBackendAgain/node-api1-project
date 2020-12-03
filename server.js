const express = require('express')
const db = require('./index.js')

const server = express()

server.use(express.json())

server.get("/", (req, res)=> {
    res.json({message: "Hey, it worked"})
})

server.get("/users", (req, res)=> {
    const users = db.getUsers()

    if(users){
        res.json(users)
    }
    else {
        res.status(500)({
            errorMessage: "The user infomation is could not be retrieved"
        })
    }
})


server.post("/users", (req, res)=> {
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    })

    if(!req.body.name || !req.body.bio){
        return res.status(404).json({
            errorMessage: "Please provide name and bio"
        })
    }
    if(newUser){
        res.status(201).json(newUser)
    }
    else {
        res.status(500).json({
            errorMessage: "There was a problem with the server"
        })
    }
})

server.get("/users/:id", (req, res, next) => {

    try{
    const id = req.params.id
    const user = db.getUserById(id)
    
    if(!user){
        return res.status(404).json({
            message: "the user with this id doesn't exist"
        })
        
    }
    if(user){
        return res.status(201).json(user)
    }
    else  {
        return res.status(500).json({
            errorMessage: "The user info could not be retrieved"
        })
    }
    }
    catch(err){
        next(err)
    }
})

server.delete("/users/:id", (req, res, next)=> {
    try{
        const id = req.params.id
        const user = db.getUserById(id)

        if(!user){
            res.status(404).json({
                message: "A user with that ID doesn't exist"
            })
        }

        if(user){
            db.deleteUser(id)
            res.status(200).json({
                message: "user has been destroyed"
            })
        }
        else {
            res.status(500).json({
                message: "some other shit went down"
            })
        }

    }
    catch(err){
        next(err)
    }
})

server.put("/users/:id", (res, req, next)=> {
    try{
        const id = req.params.id
        const user = db.getUserById(id)

        if (user){
              const updateUser = db.updateUser(user.id, {
                  name: req.body.name,
                  bio: req.body.bio
              }) 

            return res.status(200).json(updateUser)
        }
        if (!req.body.name || !req.body.bio) {
            return res.status(404).json({
                message: "Please provide name and bio"
            })
        }
        if(!user) {
            res.status(404).json({
                message: "The user specified doesn not exist"
            })
        }
        else{
            res.status(500).json({
                message: "Oh shit! This ship is sinking"
            })
        }
     }
    catch(err){
        next(err)
    }
})


















server.listen(8070, ()=> {
    console.log("server started")
})