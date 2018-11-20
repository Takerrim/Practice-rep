const fs = require('fs');
const path = require('path');

const p = path.join( // create default place from file
    path.dirname(process.mainModule.filename),
    'data',
    'users.json'
  );

const getAllUsers = (callback) => { 
    fs.readFile(p, (err, fileContent) => {
        if(err) {
            console.log(err);
        }
        else {
            callback(JSON.parse(fileContent));
        }
    })
}

module.exports = class User {
    constructor (id,name) {
        this.id = id,
        this.name = name
    }

     save () {
        getAllUsers(users =>{ // content users.json 
            users.push(this); // the transferred object which we assign in controller instead of this
            fs.writeFile(p,JSON.stringify(users), err=>{ // add new user in file
                if(err) {
                    console.log(err);
                }
            })
        })    
    }
    static fetchAll (callback) {
        getAllUsers(callback);
    }

    static deleteUsers (id) {
        getAllUsers(users => { // users from file
            const user = users.filter(person => { // copy array without user with specified id 
                return person.id  !== id;
            })
            fs.writeFile(p, JSON.stringify(user), err => { // save this array
                if(err) {
                    console.log(err);
                }
            })
        })
    }


    static updateUser (id,userName) {
        getAllUsers(users => {
            const user = users.find(person => {
                return person.id === id;
            })
            if(user) {
                const userIndex = users.findIndex(index => { // find user by index
                    return index.id === id // compare with input id
                })
                const updatedUser = {id:user.id ,name: user.name}; // take user properties
                updatedUser.id = id; // take id from req.params.id
                updatedUser.name = userName; //  replace on typed value from req.body.userName
                users.splice(userIndex,1,updatedUser); // replace old value user on new value user (1: by userIndex we find user 2: remove one user 3: and add  new userValue)
                fs.writeFile(p,JSON.stringify(users),err => { // write it in file
                    if(err){
                        console.log(err);
                    }
                })
                
            } else {
                throw new Error(`Ups the specified user doesn't exist`);
            }
        })
    }
}

