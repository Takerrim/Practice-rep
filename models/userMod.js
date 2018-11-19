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

    //--- never mind code below this comment , it's mockup for put request

    // static updateUser (id,userName) {
    //     getAllUsers(users => {
    //         const user = users.find(person => {
    //             return person.id === id;
    //         })
    //         if(user) {
    //             const updatedUser = {idUser:user.id ,name: user.name};
    //             updatedUser.idUser = id;
    //             updatedUser.name = userName;
    //             fs.writeFile(p,JSON.stringify(updatedUser),err => {
    //                 if(err){
    //                     console.log(err);
    //                 }
    //             })
                
    //         } else {
    //             throw new Error(`Ups the specified user doesn't exist`);
    //         }
    //     })
    // }
}

